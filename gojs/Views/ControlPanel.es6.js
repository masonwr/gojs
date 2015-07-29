if (Meteor.isClient) {

    Template.ControlPanel.events({
        'click .logout': () => Meteor.logout(),

    });

}
