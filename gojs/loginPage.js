if (Meteor.isClient) {

    Template.loginPage.onRendered( function () {
    

        $('#term').terminal(function(command, term) {
            console.log("are we getting here?");
            if (command == 'test') {
                term.echo("you just typed 'test'");
            } else {
                term.echo('unknown command');
            }
        }, { prompt: '>', login: function(user, pass, call){

            Meteor.loginWithPassword(user, pass);

        } });

    })

}

