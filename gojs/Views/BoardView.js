// vars for drawing the board
var stoneSize = 50;
var gameSize = 19;
var width = (gameSize * stoneSize) - stoneSize;
var bgColor = '#B48F60';


var players = ['white', 'black'];
var currentPlayer = 0;


if (Meteor.isClient) {

    Template.board.onCreated(function() {
        this.showStones = new ReactiveVar(false);
        console.log("created", this);
    });

    Template.board.onRendered(function () {

        var svg = d3.select("#board")
            .attr("width", width)
            .attr("height", width)
            .style({
                background: bgColor,
                padding: stoneSize,
                //opacity: 0
            });

        svg = d3.select("#lines");

        svg.selectAll("rect.verticalLines")
            .data(d3.range(gameSize))
            .enter().append("rect")
            .attr('class', 'verticalLines')
            .attr("width", 2)
            .attr("x", function (d) {
                return d * (width + stoneSize) / gameSize;
            })
            .attr("height", width + 2)
            .style({
                fill: bgColor,
                'stroke-width': 0
            });

        svg.selectAll("rect.horizontalLines")
            .data(d3.range(gameSize))
            .enter().append("rect")
            .attr('class', 'horizontalLines')
            .attr("height", 2)
            .attr("y", function (d) {
                return d * (width + stoneSize) / gameSize;
            })
            .attr("width", width)
            .style({
                fill: bgColor,
                'stroke-width': 0
            });

        var starPointscoord = [
            {x: 3, y: 3},
            {x: 9, y: 3},
            {x: 15, y: 3},
            {y: 9, x: 3},
            {y: 15, x: 3},
            {y: 15, x: 15},
            {y: 9, x: 9},
            {x: 15, y: 9},
            {x: 9, y: 15}
        ];

        svg.selectAll('.starpoint')
            .data(starPointscoord)
            .enter().append("circle")
            .attr("class", "starpoint")
            .attr("cx", function (d) {
                return (d.x * stoneSize) + 1;
            })
            .attr("cy", function (d) {
                return (d.y * stoneSize) + 1;
            })
            .attr("r", 0)
            .attr("fill", 'black')
            .transition()
            .delay(300)
            .duration(700)
            .ease('bounce')
            .attr("r", 8);

        var dt = 600;
        svg.transition()
            .duration(dt * .50)
            .style("opacity", 1)

        var lines = svg.selectAll(".horizontalLines, .verticalLines")
            .transition()
            .delay(function (d) {
                return 600 + d * 30;
            })
            .duration(dt)
            .style({fill: "black"});

        svg.selectAll('.stone')
            .style("opacity", 0)
            .transition()
            .duration(200)
            .ease('sin')
            .style("opacity", 1);


        var template = Template.instance();
        setTimeout(function() {
            console.log("showstone:", template);
            template.showStones.set(true);
        }, 1500);


    });


    Template.board.helpers({


        showStones: function() {
          return Template.instance().showStones.get();
        },

        getStones: function () {
            var game = Games.findOne(); // this needs to be updated
            //console.log("game.stones", game.stones);

            var projectStones = function (stone) {
                return {
                    x: (stone.x - 1) * stoneSize,
                    y: (stone.y - 1) * stoneSize,
                    player: stone.player
                };
            };

            return game ? _.map(game.stones, projectStones) : [];
        },

        drawStone: function (stone) {
            //context_forground.fillCircle(
            //    stone.x * OFFSET,
            //    stone.y * OFFSET,
            //    OFFSET / 2,
            //    stone.player);

            //var x =  Math.round( d3.mouse(this)[0] / stoneSize);
            //var y =  Math.round( d3.mouse(this)[1] / stoneSize);
            //
            //console.log(x, y);
            //var color = players[currentPlayer];
            //currentPlayer = (currentPlayer + 1) % players.length;

            drawCircle((stone.x - 1) * stoneSize, (stone.y - 1) * stoneSize, stone.player, stoneSize / 4, true);
        },

    });

    Template.board.events({

        'click #removeStone': function (e) {
            var game = Games.findOne();
            game.removeAllStone();
        },

        'click #clearHistory': function (e) {
            var game = Games.findOne();
            var res = Games.update({_id: game._id}, {$set: {gameHistory: []}});
            console.log("what the fuc!", res);
        },

        'click #board': function (event) {


            console.log("event", event);

            var xyoffset = $(event.currentTarget).offset();
            var x = event.pageX - xyoffset.left;
            var y = event.pageY - xyoffset.top;


            console.log("before rounding: (" + x + ", " + y + ")");

            //
            //console.log("d3.mouse(this)[0]", d3.mouse(this)[0]);

            var xp = Math.round(x / stoneSize);
            var yp = Math.round(y / stoneSize);


            //var xp = 4;
            //var yp = 4;

            var isValid =
                xp > 0 && yp > 0 &&
                xp <= gameSize && yp <= gameSize;

            console.log("(" + xp + ", " + yp + ")");
            if (!isValid) {
                console.log('invalid move');
                return;
            }

            var game = Games.findOne();

            if (game.isEmpty(xp, yp)) {

                var id = "temp";
                drawCircle((xp - 1) * stoneSize, (yp - 1) * stoneSize, players[currentPlayer], stoneSize / 2, id, true);

                setTimeout(function() {
                    game.makeMove(xp, yp, players[currentPlayer]);
                    $("#" + id).remove();
                    currentPlayer = (currentPlayer + 1) % players.length;
                }, 250);


                //console.log("neigh", game.getNeighbors(xp, yp));
                //console.log("has eye", game.hasEye(xp, yp));
                //console.log("connected enemies:", game.connectedEnemies(xp, yp));
                //console.log("connectedAllies:", game.connectedAllies(xp, yp));
                //console.log("isStoneAlive:", game.isStoneAlive(xp, yp));


            } else {
                //game.removeStone(game.getStone(xp, yp));
            }
        },

        // this works on ipad!
        //'touchend #forground': function (event) {
        //
        //    //console.log("event: ",event);
        //    //debugger;
        //    event.preventDefault();
        //    var xyoffset = $(event.target).offset();
        //    var x = event.originalEvent.pageX - xyoffset.left;
        //    var y = event.originalEvent.pageY - xyoffset.top;
        //
        //    var xp = Math.round(x / OFFSET);
        //    var yp = Math.round(y / OFFSET);
        //
        //    var isValid =
        //        xp > 0 && yp > 0 &&
        //        xp <= GAME_SIZE && yp <= GAME_SIZE;
        //
        //    if (!isValid) {
        //        console.log('invalid move');
        //        return;
        //    }
        //
        //    var game = Games.findOne();
        //
        //    if (game.isEmpty(xp, yp)) {
        //
        //        game.makeMove(xp, yp, players[currentPlayer]);
        //
        //        //console.log("neigh", game.getNeighbors(xp, yp));
        //        //console.log("has eye", game.hasEye(xp, yp));
        //        //console.log("connected enemies:", game.connectedEnemies(xp, yp));
        //        //console.log("connectedAllies:", game.connectedAllies(xp, yp));
        //        //console.log("isStoneAlive:", game.isStoneAlive(xp, yp));
        //
        //        currentPlayer = (currentPlayer + 1) % players.length;
        //    } else {
        //        //game.removeStone(game.getStone(xp, yp));
        //    }
        //},
        //
        //'touchmove': function (e) {
        //    e.preventDefault();
        //}

    });

}

function drawCircle(x, y, color, r, id, animate) {
    var svg = d3.select("#board")
        .append("circle")
        .attr("id", id)
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", animate ? 0 : r)
        .attr("fill", color)
        .style("opacity", animate ? 0 : 1)
        .transition()
        .duration(200)
        .ease('sin')
        .attr("r", r)
        .style("opacity", 1);
}

