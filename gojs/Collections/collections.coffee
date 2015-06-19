@Games = new Mongo.Collection("games");

# Game helpers

Games.helpers({

  getID: ->
    return this._id

  addStone: (x, y, player) ->
    stone = {
      x: x
      y: y
      player: player
    }

    boardState = compressStones this.stones

    dbop = {
      $push:
        stones: stone
        gameHistory: boardState
    }

    Games.update({_id: this._id}, dbop)

  isEmpty: (x, y) ->
    ! this.getStone(x, y)

  removeStone: (x, y) ->
    dbop = {
      $pull:
        stones: this.getStone(x, y)
    }
    Games.update({_id: this._id}, dbop)


  getStone: (x, y) ->
    _.find this.stones, (s) ->  s.x == x and s.y == y

  _setStones: (stones_prime) ->
    dbop = {
      $set:
        stones: stones_prime
    }
    Games.update({_id: this._id}, dbop)


});




# [stone] -> str (serialized board state)

compressStones = (stones) ->
  strStones = _.map stones, (s) -> JSON.stringify s
  strStones.sort()
  JSON.stringify strStones


