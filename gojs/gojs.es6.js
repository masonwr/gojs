// globals
// they go here

// SESSION GLOBAL VARS
SESSON = {
    ACTIVE_GAME: 'active-game', //TODO spelling
    ERROR_MSG: 'error-msg',
    OPEN_CONTROLLS: 'open-controlls'
};

OPEN_CREATE_GAME_PANEL = 'open-create-game-panel';
SELECTED_PANEL = 'selected-panel';
SHOW_SIGNUP = 'show-signup';
SIGNUP_TOKEN = 'signup-token';
ACTIVE_INVIT_COUNT = 'open-invitation-count';
LOGIN_ICON = 'login-icon';

// OTHER GLOBAL CONSTANTS
TOKEN_LIMIT = 10; 

if (Meteor.isClient) {

    // choosing style for the vex modal system 
    vex.defaultOptions.className = 'vex-theme-default';

    Template.body.onCreated( () => {

        // router logic
        var url = window.location.pathname.split('/');
        url.shift();

        let [command, ...tail] = url;
        
        switch (command) {
            case 'register':
                Meteor.logout();
                if (tail.length == 1) Session.set(SIGNUP_TOKEN, tail[0]); 
                Session.set(SHOW_SIGNUP, true);
                break;
        }

    });
}

