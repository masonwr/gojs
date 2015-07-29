if Meteor.isClient

  Template.layout.onCreated ->
    instance = Template.instance()
    instance.subscribe('userNames')
    instance.subscribe('userGames')
  
  Template.layout.events
    'click #menu-toggle': (e) ->
      e.preventDefault()
      $("#wrapper").toggleClass("toggled")

  Template.layout.helpers
    isShowBoard: -> Session.get(SESSON.ACTIVE_GAME)

    game: -> Games.find {}

    getGameTitle: (gameDoc) ->
      whitePlayer = Meteor.users.findOne {_id: gameDoc.white}
      blackPlayer = Meteor.users.findOne {_id: gameDoc.black}
      '' + whitePlayer.username + ' VS ' + blackPlayer.username

    isTurn: ->
      game = Games.findOne( Session.get(SESSON.ACTIVE_GAME) )
      if game then game.activePlayer == Meteor.user()._id else false

    loadedOnScreen: ->
      game = Games.findOne( Session.get(SESSON.ACTIVE_GAME) )
      if this._id == game._id then 'on-screen' else 'off-screen'

    playersTurn: ->
      game = this
      if game.activePlayer == Meteor.user()._id  then 'active-turn' else 'opponents-turn'

    stoneColor: ->
      game = Games.findOne Session.get SESSON.ACTIVE_GAME
      return 'ion-ios-infinite-outline' if ! game
      if game.white == Meteor.user()._id then 'ion-ios-circle-outline' else 'ion-ios-circle-filled'

  Template.layout.events

    'click .active-game': () -> Session.set SESSON.ACTIVE_GAME, this._id
