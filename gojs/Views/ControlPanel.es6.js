if (Meteor.isClient) {

    Template.controlls.onCreated(() => {
        console.log("controlls created");
    });
        

    Template.controlls.helpers({
        getScore(){
            //var game = Games.findOne( Session.get(SESSON.ACTIVE_GAME) );
            //var isBlack = game.black == Meteor.userId();
            //return isBlack ? game.blackScore : game.whiteScore;
        },

        getRivalScore(){
            //var game = Games.findOne( Session.get(SESSON.ACTIVE_GAME) );
            //var isBlack = game.black == Meteor.userId();
            //return isBlack ? game.whiteScore : game.blackScore;
        }
    });


}
