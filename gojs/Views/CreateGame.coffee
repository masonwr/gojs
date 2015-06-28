if Meteor.isClient

  Template.CreateGame.helpers
    players:  -> Meteor.users.find(_id: $not: Meteor.userId()).fetch()

  Template.CreateGame.events
    'click #create': ->
      oppID = $("#choosePlayer").val()
      console.log oppID