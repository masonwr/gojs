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

    Games.update({_id: this._id}, {$push: {stones: stone}})

  isEmpty: (x, y) ->
     ! this.getStone(x, y)

  removeStone: (x, y) ->
      stones = this.stones
      i = this.stones.indexOf( this.getStone(x, y) )
      # todo: remove this stone form the list, and then update the DB with the new list
      console.log("i", i)

  getStone: (x, y) ->
    _.find this.stones, (s) ->  s.x == x and s.y == y


});


@Players = new Mongo.Collection("players");

