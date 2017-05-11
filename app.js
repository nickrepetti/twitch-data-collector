"use strict";

const fs = require("fs");
const request = require("request");

const games = JSON.parse(fs.readFileSync("./games.json", "utf8"));

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

function captureGameData(req, game, time, limit, resolve, reject) {
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

    const pageCount = Math.floor((stream.channels / limit));
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
    }, { viewers: viewers, partners: partners, partnerViewers: partnerViewers });

    data.game = game;
    data.time = time;
    data.channels = channels;

    resolve(data);
  }).catch((err) => {
    console.log(err);
    reject(err);
  });
};

const time = new Date().getTime();
const limit = 100;
const req = request.defaults({
  baseUrl: "https://api.twitch.tv/kraken/",
  headers: {
    "Accept": "application/vnd.twitchtv.v5+json",
    "Client-ID": process.env.CLIENT_ID
  },
  json: true
});

let requests = games.map((game) => {
  return new Promise((resolve, reject) => {
    captureGameData(req, game, time, limit, resolve, reject);
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
  console.log("Channels: " + game.channels);
  console.log("Viewers: " + game.viewers);
  console.log("Partners: " + game.partners);
  console.log("Partner Viewers: " + game.partnerViewers);
  console.log("----------------------------------\n");
}

