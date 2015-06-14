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

    Games.update({_id: this._id}, {$push: {stones: stone}});

  isEmpty: (x, y) ->
     ! _.find this.stones, (s) ->  s.x == x and s.y == y

});


@Players = new Mongo.Collection("players");

