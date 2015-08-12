if (Meteor.isClient) {

    Template.Login.onCreated( () => {
        let showSignup = window.location.href.split('/').pop() == 'add'; 
        Session.set(SHOW_SIGNUP, showSignup);
    });

    Template.Login.events({
        'click #signup-icon': () => {
            vex.dialog.open({
                message: 'Register your username and password:',
                input:`<input name="username" type="text" placeholder="Username" required />
                       <input name="password" type="password" placeholder="Password" required />`,
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {
                        text: 'Login'
                    }), $.extend({}, vex.dialog.buttons.NO, {
                        text: 'Back'
                    })
                ],

                callback: function(data) {
                    if (data === false) return;
                    //Accounts.createUser(data);
                    Meteor.call('registerUser', data);
                }
            });
        },

        'click #login-icon': () => {
            vex.dialog.open({
                message: 'Enter your username and password:',
                input:`<input name="username" type="text" placeholder="Username" required />
                       <input name="password" type="password" placeholder="Password" required />`,
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {
                        text: 'Login'
                    }), $.extend({}, vex.dialog.buttons.NO, {
                        text: 'Back'
                    })
                ],
                callback: function(data) {
                    if (data === false) return;

                    Meteor.loginWithPassword(data.username, data.password, function(err, thing){
                        if (err) console.log(err);
                    });
                }
            });
        }
    });

}
