
Accounts.config({
      forbidClientAccountCreation : true
});


Meteor.methods({

    registerUser({username, password, token}){
        console.log("createuser called");
        console.log(username);
        console.log(password);
        console.log(token);
    }

});


