@DEV_GAME_ID;

if Meteor.isServer
  numberOfPlayers = Players.find({}).count();

  if numberOfPlayers < 1
    console.log "add default players";

  if Games.find({}).count() < 1
    console.log "create new game";

    defaultGame =
      whitePlayer: 1
      blackPlayer: 2
      currentMove: 'black'
      stones:[]

    Games.insert defaultGame







