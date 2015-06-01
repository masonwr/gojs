// 'use strict';
var boards = {
  small:  9,
  medium: 13,
  large:  18
};

var PLAYER_BLACK = 1;
var PLAYER_WHITE = -1;
var EMPTY = 0;

var SIZE = 750;
var LINE_WIDTH = 2;
var GAME_SIZE = boards.large;
var LINE_COLOR = '#333333'; 
var offset = SIZE/GAME_SIZE;


CanvasRenderingContext2D.prototype.fillCircle = function(x,y,r, color){
  this.beginPath();
  this.arc(x, y, r, 0, Math.PI*2, true);
  this.closePath();
  this.fillStyle = color;
  this.fill();
}

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

forground = document.getElementById("forground");
context_forground = forground.getContext("2d");

var board = new Board; 

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



$("#forground").click(function(event){
  var x = event.offsetX;
  var y = event.offsetY;

  var xp = Math.round(x/offset);
  var yp = Math.round(y/offset); 

  if (board.isEmpty(xp, yp)){
    board.layStone(xp, yp, '#000000');
  } else {
    board.remove(xp, yp);
  }
  context_forground.clearRect(0, 0, canvas.width, canvas.height); // cleans the forground first
  drawStones(board, context_forground, offset);
});

// HELPERS
function drawStones(board, context_forground, offset){
  for (var key in board.stones) {
    var stone = board.stones[key];
    context_forground.fillCircle(stone.x * offset, stone.y * offset, offset/2, stone.color);
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
