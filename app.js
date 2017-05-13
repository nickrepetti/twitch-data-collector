"use strict";

const request = require("request");
const pg = require("pg");

// Number of items to get with each request. Max is 100.
const limit = 100;

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

const client = new pg.Client({
  user: "postgres",
  password: "password",
  database: "twitch",
  host: "localhost",
  port: 5432
});

client.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Client opened connection to PostgreSQL");
});

client.query("select * from games")
.then((result) => {
  const games = result.rows;

  // Initialize the requests for each game.
  let requests = games.map((game) => {
    return new Promise((resolve, reject) => {
      captureGameData(req, game, limit, resolve, reject);
    });
  });

  Promise.all(requests).then(recordData);
});

// Write the results into the database.
function recordData(results) {
  const query = "insert into gamedata(gameid, streamcount, viewercount, partnercount, partnerviewercount) values($1, $2, $3, $4, $5)";

  let statements = results.map((game) => {
    const args = [game.gameid, game.streamCount, game.viewerCount, game.partnerCount, game.partnerViewerCount];

    return new Promise((resolve, reject) => {
      client.query(query, args, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });

  Promise.all(statements).then(() => {
    client.end();
    console.log("Client closed connection to PostgreSQL");
  });

  results.forEach(printGame);
}

// Captures all of the data for a given game. An initial request is made to grab
// the first page of data as well as the number of additional pages. Based on 
// that, additional requests are made to capture the rest of the data.
function captureGameData(req, game, limit, resolve, reject) {
  const initialOffset = 0;
  const initialUrl = buildUrl(game.name, limit, initialOffset);

  let streamCount = 0;
  let viewerCount = 0;
  let partnerCount = 0;
  let partnerViewerCount = 0;

  makeRequest(req, initialUrl).then((stream) => {
    streamCount = stream.streamCount;
    viewerCount = stream.viewerCount;
    partnerCount = stream.partnerCount;
    partnerViewerCount = stream.partnerViewerCount;

    const pageCount = Math.floor(stream.streamCount / limit);
    let requests = [];

    for (let i = 0; i < pageCount; i++) {
      const offset = (i + 1) * limit;
      const url = buildUrl(game.name, limit, offset);

      requests.push(makeRequest(req, url));
    }

    return Promise.all(requests);
  }).then((streams) => {
    let data = streams.reduce((acc, stream) => {
      let viewerCount = acc.viewerCount + stream.viewerCount;
      let partnerCount = acc.partnerCount + stream.partnerCount;
      let partnerViewerCount = acc.partnerViewerCount + stream.partnerViewerCount;

      return { viewerCount, partnerCount, partnerViewerCount };
    }, { viewerCount, partnerCount, partnerViewerCount });

    data.gameid = game.gameid;
    data.streamCount = streamCount;

    resolve(data);
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
        let data = {
          viewerCount: 0,
          partnerCount: 0,
          partnerViewerCount: 0
        };

        data = body.streams.reduce((acc, stream) => {
          let viewerCount = acc.viewerCount + stream.viewers;
          let partnerCount = acc.partnerCount;
          let partnerViewerCount = acc.partnerViewerCount;

          if (stream.channel.partner === true) {
            partnerCount++;
            partnerViewerCount += stream.viewers;
          }

          return { viewerCount, partnerCount, partnerViewerCount };
        }, data);

        data.streamCount = body._total;

        resolve(data);
      }
    });
  });
}

// Generate the url for the endpoint to request. Based on the Twitch API v5.
// https://dev.twitch.tv/docs/v5/reference/streams/#get-live-streams
function buildUrl(game, limit, offset) {
  const resource = "streams/";
  return `${resource}?game=${encodeURIComponent(game)}&limit=${limit}&offset=${offset}`;
}

function printGame(game) {
  console.log("Game ID: " + game.gameid);
  console.log("Channels: " + game.streamCount);
  console.log("Viewers: " + game.viewerCount);
  console.log("Partners: " + game.partnerCount);
  console.log("Partner Viewers: " + game.partnerViewerCount);
  console.log("----------------------------------\n");
}

