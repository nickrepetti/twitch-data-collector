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
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Halo 5: Guardians' and p.name = 'Xbox';

insert into games(name) values('Mass Effect: Andromeda');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Mass Effect: Andromeda' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Mass Effect: Andromeda' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Mass Effect: Andromeda' and p.name = 'Playstation';

insert into games(name) values('Call of Duty: Black Ops III');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Call of Duty: Black Ops III' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Call of Duty: Black Ops III' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Call of Duty: Black Ops III' and p.name = 'Playstation';

insert into games(name) values('Rust');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Rust' and p.name = 'PC';

insert into games(name) values('For Honor');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'For Honor' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'For Honor' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'For Honor' and p.name = 'Playstation';

insert into games(name) values('Gwent: The Witcher Card Game');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Gwent: The Witcher Card Game' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Gwent: The Witcher Card Game' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Gwent: The Witcher Card Game' and p.name = 'Playstation';

insert into games(name) values('Rocket League');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Rocket League' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Rocket League' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Rocket League' and p.name = 'Playstation';

insert into games(name) values('Black Desert Online');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Black Desert Online' and p.name = 'PC';

insert into games(name) values('The Legend of Zelda: Breath of the Wild');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'The Legend of Zelda: Breath of the Wild' and p.name = 'Nintendo';

insert into games(name) values('Call of Duty: Infinite Warfare');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Call of Duty: Infinite Warfare' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Call of Duty: Infinite Warfare' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Call of Duty: Infinite Warfare' and p.name = 'Playstation';

insert into games(name) values('World of Tanks');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'World of Tanks' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'World of Tanks' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'World of Tanks' and p.name = 'Playstation';

insert into games(name) values('Outlast 2');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Outlast 2' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Outlast 2' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Outlast 2' and p.name = 'Playstation';

insert into games(name) values('Pokémon Sun/Moon');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Pokémon Sun/Moon' and p.name = 'Nintendo';

insert into games(name) values('Diablo III: Reaper of Souls');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Diablo III: Reaper of Souls' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Diablo III: Reaper of Souls' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Diablo III: Reaper of Souls' and p.name = 'Playstation';

insert into games(name) values('Dead by Daylight');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Dead by Daylight' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Dead by Daylight' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Dead by Daylight' and p.name = 'Playstation';

insert into games(name) values('ARK');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'ARK' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'ARK' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'ARK' and p.name = 'Playstation';

insert into games(name) values('Super Smash Bros. for Wii U');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Super Smash Bros. for Wii U' and p.name = 'Nintendo';

insert into games(name) values('Final Fantasy XIV: Heavensward');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Final Fantasy XIV: Heavensward' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Final Fantasy XIV: Heavensward' and p.name = 'Playstation';

insert into games(name) values('StarCraft: Brood War');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'StarCraft: Brood War' and p.name = 'PC';

insert into games(name) values('Super Mario Maker');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Super Mario Maker' and p.name = 'Nintendo';

insert into games(name) values('Super Smash Bros. Melee');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Super Smash Bros. Melee' and p.name = 'Nintendo';

insert into games(name) values('Paladins');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Paladins' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Paladins' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Paladins' and p.name = 'Playstation';

insert into games(name) values('Kingdom Hearts HD I.5 + II.5 Remix');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Kingdom Hearts HD I.5 + II.5 Remix' and p.name = 'Playstation';

insert into games(name) values('The Elder Scrolls V: Skyrim');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'The Elder Scrolls V: Skyrim' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'The Elder Scrolls V: Skyrim' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'The Elder Scrolls V: Skyrim' and p.name = 'Playstation';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'The Elder Scrolls V: Skyrim' and p.name = 'Nintendo';

insert into games(name) values('Tom Clancy''s The Division');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Tom Clancy''s The Division' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Tom Clancy''s The Division' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Tom Clancy''s The Division' and p.name = 'Playstation';

insert into games(name) values('Call of Duty: Modern Warfare Remastered');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Call of Duty: Modern Warfare Remastered' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Call of Duty: Modern Warfare Remastered' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Call of Duty: Modern Warfare Remastered' and p.name = 'Playstation';

insert into games(name) values('Battlefield 1');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Battlefield 1' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Battlefield 1' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Battlefield 1' and p.name = 'Playstation';

insert into games(name) values('7 Days to Die');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = '7 Days to Die' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = '7 Days to Die' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = '7 Days to Die' and p.name = 'Playstation';

insert into games(name) values('Borderlands 2');
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Borderlands 2' and p.name = 'PC';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Borderlands 2' and p.name = 'Xbox';
insert into gameplatforms(gameid, platformid) select gameid, platformid from games g, platforms p where g.name = 'Borderlands 2' and p.name = 'Playstation';

