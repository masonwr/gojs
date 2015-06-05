
var Stone = function(x, y, color){
  this.x = x;
  this.y = y;
  this.color = color;
}

// returns all stone with one degree of connection to 
// the target stone (this).
//
// this funcion should be moved to the board proabably
Stone.prototype.getAdjNodes = function(board) {
  var stones = [];
  
  var stoneAdder = function(stone){
    // undified is the 'value' that represents an empty 
    // site in the graph/board.
    if (stone || typeof stone == 'undefined'){
      stones.push(stone);
    }
  };

  stoneAdder(board.getStone(this.x, this.y + 1));
  stoneAdder(board.getStone(this.x, this.y - 1));
  stoneAdder(board.getStone(this.x + 1, this.y));
  stoneAdder(board.getStone(this.x - 1, this.y));

  return stones;
}

// returs an array for adjacent stone of the same
// color.
// board -> [Stones]
Stone.prototype.getConnectedStones = function(board){
  var color = this.color; 

  var pred = function (adj) {
    return adj && (adj.color == color);
  }
  return _.filter(this.getAdjNodes(board), pred);
}

Stone.prototype.hasEye = function(board){
  return _.any(this.getAdjNodes(board), function(adj){ return typeof adj == 'undefined'}); 
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
  var connections = stone.getAdjNodes(this);
  console.log("adjacent stones: ", connections);
  console.log("stone has eyes: " , stone.hasEye(this));
  console.log("connected adj stone: ", stone.getConnectedStones(this));
  console.log("is alive: " , isStoneAlive(stone, this));
}


Board.prototype.hashCoords = function (x, y){
  return x.toString() + "-" + y.toString();
}

// returns the stone at the specifiec coords,
// on fail returne false
Board.prototype.getStone = function (x, y){
  var isValid = x > 0 && x <= this.size
      &&        y > 0 && y <= this.size;

  if (! isValid) return false;
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


function isStoneAlive(stone, board){
  var visited = [];
  var que = [];

  que.push(stone);

  while (que.length > 0){
    var currentStone = que.pop();
    if (currentStone.hasEye(board)) return true;

    visited.push(currentStone);

    var connected = currentStone.getConnectedStones(board);
    
    _.each(connected, function(nst){
      if (visited.indexOf(nst) == -1) que.push(nst);
    });
  }

  // removes dead stones...
  // _.each(visited, function(st){
    // board.remove(st.x, st.y);
  // });

  return false;
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
