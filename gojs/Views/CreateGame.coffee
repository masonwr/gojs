if Meteor.isClient

  Template.CreateGame.helpers
    players:  -> Meteor.users.find(_id: $not: Meteor.userId()).fetch()

  Template.CreateGame.events
    'click #invite': ->
      oppID = $("#choosePlayer").val()
      defalutSize = 19
      Meteor.call('registerGame', oppID, defalutSize)


if Meteor.isServer

    Meteor.methods
        registerGame: (invitee, size) ->
            inviter = Meteor.userId()
            invitee = Meteor.users.findOne( username : invitee)

            console.log "invitee id", invitee._id

            Games.insert
                whitePlayer: inviter
                blackPlayer: invitee._id
                currentMove: 'black'
                stones: []
                gameHistory: []
                size: size 


            
