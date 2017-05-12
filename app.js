"use strict";

const fs = require("fs");
const request = require("request");

// Array of games to capture data for.
const games = JSON.parse(fs.readFileSync("./games.json", "utf8"));

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

// Initialize the requests for each game.
let requests = games.map((game) => {
  return new Promise((resolve, reject) => {
    captureGameData(req, game, limit, resolve, reject);
  });
});

// Once all requests for all games have been completed, record the results.
Promise.all(requests).then(recordData);

// Write the results into a database. All results will share the same timestamp.
function recordData(results) {
  const time = new Date().getTime();

  results.forEach(printGame);
}

// Captures all of the data for a given game. An initial request is made to grab
// the first page of data as well as the number of additional pages. Based on 
// that, additional requests are made to capture the rest of the data.
function captureGameData(req, game, limit, resolve, reject) {
  const initialOffset = 0;
  const initialUrl = buildUrl(game, limit, initialOffset);

  let channels = 0;
  let viewers = 0;
  let partners = 0;
  let partnerViewers = 0;

  makeRequest(req, initialUrl).then((stream) => {
    channels = stream.channels;
    viewers = stream.viewers;
    partners = stream.partners;
    partnerViewers = stream.partnerViewers;

    const pageCount = Math.floor(stream.channels / limit);
    let requests = [];

    for (let i = 0; i < pageCount; i++) {
      const offset = (i + 1) * limit;
      const url = buildUrl(game, limit, offset);

      requests.push(makeRequest(req, url));
    }

    return Promise.all(requests);
  }).then((streams) => {
    let data = streams.reduce((acc, stream) => {
      let viewers = acc.viewers + stream.viewers;
      let partners = acc.partners + stream.partners;
      let partnerViewers = acc.partnerViewers + stream.partnerViewers;

      return { viewers, partners, partnerViewers };
    }, { viewers, partners, partnerViewers });

    data.game = game;
    data.channels = channels;

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
        let data = body.streams.reduce((acc, stream) => {
          let viewers = acc.viewers + stream.viewers;
          let partners = acc.partners;
          let partnerViewers = acc.partnerViewers;

          if (stream.channel.partner === true) {
            partners++;
            partnerViewers += stream.viewers;
          }

          return { viewers, partners, partnerViewers };
        }, { viewers: 0, partners: 0, partnerViewers: 0 });

        data.channels = body._total;

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
  console.log("Game: " + game.game);
  console.log("Channels: " + game.channels);
  console.log("Viewers: " + game.viewers);
  console.log("Partners: " + game.partners);
  console.log("Partner Viewers: " + game.partnerViewers);
  console.log("----------------------------------\n");
}

