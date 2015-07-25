

if Meteor.isServer

  if Meteor.users.find({}).count() < 1
    console.log "we have no users! adding default user"
    Accounts.createUser
      username: "winston"
      email: 'masonwr@mac.com'
      password: 'jojo'
      
    Accounts.createUser
      username: "riley"
      email: 'masonwr@max.com'
      password: 'jojo'
    
  # add a game where the black and whilte are bothe dame same id
  #if Games.find({}).count() < 1
  # Meteorcall etc....







