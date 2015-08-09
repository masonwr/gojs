if Meteor.isClient

  Template.layout.onCreated ->
    instance = Template.instance()
    instance.subscribe('userNames')
    instance.subscribe('userGames')

    gameCur = Games.find()
    gameCur.observeChanges
      changed: (id, changed) ->
        # if the curently selected game was removed by the other player
        # TODO: should there be an error message here? or some kind of dialoge?
        dropCurrentGame = changed.isOver && id == Session.get SESSON.ACTIVE_GAME
        if dropCurrentGame
          Session.set SESSON.ACTIVE_GAME, false
         
  
  Template.layout.events
    'click #menu-toggle': (e) ->
      e.preventDefault()
      $("#wrapper").toggleClass("toggled")

  Template.layout.helpers

    getPanel: -> Session.get SELECTED_PANEL

    isShowBoard: -> Session.get(SESSON.ACTIVE_GAME)

    game: ->
      games = Games.find({}).fetch()
      _.reject games, (g) -> g.isOver

    getGameTitle: (gameDoc) ->
      whitePlayer = Meteor.users.findOne {_id: gameDoc.white}
      blackPlayer = Meteor.users.findOne {_id: gameDoc.black}
      '' + whitePlayer.username + ' VS ' + blackPlayer.username

    isTurn: ->
      game = Games.findOne( Session.get(SESSON.ACTIVE_GAME) )
      if game then game.activePlayer == Meteor.user()._id else false

    # loadedOnScreen is used to detect which game has been selected
    # in the side panel.
    loadedOnScreen: ->
      game = Games.findOne( Session.get(SESSON.ACTIVE_GAME) )
      if not game
        return

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
