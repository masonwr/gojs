// 'use strict';
var boards = {
  small:  9,
  medium: 13,
  large:  18
};

var PLAYER_BLACK = 1;
var PLAYER_WHITE = -1;
var EMPTY = 0;

var SIZE = 700;
var LINE_WIDTH = 2;
var GAME_SIZE = boards.large;
var LINE_COLOR = '#333333'; 
var offset = SIZE/GAME_SIZE;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");


var board = makeBoard(GAME_SIZE + 1);

// function to automate drawing of a circle
context.fillCircle = function(x,y,r, color){
  this.beginPath();
  this.arc(x, y, r, 0, Math.PI*2, true);
  this.closePath();
  this.fillStyle = color;
  this.fill();
}

// sets the color for the board
context.fillStyle = LINE_COLOR;

// draw board grid
for (var i = 0; i < GAME_SIZE + 1; i++) {
  context.fillRect(0 + (i * offset) + offset, 0 + offset, LINE_WIDTH, SIZE);
  context.fillRect(0 + offset, 0 + (i * offset) + offset, SIZE, LINE_WIDTH);
};

// draw star points
for (var i = 0; i < 9; i++){
  var f = function(x) {return 6 * x + 4}; // defines start point placement
 
  var div = f(Math.floor(i/3));            
  var rem = f(i % 3);

  var x = div * offset + LINE_WIDTH/2;
  var y = rem * offset + LINE_WIDTH/2;
 
  context.fillCircle(x, y, 5, LINE_COLOR);  
}



$("#canvas").click(function(event){
  var x = event.offsetX;
  var y = event.offsetY;

  var xp = Math.round(x/offset);
  var yp = Math.round(y/offset); 

  console.log("x, y: " + xp + ", " + yp);

  if ( board[yp - 1][xp - 1] == 0 ){
    context.fillCircle(xp * offset, yp * offset, offset/2, 'red');
    board[yp - 1][xp - 1] = 1;
    console.log("maked the board");
  }

 })

// HELPERS
function makeBoard (size) {
  var board = []; 
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++){
      row[j] = EMPTY;
    }

    board[i] = row;
  }
  return board;
}

// DEBUGGIN functions;

function printBoard () {
  for (var i = 0; i <= GAME_SIZE; i++ ){
    console.log(board[i].toString());
  }
}


/* refactoring ideas
 *
 * build out the board objct a bit more.
 *
 * make the interface such that the registering the clicking is abstracted
 * away from the gui.
 *
 * so the interface would look like this:
 * ` board.layStone(x, y, currentPlayer);
 *
 * something like that.
 *
 * the game object need to then also be built out.
 *
 * also the board could have a reference to a collection of 
 * stones. and after the clicking had happened the stones could be redrawn.
 * this way we can possible make the idea of groups and such? may be.
 *
 * what do i need to work on first:
 *  1) general refactoring
 *  2) build out objects, makge game object, make board object. make interfaces.
 *  3) add player switching
 *  4) try to remove dead stones
 */
