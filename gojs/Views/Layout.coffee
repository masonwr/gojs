if Meteor.isClient

  Template.layout.onCreated ->
    Meteor.subscribe('userNames')
  
  Template.layout.events
    'click #menu-toggle': (e) ->
      e.preventDefault()
      $("#wrapper").toggleClass("toggled")

  Template.layout.helpers
    game: (e) -> [1,2,4]
