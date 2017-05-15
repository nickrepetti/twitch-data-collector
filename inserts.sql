-----------------------------------
------------ Platforms ------------
-----------------------------------
insert into platforms(name) values('PC');

insert into platforms(name) values('Xbox');

insert into platforms(name) values('Playstation');

insert into platforms(name) values('Nintendo');

insert into platforms(name) values('Mobile');

-----------------------------------
------ Games & GamePlatforms ------
-----------------------------------
insert into games(name) values('League of Legends');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'League of Legends' and p.name = 'PC';

insert into games(name) values('Counter-Strike: Global Offensive');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Counter-Strike: Global Offensive' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Counter-Strike: Global Offensive' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Counter-Strike: Global Offensive' and p.name = 'Playstation';

insert into games(name) values('PLAYERUNKNOWN''S BATTLEGROUNDS');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'PLAYERUNKNOWN''S BATTLEGROUNDS' and p.name = 'PC';

insert into games(name) values('Hearthstone');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Hearthstone' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Hearthstone' and p.name = 'Mobile';

insert into games(name) values('Dota 2');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Dota 2' and p.name = 'PC';

insert into games(name) values('Heroes of the Storm');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Heroes of the Storm' and p.name = 'PC';

insert into games(name) values('Overwatch');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Overwatch' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Overwatch' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Overwatch' and p.name = 'Playstation';

insert into games(name) values('Grand Theft Auto V');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Grand Theft Auto V' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Grand Theft Auto V' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Grand Theft Auto V' and p.name = 'Playstation';

insert into games(name) values('Destiny');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Destiny' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Destiny' and p.name = 'Playstation';

insert into games(name) values('Quake Champions');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Quake Champions' and p.name = 'PC';

insert into games(name) values('The Surge');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'The Surge' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'The Surge' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'The Surge' and p.name = 'Playstation';

insert into games(name) values('Street Fighter V');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Street Fighter V' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Street Fighter V' and p.name = 'Playstation';

insert into games(name) values('Tom Clancy''s Rainbow Six: Siege');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Tom Clancy''s Rainbow Six: Siege' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Tom Clancy''s Rainbow Six: Siege' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Tom Clancy''s Rainbow Six: Siege' and p.name = 'Playstation';

insert into games(name) values('World of Warcraft');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'World of Warcraft' and p.name = 'PC';

insert into games(name) values('FIFA 17');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'FIFA 17' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'FIFA 17' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'FIFA 17' and p.name = 'Playstation';

insert into games(name) values('Prey');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Prey' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Prey' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Prey' and p.name = 'Playstation';

insert into games(name) values('H1Z1: King of the Kill');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'H1Z1: King of the Kill' and p.name = 'PC';

insert into games(name) values('NBA 2K17');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'NBA 2K17' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'NBA 2K17' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'NBA 2K17' and p.name = 'Playstation';

insert into games(name) values('Madden NFL 17');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Madden NFL 17' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Madden NFL 17' and p.name = 'Playstation';

insert into games(name) values('Minecraft');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Minecraft' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Minecraft' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Minecraft' and p.name = 'Playstation';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Minecraft' and p.name = 'Mobile';

insert into games(name) values('RuneScape');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'RuneScape' and p.name = 'PC';

insert into games(name) values('Mario Kart 8');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Mario Kart 8' and p.name = 'Nintendo';

insert into games(name) values('Dark Souls III');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Dark Souls III' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Dark Souls III' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Dark Souls III' and p.name = 'Playstation';

insert into games(name) values('StarCraft II');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'StarCraft II' and p.name = 'PC';

insert into games(name) values('Smite');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Smite' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Smite' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Smite' and p.name = 'Playstation';

insert into games(name) values('Path of Exile');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Path of Exile' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Path of Exile' and p.name = 'Xbox';

insert into games(name) values('Halo 5: Guardians');

insert into games(name) values('Mass Effect: Andromeda');

insert into games(name) values('Call of Duty: Black Ops III');

insert into games(name) values('Rust');

insert into games(name) values('For Honor');

insert into games(name) values('Gwent: The Witcher Card Game');

insert into games(name) values('Rocket League');

insert into games(name) values('Black Desert Online');

insert into games(name) values('The Legend of Zelda: Breath of the Wild');

insert into games(name) values('Call of Duty: Infinite Warfare');

insert into games(name) values('World of Tanks');

insert into games(name) values('Outlast 2');

insert into games(name) values('Pokémon Sun/Moon');

insert into games(name) values('Diablo III: Reaper of Souls');

insert into games(name) values('Dead by Daylight');

insert into games(name) values('ARK');

insert into games(name) values('Super Smash Bros. for Wii U');

insert into games(name) values('Final Fantasy XIV: Heavensward');

insert into games(name) values('StarCraft: Brood War');

insert into games(name) values('Super Mario Maker');

insert into games(name) values('Mega Man X3');

insert into games(name) values('Super Smash Bros. Melee');

insert into games(name) values('Paladins');

insert into games(name) values('Kingdom Hearts HD I.5 + II.5 Remix');

insert into games(name) values('The Elder Scrolls V: Skyrim');

insert into games(name) values('Tom Clancy''s The Division');

insert into games(name) values('Call of Duty: Modern Warfare Remastered');

insert into games(name) values('Battlefield 1');

insert into games(name) values('7 Days to Die');

insert into games(name) values('Borderlands 2');

