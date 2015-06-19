@Games = new Mongo.Collection("games");


Games.helpers
  getID: -> this._id

  addStone: (x, y, player) ->
    this.stones.push(x:x, y:y, player:player);
    this._setStones(this.stones);

  isEmpty: (x, y) -> ! this.getStone(x, y)

  removeStone: (x, y) ->
    dbop = $pull: stones: this.getStone(x, y)
    Games.update _id:this._id, dbop

  getStone: (x, y) -> _.find this.stones, (s) ->  s.x == x and s.y == y

  _setStones: (stones_prime) ->
    dbop = $set: stones: stones_prime
    Games.update _id: this._id, dbop

  getNeighbors: (x, y) ->
    board = this
    neighbors = []

    getStone = (x, y) ->
      inBounds = x > 0 and y > 0 and x <= board.size and y <= board.size
      if ! inBounds then null else board.getStone(x, y)

    neighbors.push getStone x+1, y
    neighbors.push getStone x-1, y
    neighbors.push getStone x, y+1
    neighbors.push getStone x, y-1

    _.filter neighbors, (node) -> node != null


## HELPERS
# [stone] -> str (serialized board state)
compressStones = (stones) ->
  strStones = _.map stones, (s) -> JSON.stringify s
  strStones.sort()
  JSON.stringify strStones



