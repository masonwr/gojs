if Meteor.isClient

  Template.layout.onCreated ->
    Meteor.subscribe('userNames')
    Meteor.subscribe('userGames')
  
  Template.layout.events
    'click #menu-toggle': (e) ->
      e.preventDefault()
      $("#wrapper").toggleClass("toggled")

  Template.layout.helpers
    isShowBoard: ->
      Session.get(SESSON.ACTIVE_GAME)

    game: Games.find {} 

    getGameTitle: (gameDoc) ->
      whitePlayer = Meteor.users.findOne {_id: gameDoc.white}
      blackPlayer = Meteor.users.findOne {_id: gameDoc.black}
      '' + whitePlayer.username + ' VS ' + blackPlayer.username

  Template.layout.events

    'click .active-game': () -> Session.set SESSON.ACTIVE_GAME, this._id
