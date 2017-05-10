"use strict";

const fs = require("fs");
const request = require("request");

const games = JSON.parse(fs.readFileSync("./games.json", "utf8"));

const req = request.defaults({
  baseUrl: "https://api.twitch.tv/kraken/",
  headers: {
    "Accept": "application/vnd.twitchtv.v5+json",
    "Client-ID": process.env.CLIENT_ID
  },
  json: true
});

function makeRequest(game, offset, resolve, reject) {
  const url = buildURL(game, 100, offset);
  console.log("Request: " + url);

  req(url, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      reject(err);
    } else {
      let channels,
          viewers = 0,
          partners = 0,
          partnerViewers = 0;

      channels = body._total;

      body.streams.forEach((stream) => {
        viewers += stream.viewers;

        if (stream.channel.partner === true) {
          partners++;
          partnerViewers += stream.viewers;
        }
      });

      resolve({ offset, channels, viewers, partners, partnerViewers });
    }
  });
}

function captureGameData(game, resolve) {
  let promises = [];

  // Use recursion to continue making requests?
  let promise = new Promise((resolve, reject) => {
    makeRequest(game, 0, resolve, reject);
  });

  promises.push(promise);

  promise.then((result) => {
    if (result.viewers > 0) {
      let newPromise = new Promise((resolve, reject) => {
        makeRequest(game, result.offset + 100, resolve, reject);
      });

      promises.push(newPromise);
    }
  });

  Promise.all(promises).then((results) => {
    let totalChannels;
    let totalViewers = 0;
    let totalPartners = 0;
    let totalPartnerViewers = 0;

    const time = new Date().getTime();

    // Use reduce to get a single object??
    results.forEach((result) => {
      totalChannels = result.channels;
      totalViewers += result.viewers;
      totalPartners += result.partners;
      totalPartnerViewers += result.partnerViewers;
    });

    resolve({ game, time, totalChannels, totalPartners, totalPartnerViewers, totalViewers });
  });
};

let requests = games.map((game) => {
  return new Promise((resolve, reject) => {
    captureGameData(game, resolve);
  });
});

Promise.all(requests).then((results) => {
  results.forEach(printGame);
});

function buildURL(game, limit, offset) {
  const resource = "streams/";
  return `${resource}?game=${encodeURIComponent(game)}&limit=${limit}&offset=${offset}`;
}

function printGame(game) {
  console.log("Game: " + game.game);
  let date = new Date();
  date.setTime(game.time);
  console.log("Time: " + date);
  console.log("Total Channels: " + game.totalChannels);
  console.log("Total Viewers: " + game.totalViewers);
  console.log("Total Partners: " + game.totalPartners);
  console.log("Total Partner Viewers: " + game.totalPartnerViewers);
  console.log("----------------------------------\n");
}

