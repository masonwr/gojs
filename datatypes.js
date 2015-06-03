
var Stone = function(x, y, color){
  this.x = x;
  this.y = y;
  this.color = color;
}

// function must return only the appropriate number of neighbore
// so an array of len >= 2 and <= 4,
// filled with eigher undefied of stones
//
// or it could retun null if there are only undefied heighbors...
Stone.prototype.getNeighbors = function(board) {
  // todo implemtn this
  // thing about where this should be?
  // how are the ground going to be represented
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


/*
 * sudo 
 *
 * newStone;
 * laystone
 * remove dead stones:
 *
 * fn isStoneAlive(Stone):
 *
 *  tooLookat = []
 *  visited =[] 
 *
 *  tooLookat.push(ston);
 *
 *  while (tooLookate.length > 0):
 *    var curS = tooLookat.pop();
 *
 *    if (curS.hasEye()) return;
 *
 *    for nstone in curS.getConnections(): // samecolor stone
 *      if nstone in visited:
 *        continue
 *      else:
 *        tooLookat.push(stone);
 *
 *  
 *
 *
 */
