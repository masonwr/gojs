if (Meteor.isClient) {

    vex.defaultOptions.className = 'vex-theme-default';

    var actions = {
        resign(){
            vex.dialog.confirm({
                message: 'are you sure that you want to resign from this game?',
                callback: function(value) {
                    if (value){
                        console.log(Session.get(SESSON.ACTIVE_GAME) );
                        Meteor.call('endGame', Session.get(SESSON.ACTIVE_GAME), (err, res) =>{
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
        }
    };

    Template.controlls.onRendered(() => {
        //console.log("controlls created");
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    });
        

    Template.controlls.helpers({
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
