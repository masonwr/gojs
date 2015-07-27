if (Meteor.isClient) {

    Template.loginPage.onRendered( function () {

        $('#term').terminal(function(command, term) {
            console.log("are we getting here?");

            if (command == 'playgo') {
                term.echo("please enter desured user name: ");
                //console.log("term", term);
                //term.exit();
                return;
            }

            if (command == 'test') {
                term.echo("you just typed 'test'");
            } else {
                term.echo('unknown command');
            }
        }, { login: function(user, pass, call){

            if (user == 'playgo') {
                call(true);
                return;
            }

            Meteor.loginWithPassword(user, pass, function(err, thing){
                if (err) call(false);
            });

        },
        greetings: "please enter email"
        })

    })

}


