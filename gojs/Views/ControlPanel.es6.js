if (Meteor.isClient) {
    let actions = {
        resign(){
            vex.dialog.confirm({
                message: 'are you sure that you want to resign from this game?',
                callback: function(value) {
                    if (value){
                        console.log(Session.get(SESSON.ACTIVE_GAME) );
                        Meteor.call('endGame', Session.get(SESSON.ACTIVE_GAME), (err, res) => {
                            if (err){
                                //erro handeling?
                            } else if (res) {
                                Session.set(SESSON.ACTIVE_GAME, false);
                            }
                        });
                    }
                }
            });
        },

        pass(){
            vex.dialog.confirm({
                message: 'are you absolutely sure you want to pass', 
                callback: function(value) {
                    return console.log(value ? 'successfully destroyed the planet.' : 'chicken.');
                }
            });
        },

        logout(){
            Meteor.logout();
        },

        invite(){
            vex.dialog.confirm({
                message: `Generate invitation token?`, 
                callback: function(value) {
                    if (! value) return;

                    Meteor.call('generateToken', (err, token) => {
                        if (err) {
                            vex.dialog.alert(err.reason);
                            return;
                        }

                        Session.set(ACTIVE_INVIT_COUNT, Session.get(ACTIVE_INVIT_COUNT) + 1);

                        let url = Meteor.absoluteUrl() + 'register/' + token;

                        let message = `Please give the following token to the person
                            you would like to invite: <code>${token}</code>. <br />
                            Or, simply give them this url: <a href="${url}">${url}</a> <br />
                            (you can only use a token once)`;

                        vex.dialog.alert(message);
                    });
                }
            });
        }
    };
    
    Template.controlls.onCreated( () => {
        Template.instance().autorun( () => {
            var s = Session.get(ACTIVE_INVIT_COUNT); //reactive hook
            Meteor.call('openInvitationCount', (err, count) => {
                Session.set(ACTIVE_INVIT_COUNT, count);
            })
        });
    });

    Template.controlls.onRendered(() => {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    });
        
    Template.controlls.helpers({
        countOpenInvites(){
           return TOKEN_LIMIT - Session.get(ACTIVE_INVIT_COUNT); 
        },

        getScore(){
            var gameId = Session.get(SESSON.ACTIVE_GAME);
            if (gameId) {
                var game = Games.findOne(gameId);
                if (game) {
                    var isBlack = game.black == Meteor.userId();
                    return isBlack ? game.blackScore : game.whiteScore;
                }
            }
        },

        getRivalScore(){
            var gameId = Session.get(SESSON.ACTIVE_GAME);
            if (gameId) {
                var game = Games.findOne(gameId); 
                if (game) {
                    var isBlack = game.black == Meteor.userId();
                    return isBlack ? game.whiteScore : game.blackScore;
                }
            }
        },

        isDisabled() {
            return Session.get(SESSON.ACTIVE_GAME) ? '' : 'disable';
        }
    });


    Template.controlls.events({
        'click .controlls a': (e) => {
            let action = e.currentTarget.id;
            actions[action]();
        },
    });
}

if (Meteor.isServer) {

    Meteor.methods({
        endGame(gameId){
            let game = Games.findOne(gameId);
            if (game.white == this.userId || game.black == this.userId) {
                game.end();
                return true;
            } else {
                throw new Meteor.Error('deny', 'user is not allowed to removed this game!');
            }
        }
    });
}
