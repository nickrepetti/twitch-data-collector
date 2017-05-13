create table Games(
  GameID             serial2     primary key              not null,
  Name               text                                 not null
);

create table GameData(
  GameDataID         serial4     primary key              not null,
  GameID             serial2     references Games(GameID) not null,
  Timestamp          timestamptz default now()            not null,
  StreamCount        int2                                 not null,
  ViewerCount        int4                                 not null,
  PartnerCount       int2                                 not null,
  PartnerViewerCount int4                                 not null
);

