
if Meteor.isServer

  if Meteor.users.find({}).count() < 1
    console.log "we have no users! adding default user"
    Accounts.createUser
      username: "winston"
      password: 'jojo'
      
    Accounts.createUser
      username: "mason"
      password: 'jojo'
    

