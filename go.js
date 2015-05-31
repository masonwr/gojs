// 'use strict';
var boards = {
  small:  9,
  medium: 13,
  large:  18
};

var SIZE = 700;
var LINE_WIDTH = 2;
var GAME_SIZE = boards.large;


canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

var offset = SIZE/GAME_SIZE;

// draw board grid
for (var i = 0; i < GAME_SIZE + 1; i++) {
  context.fillRect(0 + (i * offset), 0, LINE_WIDTH, SIZE);
  context.fillRect(0, 0 + (i * offset), SIZE, LINE_WIDTH);
};

// draw star points
for (var i = 0; i < 9; i++){
  var f = function(x) {return 6 * x + 3}; // defines start point placement
  var div = f(Math.floor(i/3));            
  var rem = f(i % 3);
  drawStarPoint(div * offset + LINE_WIDTH/2, rem * offset + LINE_WIDTH/2, context);

}

// Helper FNS

//draw star points
function drawStarPoint(x, y, ctx) {
  var STAR_POINTSZ = 5;
  console.log("got here");
  ctx.beginPath();
  ctx.arc(x, y, STAR_POINTSZ, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.fill(); 
}
