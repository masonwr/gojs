if (Meteor.isClient) {

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
                var isBlack = game.black == Meteor.userId();
                return isBlack ? game.blackScore : game.whiteScore;
            }
        },

        getRivalScore(){
            var gameId = Session.get(SESSON.ACTIVE_GAME);
            if (gameId) {
                var game = Games.findOne(gameId); 
                var isBlack = game.black == Meteor.userId();
                return isBlack ? game.whiteScore : game.blackScore;
            }
        }
    });


}
