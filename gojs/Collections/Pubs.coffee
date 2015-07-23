

if Meteor.isServer
    Meteor.publish 'userNames', ->
      Meteor.users.find {},
        fields:
            username: 1
    
