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

    Promise.all(requests).then(() => {
      console.log("All games successfully captured.");
    }).catch((err) => {
      console.log("An error occurred when capturing games.");
      console.log(err);
    }).then(() => {
      client.end();
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
  let gameData = {};

  // Make initial request.
  makeRequest(req, initialUrl).then((stream) => {
    gameData.streamCount = stream.streamCount;
    gameData.viewerCount = stream.viewerCount;
    gameData.partnerCount = stream.partnerCount;
    gameData.partnerViewerCount = stream.partnerViewerCount;

    // Get the number of pages to make requests for.
    const pageCount = Math.floor(stream.streamCount / limit);
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
    let allData = streams.reduce((acc, stream) => {
      let data = acc[stream.channel.language] || {};

      if (data.streamCount === undefined) {
        data.streamCount = 0;
      }
      if (data.viewerCount === undefined) {
        data.viewerCount = 0;
      }
      if (data.partnerCount === undefined) {
        data.partnerCount = 0;
      }
      if (data.partnerViewerCount === undefined) {
        data.partnerViewerCount = 0;
      }

      data.streamCount += stream.streamCount;
      data.viewerCount += stream.viewerCount;
      data.partnerCount += stream.partnerCountCount;
      data.partnerViewerCount += stream.partnerViewerCount;

      acc[stream.channel.language] = data;

      return acc; 
    }, gameData);

    allData.gameid = game.gameid;

    recordData(allData, resolve, reject);
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
          let data = acc[stream.channel.language] || {};

          if (data.streamCount === undefined) {
            data.streamCount = 0;
          }
          if (data.viewerCount === undefined) {
            data.viewerCount = 0;
          }
          if (data.partnerCount === undefined) {
            data.partnerCount = 0;
          }
          if (data.partnerViewerCount === undefined) {
            data.partnerViewerCount = 0;
          }

          data.streamCount++;
          data.viewerCount += stream.viewers;

          if (stream.channel.partner === true) {
            data.partnerCount++;
            data.partnerViewerCount += stream.viewers;
          }

          acc[stream.channel.language] = data;

          return acc;
        }, {});

        resolve(allData);
      }
    });
  });
}

// Write the results into the database.
function recordData(game, resolve, reject) {
  game.metrics.forEach((metric) => {
    printGame(game.gameId, metric);
    /*
    const args = [game.gameId, metric.language, metric.streamCount, metric.viewerCount, metric.partnerCount, metric.partnerViewerCount];

    client.query(query, args, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
      printGame(game.gameId, metric);
        resolve();
      }
    });
    */
  });
}

// Generate the url for the endpoint to request. Based on the Twitch API v5.
// https://dev.twitch.tv/docs/v5/reference/streams/#get-live-streams
function buildUrl(game, limit, offset) {
  const resource = "streams/";
  return `${resource}?game=${encodeURIComponent(game)}&limit=${limit}&offset=${offset}`;
}

function printGame(gameId, metric) {
  console.log("Game ID: " + gameid);
  console.log("Language: " + metric.language);
  console.log("Channels: " + metric.streamCount);
  console.log("Viewers: " + metric.viewerCount);
  console.log("Partners: " + metric.partnerCount);
  console.log("Partner Viewers: " + metric.partnerViewerCount);
  console.log("----------------------------------\n");
}

