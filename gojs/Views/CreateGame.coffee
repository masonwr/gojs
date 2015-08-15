Meteor.methods
  makeMove : (x, y, gameId) ->
    game = Games.findOne _id: gameId
    
    if ! game
      throw "no game found! fatal error!"

    if game.activePlayer != this.userId
      throw new Meteor.Error "it is not your turn"

    if ! game.isEmpty x, y
      throw new Meteor.Error "that space is filled!"

    color = if game.white == this.userId then 'white' else 'black'
    
    game.makeMove(x, y, color)
      
    nextPlayer = if color == 'white' then game.black else game.white
    game.setActivePlayer nextPlayer
    return true

if Meteor.isClient
  Template.createGame.helpers
    status: ->
      if this.status.idle
        return 'idle'
      else if this.status.online
        return 'online'
      else
        return 'offline'

    player: -> _.reject(
      Meteor.users.find().fetch(),
      (v) -> v.username == Meteor.user().username)

  Template.createGame.events
    'click .player' : ->
      opponent = this
      vex.dialog.confirm
        message: "would you like to invite #{this.username} to a game?"
        callback: (value) ->
          if value
            Meteor.call 'createGame', Meteor.user()._id, opponent._id


#// TODO look at where there methods should go.
if Meteor.isServer
  Meteor.methods
    'createGame' : (whiteId, blackId) ->
      config =
        white: whiteId
        whiteScore: 0
        black: blackId
        blackScore: 0
        activePlayer: blackId
        stones: []
        gameHistory: []
        size: 19

      Games.insert config



