if (Meteor.isClient) {

    //Template.Login.onCreated( () => {
        //let showSignup = window.location.href.split('/').pop() == 'register'; 
        //Session.set(SHOW_SIGNUP, showSignup);
    //});
    //
    
    let loginIcons = [ 'ion-ios-bolt'
                     , 'ion-ionic'
                     , 'ion-asterisk'
                     , 'ion-hammer'
                     , 'ion-eye-disabled'
                     , 'ion-eye'
                     ];

    Template.Login.onCreated( () => {
        setInterval( () => Session.set(LOGIN_ICON, _.sample(loginIcons)), 2000);
        //todo on detroy kill this interval from firing...
    });

    Template.Login.helpers({
        getLoginIcon(){
            return Session.get(LOGIN_ICON);
        }
    });

    Template.Login.events({
        'click #signup-icon': () => {
            vex.dialog.open({
                message: 'Register your username and password:',
                input:`<input name="username" type="text" placeholder="Username" required />
                       <input name="password" type="password" placeholder="Password" required />
                       <input name="token" type="text" value="${Session.get(SIGNUP_TOKEN) || ''}" placeholder="token" required />`,
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {
                        text: 'Register'
                    }), $.extend({}, vex.dialog.buttons.NO, {
                        text: 'Back'
                    })
                ],

                callback: function(data) {
                    if (data === false) return;
                    Meteor.call('registerUser', data, (err, success) => {
                        if (err) {
                            vex.dialog.alert(err.reason);
                        }

                        if (success) {
                            Meteor.loginWithPassword(data.username, data.password);
                        }
                    });
                }
            });
        },

        'click #login-icon': () => {
            vex.dialog.open({
                message: '',
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
                        if (err) vex.dialog.alert(err.reason); 
                    });
                }
            });
        }
    });

}
