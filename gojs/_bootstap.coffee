

if Meteor.isServer

  if Meteor.users.find({}).count() < 1
    console.log "we have no users! adding default user"
    Accounts.createUser
      username: "winston"
      email: 'masonwr@mac.com'
      password: 'jojo'
      
    Accounts.createUser
      username: "riley"
      email: 'masonwr@max.com'
      password: 'jojo'
    

  #if Games.find({}).count() < 1
    #console.log "create new game";
    #defaultGame =
      #whitePlayer: 1
      #blackPlayer: 2
      #currentMove: 'black'
      #stones:[]
      #gameHistory:[]
      #size: 19 # this need to be programatically set in the future

    #Games.insert defaultGame







