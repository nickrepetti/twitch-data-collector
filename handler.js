"use strict";

const request = require("request");
const pg = require("pg");

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
let client;

// Number of items to get with each request. Max is 100.
const limit = 100;

const QUERY_GAMEDATA_CREATE = "insert into gamedata(gameid, language, streamcount, viewercount, partnercount, partnerviewercount) values($1, $2, $3, $4, $5, $6)";
const QUERY_RAWDATA_CREATE = "insert into rawdata(gameid, rawdata) values($1, $2)";
const QUERY_GAMES_GETALL = "select * from games";

// Default request object initialized with common data/headers so each request 
// doesn't have to explicitly specify them.
const req = request.defaults({
  baseUrl: "https://api.twitch.tv/kraken/",
  headers: {
    "Accept": "application/vnd.twitchtv.v5+json",
    "Client-ID": TWITCH_CLIENT_ID
  },
  json: true
});

module.exports.captureCurrentGames = (event, context, callback) => {
  client = new pg.Client();

  // Connect to the PostgreSQL database.
  client.connect((err) => {
    if (err) {
      console.error("An error occurred when connecting to PostgreSQL.");
      console.error(err);
      return callback(err);
    }

    console.info("Opened connection to PostgreSQL.");

    // Grab all games.
    client.query(QUERY_GAMES_GETALL)
    .then((result) => {
      const games = result.rows;

      // Initialize the requests for each game.
      let requests = games.map((game) => {
        return new Promise((resolve, reject) => {
          captureGameData(req, game, limit, resolve, reject);
        });
      });

      return Promise.all(requests).then((_) => {
        console.info("All games successfully captured.");
      }).catch((err) => {
        console.error("An error occurred when capturing games.");
        console.error(err);
      });
    })
    .then((_) => {
      client.on("drain", client.end.bind(client));

      client.on("end", (_) => {
        console.info("Closed connection to PostgreSQL.");
        callback(null, "Success");
      });
    });
  });
};

// Captures all of the data for a given game. An initial request is made to grab
// the first page of data as well as the number of additional pages. Based on 
// that, additional requests are made to capture the rest of the data.
function captureGameData(req, game, limit, resolve, reject) {
  console.info("Capturing game data for game: " + game.name + ".");

  const initialOffset = 0;
  const initialUrl = buildUrl(game.name, limit, initialOffset);

  // Initialize data to be used in the aggregation.
  let initialPageData;

  // Make initial request.
  makeRequest(req, initialUrl, game).then((pageData) => {
    initialPageData = pageData;

    // Get the number of pages to make requests for.
    const pageCount = Math.floor(pageData.allStreamCount / limit);

    if (pageCount <= 0) {
      return Promise.resolve([pageData]);
    }

    let requests = [];

    // Build a request for each page.
    for (let i = 0; i < pageCount; i++) {
      // Calculate the offset for the page.
      const offset = (i + 1) * limit;
      const url = buildUrl(game.name, limit, offset);

      requests.push(makeRequest(req, url, game));
    }

    return Promise.all(requests);
  }).then((streams) => {
    // All data has been captured, reduce into a single result.
    let gameData = streams.reduce((acc, stream) => {
      // Loop through all languages.
      calculateGameData(stream, acc);

      return acc; 
    }, {});

    // Add data from initial request.
    calculateGameData(initialPageData, gameData);

    gameData.gameId = game.gameid;

    recordData(gameData, resolve, reject);
  }).catch((err) => {
    console.error("Error capturing game data for game: " + game.name + ".");
    console.error(err);
    reject(err);
  });
};

// Make a request to get a single page of data.
function makeRequest(req, url, game) {
  return new Promise((resolve, reject) => {
    req(url, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        console.error("Error making request for game: " + game.name + ".");
        if (err) {
          console.error(err);
        }
        reject(err);
      } else {
        // Capture raw json
        const args = [game.gameid, JSON.stringify(body)];

        client.query(QUERY_RAWDATA_CREATE, args, (err, result) => {
          if (err) {
            console.error("Error capturing raw json data.");
            console.error(err);
            reject(err);
          }
        });

        let allData = body.streams.reduce((acc, stream) => {
          let data = acc[stream.channel.language] || createEmptyGameData();

          data.streamCount++;
          data.viewerCount += stream.viewers;

          if (stream.channel.partner === true) {
            data.partnerCount++;
            data.partnerViewerCount += stream.viewers;
          }

          acc[stream.channel.language] = data;

          return acc;
        }, {});

        allData.allStreamCount = body._total;

        resolve(allData);
      }
    });
  });
}

// Write the results into the database.
function recordData(gameData, resolve, reject) {
  for (let language in gameData) {
    if (gameData.hasOwnProperty(language) && language !== "gameId") {
      const languageData = gameData[language];

      const args = [gameData.gameId, language, languageData.streamCount, languageData.viewerCount, languageData.partnerCount, languageData.partnerViewerCount];

      client.query(QUERY_GAMEDATA_CREATE, args, (err, result) => {
        if (err) {
          console.error("Error writing captured game data to database.");
          console.error(err);
          reject(err);
        }
      });
    }
  }

  resolve();
}

// Generate the url for the endpoint to request. Based on the Twitch API v5.
// https://dev.twitch.tv/docs/v5/reference/streams/#get-live-streams
function buildUrl(game, limit, offset) {
  const resource = "streams/";
  return `${resource}?game=${encodeURIComponent(game)}&limit=${limit}&offset=${offset}`;
}

function calculateGameData(stream, gameData) {
  for (let language in stream) {
    if (stream.hasOwnProperty(language) && language !== "allStreamCount") {
      let languageData = gameData[language] || createEmptyGameData();

      const languageGameData = stream[language];

      languageData.streamCount += languageGameData.streamCount;
      languageData.viewerCount += languageGameData.viewerCount;
      languageData.partnerCount += languageGameData.partnerCount;
      languageData.partnerViewerCount += languageGameData.partnerViewerCount;

      gameData[language] = languageData;
    }
  }
}

function createEmptyGameData() {
  return {
    streamCount: 0,
    viewerCount: 0,
    partnerCount: 0,
    partnerViewerCount: 0
  };
}

