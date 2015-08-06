if Meteor.isServer
    Meteor.publish 'userNames', ->
      Meteor.users.find {},
        fields:
            username: 1
            status: 1

    Meteor.publish 'userGames', ->
      Games.find {$or : [
        { black: this.userId },
        { white: this.userId }
      ]}
    
