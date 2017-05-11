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

function makeRequest(url) {
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

function captureGameData(game, time, limit, resolve, reject) {
  const initialOffset = 0;
  const initialUrl = buildUrl(game, limit, initialOffset);

  makeRequest(initialUrl).then((stream) => {
    const pageCount = Math.floor((stream.channels / limit));
    var reqests = [];

    for (let i = 0; i < pageCount; i++) {
      const offset = (i + 1) * limit;
      const url = buildUrl(game, limit, offset);

      requests.push(makeRequest(url));
    }

    return Promise.all(requests);
  }).then((streams) => {
    let data = streams.reduce((acc, stream) => {
      let channels = stream.channels;
      let viewers = acc.viewers + stream.viewers;
      let partners = acc.partners + stream.partners;
      let partnerViewers = acc.partnerViewers + stream.partnerViewers;

      return { channels, viewers, partners, partnerViewers };
    }, { viewers: 0, partners: 0, partnerViewers: 0 });

    data.game = game;
    data.time = time;

    console.log("HERE");

    resolve(data);
  }).catch((err) => {
    console.log(err);
    reject(err);
  });
};

const time = new Date().getTime();
const limit = 100;

let requests = games.map((game) => {
  return new Promise((resolve, reject) => {
    captureGameData(game, time, limit, resolve, reject);
  });
});

Promise.all(requests).then((results) => {
  results.forEach(printGame);
});

function buildUrl(game, limit, offset) {
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

