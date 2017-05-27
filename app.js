"use strict";

const request = require("request");
const pg = require("pg");

// Number of items to get with each request. Max is 100.
const limit = 100;

const query = "insert into gamedata(gameid, language, streamcount, viewercount, partnercount, partnerviewercount) values($1, $2, $3, $4, $5, $6)";

// Default request object initialized with common data/headers so each request 
// doesn't have to explicitly specify them.
const req = request.defaults({
  baseUrl: "https://api.twitch.tv/kraken/",
  headers: {
    "Accept": "application/vnd.twitchtv.v5+json",
    "Client-ID": process.env.CLIENT_ID
  },
  json: true
});

// Initialize PostgreSQL connection credentials.
const client = new pg.Client({
  user: "postgres",
  password: "password",
  database: "twitch",
  host: "localhost",
  port: 5432
});

// Connect to the PostgreSQL database.
client.connect((err) => {
  if (err) {
    console.log("An error occurred when connecting to PostgreSQL.");
    console.log(err);
    return;
  }

  console.log("Opened connection to PostgreSQL.");

  // Grab all games.
  client.query("select * from games")
  .then((result) => {
    const games = result.rows;

    // Initialize the requests for each game.
    let requests = games.map((game) => {
      return new Promise((resolve, reject) => {
        captureGameData(req, game, limit, resolve, reject);
      });
    });

    return Promise.all(requests).then((_) => {
      console.log("All games successfully captured.");
    }).catch((err) => {
      console.log("An error occurred when capturing games.");
      console.log(err);
    });
  })
  .then((_) => {
    client.on("drain", client.end.bind(client));

    client.on("end", (_) => {
      console.log("Closed connection to PostgreSQL.");
    });
  });
});


// Captures all of the data for a given game. An initial request is made to grab
// the first page of data as well as the number of additional pages. Based on 
// that, additional requests are made to capture the rest of the data.
function captureGameData(req, game, limit, resolve, reject) {
  const initialOffset = 0;
  const initialUrl = buildUrl(game.name, limit, initialOffset);

  // Initialize data to be used in the aggregation.
  let initialPageData;

  // Make initial request.
  makeRequest(req, initialUrl).then((pageData) => {
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

      requests.push(makeRequest(req, url));
    }

    return Promise.all(requests);
  }).then((streams) => {
    // All data has been captured, reduce into a single result.
    let gameData = streams.reduce((acc, stream) => {
      // Loop through all languages.
      for (let language in stream) {
        if (stream.hasOwnProperty(language) && language !== "allStreamCount") {
          let accData = acc[language] || {
            streamCount: 0,
            viewerCount: 0,
            partnerCount: 0,
            partnerViewerCount: 0
          };

          const languageGameData = stream[language];

          accData.streamCount += languageGameData.streamCount;
          accData.viewerCount += languageGameData.viewerCount;
          accData.partnerCount += languageGameData.partnerCount;
          accData.partnerViewerCount += languageGameData.partnerViewerCount;

          acc[language] = accData;
        }
      }

      return acc; 
    }, {});

    // Add data from initial request.
    for (let language in initialPageData) {
      if (initialPageData.hasOwnProperty(language) && language !== "allStreamCount") {
        let languageData = gameData[language] || {
          streamCount: 0,
          viewerCount: 0,
          partnerCount: 0,
          partnerViewerCount: 0
        };

        const initialGameData = initialPageData[language];

        languageData.streamCount += initialGameData.streamCount;
        languageData.viewerCount += initialGameData.viewerCount;
        languageData.partnerCount += initialGameData.partnerCount;
        languageData.partnerViewerCount += initialGameData.partnerViewerCount;

        gameData[language] = languageData;
      }
    }

    gameData.gameId = game.gameid;

    recordData(gameData, resolve, reject);
  }).catch((err) => {
    console.log(err);
    reject(err);
  });
};

// Make a request to get a single page of data.
function makeRequest(req, url) {
  return new Promise((resolve, reject) => {
    req(url, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        console.log(err);
        reject(err);
      } else {
        let allData = body.streams.reduce((acc, stream) => {
          let data = acc[stream.channel.language] || {
            streamCount: 0,
            viewerCount: 0,
            partnerCount: 0,
            partnerViewerCount: 0
          };

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

      client.query(query, args, (err, result) => {
        if (err) {
          console.log(err);
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

function printGame(gameId, language, languageData) {
  console.log("Game ID: " + gameId);
  console.log("Language: " + language);
  console.log("Channels: " + languageData.streamCount);
  console.log("Viewers: " + languageData.viewerCount);
  console.log("Partners: " + languageData.partnerCount);
  console.log("Partner Viewers: " + languageData.partnerViewerCount);
  console.log("----------------------------------\n");
}

