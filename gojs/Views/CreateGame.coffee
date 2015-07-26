if Meteor.isClient
  Template.createGame.helpers
    #game: ->
      #Games.find {}

    #returs a list of players to invite to a game
    player: -> _.reject(
      Meteor.users.find().fetch(),
      (v) -> v.username == Meteor.user().username)

  Template.createGame.events
    'click .player' : ->
      opponent = this
      Meteor.call 'createGame', Meteor.user()._id, opponent._id


#// TODO look at where there methods should go.
if Meteor.isServer
  Meteor.methods
    'createGame' : (whiteId, blackId) ->
      config = {}
      config.white = whiteId
      config.black = blackId
      config.activePlayer = config.black
      config.stones = []
      config.gameHistory = []
      config.size = 19
      Games.insert config


    makeMove : (x, y, gameId) ->
      # is it this users turn
      # if it is try to make move
      # if move is successfull update currentmove
      # else return fail message
      
      game = Games.findOne _id: gameId



      if ! game
        console.error "no game foud! what the fuck"
        throw "no game found!"

      if game.activePlayer != this.userId
        throw new Meteor.Error "it is not your turn"
        return false

      if ! game.isEmpty x, y
        throw new Meteor.Error "that space is filled!"


      color = if game.white == this.userId then 'white' else 'black'

      #console.log "color", color
      move = game.makeMove(x, y, color)

      if move
        console.log "move was a success"
        nextPlayer = if color == 'white' then game.black else game.white
        game.setActivePlayer nextPlayer
        return true

      else
        console.log "move was not successful"
        return false
