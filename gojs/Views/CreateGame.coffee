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
      console.log "this", this

      config = {
        black : this._id
        white : Meteor.user()._id
      }

      Meteor.call 'createGame', config



if Meteor.isServer
  Meteor.methods
    'createGame' : (config) ->
        config.currentMove = config.black
        config.stones = []
        config.gameHistory = []
        config.size = 19 

        Games.insert config
