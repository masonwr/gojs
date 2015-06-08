"use strict";

var DEBUG = false;

var _boardStates = [];

var Stone = function (x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
};

// returns all stone with one degree of connection to 
// the target stone (this).
//
// this funcion should be moved to the board proabably
Stone.prototype.getAdjNodes = function (board) {
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
};

// returs an array for adjacent stone of the same
// color.
// board -> [Stones]
Stone.prototype.getConnectedStones = function(board){
  var color = this.color; 

  var pred = function (adj) 
    { return adj && (adj.color == color); };

  return _.filter(this.getAdjNodes(board), pred);
};

// returs an array for adjacent stone of the opposite
// color.
// board -> [Stones]
Stone.prototype.getAdjStoneOfOppColor = function(board){
  var color = this.color; 
  var pred = function (adj) 
    { return adj && (adj.color != color); };
  return _.filter(this.getAdjNodes(board), pred);
};

Stone.prototype.hasEye = function(board){
  return _.any(this.getAdjNodes(board), 
    function(adj){ return typeof adj == 'undefined'}); 
};


var Board = function(size){
  this.size = size;
  this.stones = {};
};

// board.layStone returns true is move was successful, 
// false otheer wise
Board.prototype.layStone = function (x, y, color) {
  
  var board = this;


  var stone = new Stone(x, y, color);
  var key = this.hashCoords(x, y);
  this.stones[key] = stone;

  _boardStates.push(_.cloneDeep(board.stones));
  if (_boardStates.length > 3) _boardStates.shift();
  
  var numOfturns = _boardStates.length;

  if (numOfturns > 1 && areBoardStatesEqual(_boardStates[numOfturns - 2], _boardStates[numOfturns - 1])){
    board.remove(x,y);
    console.log("(!) KO!");
    _boardStates.pop();
    return false;
  }

  var connectedOppositeStones = stone.getAdjStoneOfOppColor(this);
  
  // this seems to fix 'snap back' situations.
  // ~ you are measuing the effect of the stone
  // before looking at the stone directly
  _.each(connectedOppositeStones, function(st){
    isStoneAlive(st, board, removeStones);
  });

  var isSuicide = ! isStoneAlive(stone, this);
  

  if (isSuicide) {
    board.remove(x,y);
    console.log("(!) CANNOT PLAY IN SUICIDE");
    _boardStates.pop();
    return false;
  }

  this.removeTheDead();
  this.stones[key] = stone;
  this.removeTheDead();

  return true;
  
  // for debugging
  if (DEBUG){
    var connections = stone.getAdjNodes(this);
    console.log("adjacent stones: ", connections);
    console.log("stone has eyes: " , stone.hasEye(this));
    console.log("connected adj stone: ", stone.getConnectedStones(this));
    console.log("is alive: " , isStoneAlive(stone, this));
  }
};

Board.prototype.removeTheDead = function(){
  var stones = this.stones;
  var board = this;
  _.each(_.toArray(stones), function (st) {
    isStoneAlive(st, board, removeStones);
  });
};

Board.prototype.hashCoords = function (x, y){
  return x.toString() + "-" + y.toString();
};

// returns the stone at the specifiec coords,
// on fail returne false
Board.prototype.getStone = function (x, y){
  var isValid = x > 0 && x <= this.size
      &&        y > 0 && y <= this.size;

  if (! isValid) return false;
  return this.stones[this.hashCoords(x, y)];
};

Board.prototype.isEmpty = function (x, y){
  return !(this.getStone(x,y));
};

Board.prototype.remove = function(x, y) {
  delete this.stones[this.hashCoords(x, y)]; 
};



function removeStones (stones, board) {
  _.each(stones, 
    function(st){ board.remove(st.x, st.y); });
};

function isStoneAlive(stone, board, callback){
  var visited = [];
  var que = [];

  que.push(stone);

  while (que.length > 0){
    var currentStone = que.pop();
    if (currentStone.hasEye(board)) return true;

    visited.push(currentStone);

    var connected = currentStone.getConnectedStones(board);
    
    _.each(connected, function(nst){
      if (visited.indexOf(nst) === -1) que.push(nst);
    });
  }

  if (callback) {
    callback(visited, board);
  }
 
  return false;
}

function areBoardStatesEqual (st1, st2) {
  st1 =  _.sortByAll(_.toArray(st1), _.values);
  st2 =  _.sortByAll(_.toArray(st2), _.values);


  var zipped = _.zip(st1, st2);
  
  var same = _.every(zipped, function(cell){
    if (! cell[0])  return false
    var fst = cell[0];
    
    if (! cell[1]) return false;
    var snd = cell[1];

    return fst.x == snd.x
    &&     fst.y == snd.y
    &&     fst.color == snd.color;
    
  });

  return same;
}


