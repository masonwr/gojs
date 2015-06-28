

if Meteor.isServer

  if Meteor.users.find({}).count() < 1
    console.log "we have no users! adding default user"
    Accounts.createUser({
      email: 'winston@one.com',
      username: 'thing-one',
      password: 'one'
    });

    Accounts.createUser({
      email: 'winston@two.com',
      username: 'thing-two',
      password: 'two'
    });

  if Games.find({}).count() < 1
    console.log "create new game";

    defaultGame =
      whitePlayer: 1
      blackPlayer: 2
      currentMove: 'black'
      stones:[]
      gameHistory:[]
      size: 19 # this need to be programatically set in the future

    Games.insert defaultGame







