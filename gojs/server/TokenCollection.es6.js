Tokens = new Mongo.Collection('tokens');

const TOKEN_TTL_DAYS = 3;

Meteor.methods({
    
    generateToken(){
        if (this.userId) {

            Tokens.find().forEach( (t) => {
                if (isTokenExpired(t))  Tokens.remove(t); 
            });

            let doc = {
                createdBy: this.userId,
                createdAt: new Date(),
            };

            let outstandingTokens = Tokens.find({createdBy: this.userId}).count();
            if (outstandingTokens >= TOKEN_LIMIT){
                throw new Meteor.Error('exceeding-token-limit', `You have created too many tokens! 
                                       Please wait ${TOKEN_TTL_DAYS} days for tokens to expire. <br />
                                       (you can only have ${TOKEN_LIMIT} active tokens at a time)`);
            }

            let token = Tokens.insert(doc);
            return token;
        }
    }

});

function isTokenExpired( tokenDoc ) {
    let tokenDate = tokenDoc.createdAt;
    let now = new Date();
    let timeDiff = Math.abs(tokenDate.getTime() - now.getTime());
    let timeDiffinDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return timeDiffinDays >= TOKEN_TTL_DAYS;
}

