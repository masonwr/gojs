
var Stone = function(x, y, color){
  this.x = x;
  this.y = y;
  this.color = color;
}

var Board = function(size){
  this.size = size;
  this.stones = {};
}

Board.prototype.layStone = function (x, y, color) {
  var stone = new Stone(x, y, color);
  var key = this.hashCoords(x, y);
  this.stones[key] = stone;
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

Board.prototype.unHash = function(hash) {
  var splits = hash.split("-");
  return {
    x: parseInt(splits[0]),
    y: parseInt(splits[1])
  };
}



Board.prototype.getNeighbors = function(x, y) {

}
// testin 

// var b = new Board;

// b.layStone(0,0, 'black');

// console.log(b.getStone(0,1));

// console.log("ih");
