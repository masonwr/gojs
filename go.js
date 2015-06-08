'use strict';


var BOARDS = {
    small: 9,
    medium: 13,
    large: 19
};

var boardStates = [];

var players = ['white', 'black'];
var currentPlayer = 1;

var SIZE = 950;
var LINE_WIDTH = 2;
var GAME_SIZE = BOARDS.large;
var LINE_COLOR = '#333333';
var OFFSET = SIZE / GAME_SIZE;

// appending some utility methods
CanvasRenderingContext2D.prototype.fillCircle = function (x, y, r, color) {
    this.beginPath();
    this.arc(x, y, r, 0, Math.PI * 2, true);
    this.closePath();
    this.fillStyle = color;
    this.fill();
}

var background = document.getElementById("background");
var context = background.getContext("2d");

var forground = document.getElementById("forground");
var context_forground = forground.getContext("2d");

var board = new Board(GAME_SIZE);

// record opening position
var oldBoard = jQuery.extend(true, {}, board);
boardStates.push(oldBoard);


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


$("#forground").click(function (event) {

    // constrolls for development only
    var we = window.event || event;

    // debugger;
    if (we.shiftKey) {
        currentPlayer = 0;
    }

    if (we.altKey) {
        currentPlayer = 1;
    }

    var oldBoard = jQuery.extend(true, {}, board);
    boardStates.push(oldBoard);

    // translates the click point into the board space
    var xyoffset = $(this).offset();    
    var x = event.pageX - xyoffset.left;
    var y = event.pageY - xyoffset.top;

    var xp = Math.round(x / OFFSET);
    var yp = Math.round(y / OFFSET);
    
    var isValid = xp > 0 && xp <= board.size 
             &&   yp > 0 && yp <= board.size;
             
    if (! isValid) return;

    if (board.isEmpty(xp, yp)) {
        if (board.layStone(xp, yp, players[currentPlayer])) {
            currentPlayer = (currentPlayer + 1) % players.length; // switch player
        }
    } else {
        return;
    }

    context_forground.clearRect(0, 0, background.width, background.height); // cleans the forground first
    drawStones(board, context_forground, OFFSET);
});

document.onkeypress = function(e) {
    if (boardStates.length > 1) {
        e = e || window.event;
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
        if (charCode == 122) {
           
            board = boardStates.pop();

            context_forground.clearRect(0, 0, background.width, background.height); // cleans the forground first
            drawStones(board, context_forground, OFFSET);
        }
    }
};

// HELPERS
function drawStones(board, context_forground, offset) {
    for (var key in board.stones) {
        var stone = board.stones[key];
        var x = stone.x * offset;
        var y = stone.y * offset;
        var r = (offset / 2);
        context_forground.fillCircle(x, y, r, stone.color);
    }
}


