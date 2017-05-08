const games = ["League of Legends", 
"Counter-Strike: Global Offensive", 
"PLAYERUNKNOWN'S BATTLEGROUNDS", 
"Hearthstone", 
"Dota 2", 
"Heroes of the Storm", 
"Overwatch", 
"Grand Theft Auto V", 
"Destiny", 
"Poker", 
"Magic: The Gathering", 
"Street Fighter V", 
"Tom Clancy's Rainbow Six: Siege", 
"World of Warcraft", 
"IRL", 
"FIFA 17", 
"Prey", 
"H1Z1: King of the Kill", 
"Creative", 
"NBA 2K17", 
"Madden NFL 17", 
"Minecraft", 
"RuneScape", 
"Mario Kart 8", 
"Dark Souls III", 
"StarCraft II", 
"Smite", 
"Path of Exile", 
"Halo 5: Guardians", 
"Talk Shows", 
"Call of Duty: Black Ops III", 
"Rust", 
"For Honor", 
"Gwent: The Witcher Card Game", 
"Casino", 
"Rocket League", 
"Black Desert Online", 
"The Legend of Zelda: Breath of the Wild", 
"Call of Duty: Infinite Warfare", 
"World of Tanks", 
"Outlast 2", 
"Pokémon Sun/Moon", 
"Diablo III: Reaper of Souls", 
"Dead by Daylight", 
"ARK", 
"Super Smash Bros. for Wii U", 
"Music", 
"Final Fantasy XIV: Heavensward", 
"StarCraft: Brood War", 
"Super Mario Maker",
"Mega Man X3",
"Super Smash Bros. Melee",
"Paladins",
"Kingdom Hearts HD I.5 + II.5 Remix",
"The Elder Scrolls V: Skyrim",
"Tom Clancy's The Division",
"Call of Duty: Modern Warfare Remastered",
"Battlefield 1",
"7 Days to Die",
"Borderlands 2"];

// Make request to endpoint
// Grab _total
// (_total % 100) is the amount of additional requests to make
// loop through each stream
//   totalViewers += viewers;
//   if (partner) {
//     totalPartners++;
//     totalPartnerViewers += viewers;
//   }
// make next request

const request = require("request");

let kraken = request.defaults({
  baseUrl: "https://api.twitch.tv/kraken/",
  headers: {
    "Accept": "application/vnd.twitchtv.v5+json",
    "Client-ID": process.env.CLIENT_ID
  },
  json: true
});

let gameData = [];

const async = require("async");

async.each(games, (game, callback) => {
  const gameUrlEncoded = encodeURIComponent(game);

  let limit = 100;
  let offset = 0;

  const url = "streams/?game=" + gameUrlEncoded + "&limit=" + limit + "&offset=" + offset;

  kraken({
    url: url
  }, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      console.log(err.message);
    }

    let totalViewers = 0;
    let totalPartners = 0;
    let totalPartnerViewers = 0;

    body.streams.forEach((stream) => {
      totalViewers += stream.viewers;
      if (stream.channel.partner === true) {
        totalPartners++;
        totalPartnerViewers += stream.viewers;
      }
    });

    const data = {
      time: new Date().getTime(),
      game: game,
      totalChannels: body._total,
      totalViewers: totalViewers,
      totalPartners: totalPartners,
      totalPartnerViewers: totalPartnerViewers
    };

    printGame(data);
    gameData.push(data);
  });

  callback(null);
}, (err) => {
  console.log("DATA LOADED");
  console.log(gameData);
  for (let i = 0; i < gameData.length; i++) {
    printGame(gameData[i]);
  }
});

function printGame(game) {
  console.log("Game: " + game.game);
  let date = new Date();
  date.setTime(game.time);
  console.log("Time: " + date);
  console.log("Total Channels: " + game.totalChannels);
  console.log("Total Viewers: " + game.totalViewers);
  console.log("Total Partners: " + game.totalPartners);
  console.log("Total Partner Viewers: " + game.totalPartnerViewers);

  const partnerPct = game.totalPartnerViewers / game.totalViewers;
  console.log("% Partner Viewers: " + (partnerPct) + "%");

  console.log("----------------------------------\n");
}

