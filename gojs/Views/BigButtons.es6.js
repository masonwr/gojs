if (Meteor.isClient) {

    Template.BigButtons.events({

        'click .logout': () => {
           Meteor.logout(); 
        },

        'click .side-panel-toggle' : (e) => {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled")
        }

    });

    Template.BigButtons.helpers({

        getCurrentStoneIcon(){
            game = Games.findOne( Session.get(SESSON.ACTIVE_GAME) );
            if (! game) return 'ion-ios-infinite-outline';

            return  game.white == Meteor.user()._id ? 'ion-ios-circle-outline' : 'ion-ios-circle-filled';
        },

        // funcion returns a css class, used to dim the 
        // current stone button.
        isTurn() {
            var game = Games.findOne( Session.get(SESSON.ACTIVE_GAME) );
            return game.activePlayer == Meteor.userId() ? 'active' : 'inactive';
        },
    });
}

