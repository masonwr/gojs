if Meteor.isClient
  Template.createGame.helpers
    player: -> _.reject( Meteor.users.find().fetch()
                        ,(v) -> v.username == Meteor.user().username)
