"use strict";

const fs = require("fs");
const pg = require("pg");

// Array of games to capture data for.
const games = JSON.parse(fs.readFileSync("./games.json", "utf8"));

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

let statements = games.map((game) => {
  return new Promise((resolve, reject) => {
    client.query("insert into games(name) values($1)", [game], (err, result) => {
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

