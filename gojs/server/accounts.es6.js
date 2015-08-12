
Accounts.config({
      forbidClientAccountCreation : true
});


Meteor.methods({

    registerUser( {username, password, token}){
        let tokenFound = Tokens.findOne(token);
        if (tokenFound) {
            let created = Accounts.createUser({username, password});
            created ? Tokens.remove({ _id: token}) : () => {throw new Meteor.Error("failed-to-add-user")}(); 
            return true;
        } else {
            throw new Meteor.Error('invalid-token', `The token you have you to register is invalid. Please seek a new token.`);
        }
    }

});


