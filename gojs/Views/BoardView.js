// vars for drawing the board
var BOARDS = {
    small: 9,
    medium: 13,
    large: 19
};

var SIZE = 950;
var LINE_WIDTH = 2; 
var GAME_SIZE = BOARDS.large; //TODO this might become a problem... this logic could be moved to the oncreated callback perhaps...
var LINE_COLOR = '#333333';
var OFFSET = SIZE / GAME_SIZE;

//TODO may be move this only the actual player doc?
var players = ['black', 'white'];
var currentPlayer = 0;


var background;
var context;


var forground;
var context_forground;


if (Meteor.isClient) {

    Template.board.onRendered(function () {

        CanvasRenderingContext2D.prototype.fillCircle = function (x, y, r, color) {
            this.beginPath();
            this.arc(x, y, r, 0, Math.PI * 2, true);
            this.closePath();
            this.fillStyle = color;
            this.fill();
        };


        background = document.getElementById("background");
        context = background.getContext("2d");

        forground = document.getElementById("forground");
        context_forground = forground.getContext("2d");


        // sets the color for the board
        context.fillStyle = LINE_COLOR;

        // draw board grid
        for (var i = 0; i < GAME_SIZE; i++) {
            var line_len = SIZE - OFFSET;
            var m = (i * OFFSET) + OFFSET;

            context.fillRect(m, OFFSET, LINE_WIDTH, line_len);
            context.fillRect(OFFSET, m, line_len, LINE_WIDTH);
        }

        // draw star points
        for (var i = 0; i < 9; i++) {
            var f = function (n) {
                return 6 * n + 4
            }; // defines start point placement

            var div = f(Math.floor(i / 3));
            var rem = f(i % 3);

            var x = div * OFFSET + LINE_WIDTH / 2;
            var y = rem * OFFSET + LINE_WIDTH / 2;

            context.fillCircle(x, y, 5, LINE_COLOR);
        }
        // should draw all the stone on the board here too.
    });


    Template.board.helpers({

        getStones: function () {
            if (context_forground) {
                context_forground.clearRect(0, 0, background.width, background.height);
            } else {
                console.log("context has not been set yet!");
            }
            var game = Games.findOne({_id: Session.get(SESSON.ACTIVE_GAME)});
            return game ? game.stones : [];
        },

        drawStone: function (stone) {
            context_forground.fillCircle(
                stone.x * OFFSET,
                stone.y * OFFSET,
                OFFSET / 2,
                stone.player);
        },

    });

    Template.board.events({

        //'click #removeStone': function (e) {
            //game.removeAllStone();
        //},

        //'click #clearHistory': function (e) {
            //var res = Games.update({_id: game._id}, {$set : {gameHistory: []}});
            //console.log("what the fuc!", res);
        //},

        'click #forground': function (event) {

            var xyoffset = $(event.target).offset();
            var x = event.pageX - xyoffset.left;
            var y = event.pageY - xyoffset.top;

            var xp = Math.round(x / OFFSET);
            var yp = Math.round(y / OFFSET);

            var isValid =
                xp > 0 && yp > 0 &&
                xp <= GAME_SIZE && yp <= GAME_SIZE;

            if (!isValid) {
                console.log('invalid move');
                return;
            }

            var game = Games.findOne({_id: Session.get(SESSON.ACTIVE_GAME)});

            if (! game){
                console.log("no game is active");
                return;
            }

            if (game.isEmpty(xp, yp)) {

                //var moveMade = game.makeMove(xp, yp, players[currentPlayer]);

                Meteor.call('makeMove', xp, yp, Session.get(SESSON.ACTIVE_GAME), function(err, result) {
                    if (err){
                        Session.set(SESSON.ERROR_MSG, err.error);
                    }
                });

                //console.log("moveMade", moveMade);

                //console.log("neigh", game.getNeighbors(xp, yp));
                //console.log("has eye", game.hasEye(xp, yp));
                //console.log("connected enemies:", game.connectedEnemies(xp, yp));
                //console.log("connectedAllies:", game.connectedAllies(xp, yp));
                //console.log("isStoneAlive:", game.isStoneAlive(xp, yp));

                currentPlayer = (currentPlayer + 1) % players.length;
            } else {
                //game.removeStone(game.getStone(xp, yp));
            }
        },

        // this works on ipad!
        //'touchend #forground': function (event) {

            ////console.log("event: ",event);
            ////debugger;
            //event.preventDefault();
            //var xyoffset = $(event.target).offset();
            //var x = event.originalEvent.pageX - xyoffset.left;
            //var y = event.originalEvent.pageY - xyoffset.top;

            //var xp = Math.round(x / OFFSET);
            //var yp = Math.round(y / OFFSET);

            //var isValid =
                //xp > 0 && yp > 0 &&
                //xp <= GAME_SIZE && yp <= GAME_SIZE;

            //if (!isValid) {
                //console.log('invalid move');
                //return;
            //}

            //var game = Games.findOne({_id: Session.get(SESSON.ACTIVE_GAME)});

            //if (game.isEmpty(xp, yp)) {

                //game.makeMove(xp, yp, players[currentPlayer]);

                ////console.log("neigh", game.getNeighbors(xp, yp));
                ////console.log("has eye", game.hasEye(xp, yp));
                ////console.log("connected enemies:", game.connectedEnemies(xp, yp));
                ////console.log("connectedAllies:", game.connectedAllies(xp, yp));
                ////console.log("isStoneAlive:", game.isStoneAlive(xp, yp));

                //currentPlayer = (currentPlayer + 1) % players.length;
            //} else {
                ////game.removeStone(game.getStone(xp, yp));
            //}
        //},

        //'touchmove' : function (e){
            //e.preventDefault();
        //}

    });

}

