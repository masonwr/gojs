if Meteor.isClient

  Template.GameList.helpers
    name: ->
      user = Meteor.user()
      if user
        user.emails[0].address

    games: ->
      games = Games.find

