'use strict';


var BOARDS = {
  small:  9,
  medium: 13,
  large:  19
};

var players = ['white', 'black']
var currentPlayer = 1;

var SIZE = 950;
var LINE_WIDTH = 2;
var GAME_SIZE = BOARDS.medium;
var LINE_COLOR = '#333333'; 
var offset = SIZE/GAME_SIZE;

// appending some utility methods
CanvasRenderingContext2D.prototype.fillCircle = function(x,y,r, color){
  this.beginPath();
  this.arc(x, y, r, 0, Math.PI*2, true);
  this.closePath();
  this.fillStyle = color;
  this.fill();
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var forground = document.getElementById("forground");
var context_forground = forground.getContext("2d");

var board = new Board(GAME_SIZE); 

// sets the color for the board
context.fillStyle = LINE_COLOR;

// draw board grid
for (var i = 0; i < GAME_SIZE; i++) {
  var line_len = SIZE - offset;
  var x = (i * offset) + offset;
  
  context.fillRect( x, offset, LINE_WIDTH, line_len);
  context.fillRect( offset, x, line_len, LINE_WIDTH);
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
 
  // constrolls for development only
  if (window.event.shiftKey){
    currentPlayer = 0;
  }

  if (window.event.altKey){
    currentPlayer = 1; 
  }

  var x = event.offsetX;
  var y = event.offsetY;

  var xp = Math.round(x/offset);
  var yp = Math.round(y/offset); 

  if (board.isEmpty(xp, yp)){
    if (board.layStone(xp, yp, players[currentPlayer])){
      currentPlayer = (currentPlayer + 1) % players.length // switch player
    }
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
    var x = stone.x * offset;
    var y = stone.y * offset;
    var r = (offset/2);
    context_forground.fillCircle(x, y, r, stone.color);
  }
}


