
var Stone = function(x, y, color){
  this.x = x;
  this.y = y;
  this.color = color;
}

var Board = function(){
  this.stones = {};
}

Board.prototype.layStone = function (x, y, color) {
  var stone = new Stone(x, y, color);
  var key = this.hashCoords(x, y);
  this.stones[key] = stone;

  console.log(key);
}

Board.prototype.hashCoords = function (x, y){
  return x.toString() + "-" + y.toString();
}

Board.prototype.getStone = function (x, y){
  return this.stones[this.hashCoords(x, y)];
}

Board.prototype.isEmpty = function (x, y){
  return !(this.getStone(x,y));
}

Board.prototype.remove = function(x, y) {
  delete this.stones[this.hashCoords(x, y)]; 
}


// testin 

// var b = new Board;

// b.layStone(0,0, 'black');

// console.log(b.getStone(0,1));

// console.log("ih");
