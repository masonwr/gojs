
var Stone = function(x, y, color){
  this.x = x;
  this.y = y;
  this.color = color;
}

// returns all stone with one degree of connection to 
// the target stone (this).
Stone.prototype.getConnectedStones = function(board) {
  var stones = [];
  var this_color = this.color; 
  
  // helper function to manage adding stones
  var stoneAdder = function(stone){
    if (stone && this_color == stone.color){
      stones.push(stone);
    } else {
      console.log("no stone");
    }
  };

  stoneAdder(board.getStone(this.x, this.y + 1));
  stoneAdder(board.getStone(this.x, this.y - 1));
  stoneAdder(board.getStone(this.x + 1, this.y));
  stoneAdder(board.getStone(this.x - 1, this.y));

  return stones;
}
var Board = function(size){
  this.size = size;
  this.stones = {};
}

Board.prototype.layStone = function (x, y, color) {
  var stone = new Stone(x, y, color);
  var key = this.hashCoords(x, y);
  this.stones[key] = stone;

  // for debugging
  var connections = stone.getConnectedStones(this);
  console.log("connected stones: ", connections);
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
