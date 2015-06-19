@DEV_GAME_ID;

if Meteor.isServer


  if Games.find({}).count() < 1
    console.log "create new game";

    defaultGame =
      whitePlayer: 1
      blackPlayer: 2
      currentMove: 'black'
      stones:[]
      gameHistory:[]

    Games.insert defaultGame







