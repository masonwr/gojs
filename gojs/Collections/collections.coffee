@Games = new Mongo.Collection("games");


Games.helpers
  getID: -> this._id

  makeMove: (x, y, player) ->
    stone = {
      x: x
      y: y
      player: player
    }
    this.stones.push(stone)
    this.addStone(stone)
    this.stones.sort stoneSort

    console.log "stones", this.stones

    boardSig = JSON.stringify this.stones
    console.log "boardsis", boardSig
    # ko checking goes here.
    Games.update _id:this._id, {$push: gameHistory: boardSig}
    console.log "gameHist:", this.gameHistory;
    console.log "gameHist2:", Games.findOne(this._id).gameHistory;

  isEmpty: (x, y) -> ! this.getStone(x, y)

  addStone: (stone) ->
#    this.stones.push(stone)
    dbop = $push: stones: stone
    Games.update _id:this._id, dbop

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

  hasEye: (x, y) ->
    _.any this.getNeighbors(x,y), ((s) -> s == undefined)

  connectedEnemies: (x, y) ->
    stone = this.getStone(x, y)
    _.filter this.getNeighbors(x,y), ((s) -> s && s.player != stone.player )

  connectedAllies: (x, y) ->
    stone = this.getStone(x, y)
    _.filter this.getNeighbors(x,y), ((s) -> s && s.player == stone.player )

  isStoneAlive: (x,y, f) ->
    visited = []
    que = []

    que.push this.getStone(x, y)

    while que.length
      currentStone = que.pop()

      if this.hasEye(currentStone.x, currentStone.y)
        return true

      visited.push(currentStone)

      connected = this.connectedAllies(currentStone.x, currentStone.y)

      _.each connected, (s) ->
        if visited.indexOf(s) == -1
          que.push(s)

    if f
      f(visited)

    return false

  removeTheDead: ->
    board = this
    _.each board.stones, (s) ->
      if not board.isStoneAlive(s.x, s.y)
        board.remove(s.x, s.y);

  removeAllStone: ->
    this._setStones([])






stoneSort = (s1, s2) ->
  if s1.x - s2.x then s1.x - s2.x
  else s1.y - s2.y



