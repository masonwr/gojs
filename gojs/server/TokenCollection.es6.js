Tokens = new Mongo.Collection('tokens');

Tokens.helpers({
    expire(){
        this.used = true;
        Tokens.update({_id: this._id}, this);
    }
        
});

const TOKEN_TTL_DAYS = 3;

Meteor.methods({
    
    generateToken(){
        if (this.userId) {

            Tokens.find().forEach( (t) => {
                //todo purge token older than, say 30 days...
                if (daysActive(t) >= TOKEN_TTL_DAYS) t.expire(); 
            });

            let doc = {
                createdBy: this.userId,
                createdAt: new Date(),
            };

            let outstandingTokens = Tokens.find({createdBy: this.userId}).count();
            if (outstandingTokens >= TOKEN_LIMIT){
                throw new Meteor.Error('exceeding-token-limit', `You have created too many tokens! <br />
                                       (you can only make ${TOKEN_LIMIT} tokens)`);
            }

            let token = Tokens.insert(doc);
            return token;
        }
    },

    openInvitationCount() {
        if (! this.userId) return null;
        return Tokens.find({createdBy: this.userId}).count();
    }

});

function daysActive( tokenDoc ) {
    let tokenDate = tokenDoc.createdAt;
    let now = new Date();
    let timeDiff = Math.abs(tokenDate.getTime() - now.getTime());
    let timeDiffinDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return timeDiffinDays; 
}

