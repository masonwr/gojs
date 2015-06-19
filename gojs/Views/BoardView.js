// vars for drawing the board
var BOARDS = {
    small: 9,
    medium: 13,
    large: 19
};

var SIZE = 950;
var LINE_WIDTH = 2;
var GAME_SIZE = BOARDS.large;
var LINE_COLOR = '#333333';
var OFFSET = SIZE / GAME_SIZE;

var players = ['white', 'black'];
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
            var x = (i * OFFSET) + OFFSET;

            context.fillRect(x, OFFSET, LINE_WIDTH, line_len);
            context.fillRect(OFFSET, x, line_len, LINE_WIDTH);
        }

        // draw star points
        for (var i = 0; i < 9; i++) {
            var f = function (x) {
                return 6 * x + 4
            }; // defines start point placement

            var div = f(Math.floor(i / 3));
            var rem = f(i % 3);

            var x = div * OFFSET + LINE_WIDTH / 2;
            var y = rem * OFFSET + LINE_WIDTH / 2;

            context.fillCircle(x, y, 5, LINE_COLOR);
        }
    });


    Template.board.helpers({

        getStones: function () {
            if (context_forground) {
                context_forground.clearRect(0, 0, background.width, background.height);
            } else {
                console.log("context has not been set yet!");
            }
            var game = Games.findOne(); // this needs to be updated
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

            var game = Games.findOne();

            if (game.isEmpty(xp, yp)) {
                game.addStone(xp, yp, players[currentPlayer]);
                currentPlayer = (currentPlayer + 1) % players.length;

                //console.log("neighbors: ", game.getNeighbors(xp, yp));
                stones = game.stones;

                console.log("stones presort", stones);

                // move this sorting to the right place
                stones.sort(function (s1, s2) {
                    if (s1.x == s2.x){
                        return s1.y - s2.y;
                    } else {
                        return s1.x - s2.x;
                    }

                });

                console.log("stones postsort", stones);
            } else {
                game.removeStone(xp, yp);
                Session.set('lastUpdate', new Date() );
            }
        }

    });

}

