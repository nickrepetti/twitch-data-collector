create table games(
  gameid             serial2     primary key                      not null,
  name               text                                         not null
);

create table platforms(
  platformid         serial2     primary key                      not null,
  name               text                                         not null
);

create table gameplatforms(
  gameid             serial2     references games(gameid)         not null,
  platformid         serial2     references platforms(platformid) not null
);

create table gamedata(
  gamedataid         serial4     primary key                      not null,
  gameid             serial2     references games(gameid)         not null,
  timestamp          timestamptz default now()                    not null,
  language           text                                         not null,
  streamcount        int2                                         not null,
  viewercount        int4                                         not null,
  partnercount       int2                                         not null,
  partnerviewercount int4                                         not null
);

create table rawdata(
  rawdataid          serial4     primary key                      not null,
  gameid             serial2     references games(gameid)         not null,
  timestamp          timestamptz default now()                    not null,
  rawdata            jsonb                                        not null
);

