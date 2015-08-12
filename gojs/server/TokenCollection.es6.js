Tokens = new Mongo.Collection('tokens');

Meteor.methods({
    
    generateToken(){
        if (this.userId) {
            let doc = {
                createdBy: this.userId,
                createdAt: new Date(),
            };
            let token = Tokens.insert(doc);
            return token;
        }
    }

});

