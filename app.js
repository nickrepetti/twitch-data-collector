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

let gameData = [];
let totalChannels = 0;
let totalViewers = 0;
let totalPartners = 0;
let totalPartnerViewers = 0;

function makeRequest(game, limit, offset) {
  const url = buildURL(game, limit, offset);
  console.log("Request: " + url);
  req(buildURL(game, limit, offset), (err, res, body) => {
    if (err || res.statusCode !== 200) {
      console.log(err.message);
    } else {
      if (body.streams.length === 0) {
        return;
      }

      if (totalChannels === 0) {
        totalChannels = body._total;
      }

      body.streams.forEach((stream) => {
        totalViewers += stream.viewers;
        if (stream.channel.partner === true) {
          totalPartners++;
          totalPartnerViewers += stream.viewers;
        }
      });

      makeRequest(game, limit, offset + 100);
    }
  });
}

function captureGameData(game, cb) {
  makeRequest(game, 100, 0);

  const data = {
    game: game,
    time: new Date().getTime(),
    totalChannels: totalChannels,
    totalPartners: totalPartners,
    totalPartnerViewers: totalPartnerViewers,
    totalViewers: totalViewers
  };

  gameData.push(data);
  cb();
};

function buildURL(game, limit, offset) {
  const resource = "streams/";
  return `${resource}?game=${encodeURIComponent(game)}&limit=${limit}&offset=${offset}`;
}

function processData() {
  gameData.forEach(printGame);
}

let requests = games.map((game) => {
  return new Promise((resolve) => {
    captureGameData(game, resolve);
  });
});

Promise.all(requests).then(processData);

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

