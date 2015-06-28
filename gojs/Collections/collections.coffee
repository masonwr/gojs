@Games = new Mongo.Collection("games");


Games.helpers
  getID: -> this._id

  makeMove: (x, y, player) ->
    board = this
    stone = {
      x: x
      y: y
      player: player
    }

    this.stones.push(stone)
    this.stones.sort stoneSort


    boardSig = JSON.stringify this.stones
    this.gameHistory.push boardSig

    numOfmoves = this.gameHistory.length
    if numOfmoves > 1
        if this.gameHistory[numOfmoves - 2] == this.gameHistory[numOfmoves - 1]
            console.log "KO!"
            this.removeStone(stone)
            this.gameHistory.pop()
            return false

    enemies = this.connectedEnemies(x, y)
    _.each enemies, (s) -> board.isStoneAlive(s.x, s.y, true)

    isSuicide = ! board.isStoneAlive(x, y, false)

    if isSuicide
        console.log "SUICIE PLAY!"
        this.removeStone(stone)
        this.gameHistory.pop()
        return false

    this.removeTheDead()
    if this.isEmpty(x,y)
        this.stones.push stone
        this.removeTheDead()

    this.updateDB()

  isEmpty: (x, y) -> ! this.getStone(x, y)

  updateDB: ->
    this._setHistory(this.gameHistory)
    this._setStones(this.stones)

  removeStone: (stone) ->
      i = this.stones.indexOf stone
      if i >= 0 
          this.stones.splice i, 1
      this.updateDB()
    

  getStone: (x, y) -> _.find this.stones, (s) ->  s.x == x and s.y == y

  _setStones: (stones_prime) ->
    dbop = $set: stones: stones_prime
    Games.update _id: this._id, dbop

  _setHistory: (history) ->
    dbop = $set: gameHistory: history
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

  isStoneAlive: (x,y, removeVisited) ->
    visited = []
    que = []

    que.push this.getStone(x, y)

    while que.length
      currentStone = que.pop()

      if ! currentStone
          continue

      if this.hasEye(currentStone.x, currentStone.y)
        return true

      visited.push(currentStone)

      connected = this.connectedAllies(currentStone.x, currentStone.y)

      _.each connected, (s) ->
        if visited.indexOf(s) == -1
          que.push(s)

    if removeVisited
        aliveStone = _.difference this.stones, visited
        this.stones = aliveStone
        #_.each visited, this.removeStone

    return false

  removeTheDead: ->
    board = this
    _.each board.stones, (s) -> board.isStoneAlive(s.x, s.y, true) # isStoneAlive mutates data!

  removeAllStone: ->
    this.stones = []
    this.updateDB()
    #this._setStones([])






stoneSort = (s1, s2) ->
  if s1.x - s2.x then s1.x - s2.x
  else s1.y - s2.y


