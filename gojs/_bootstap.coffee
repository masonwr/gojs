

if Meteor.isServer

    if Meteor.users.find({}).count() < 1
        console.log "we have no users! adding default user"
        Accounts.createUser
          email: 'winston@one.com'
          username: 'one'
          password: 'one'

        Accounts.createUser
          email: 'winston@two.com'
          username: 'two'
          password: 'two'

        Accounts.createUser
          email: 'winston@three.com'
          username: 'three'
          password: 'three'

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







