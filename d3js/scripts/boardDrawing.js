
var stoneSize = 50;
var gameSize = 19;
var width = (gameSize * stoneSize) - stoneSize;
var bgColor = '#B48F60';


var players = ['white', 'black'];
var currentPlayer = 0;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", width)
    .style({ 
        background: bgColor,
        padding: stoneSize,
        opacity: 0
    });


svg.selectAll("rect.verticalLines")
    .data(d3.range(gameSize))
    .enter().append("rect")
    .attr('class', 'verticalLines')
    .attr("width", 2)
    .attr("x", function (d) { return d * (width + stoneSize) / gameSize;})
    .attr("height", width + 2)
    .style({
        fill: bgColor,
        'stroke-width':0
    });

svg.selectAll("rect.horizontalLines")
    .data(d3.range(gameSize))
    .enter().append("rect")
    .attr('class', 'horizontalLines')
    .attr("height", 2)
    .attr("y", function (d) { return d * (width + stoneSize) / gameSize;})
    .attr("width", width) 
    .style({
        fill: bgColor,
        'stroke-width':0
    });

var starPointscoord = [
    {x: 3, y:3},
    {x: 9, y: 3},
    {x: 15, y: 3},
    {y: 9, x: 3},
    {y: 15, x: 3},
    {y: 15, x: 15}, 
    {y: 9, x: 9},
    {x:15, y: 9},
    {x:9, y: 15}
];

svg.selectAll('.starpoint')
    .data(starPointscoord)
    .enter().append("circle")
    .attr("class", "starpoint")
    .attr("cx", function(d) {
        return (d.x * stoneSize) + 1;
    })
    .attr("cy", function(d) {
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
    .style({ fill: "black"});

svg.on("click", function(e){
    console.log(d3.mouse(this)); 
    var x =  Math.round( d3.mouse(this)[0] / stoneSize);
    var y =  Math.round( d3.mouse(this)[1] / stoneSize);

    console.log(x, y);
    var color = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
    
    drawCircle( x * stoneSize, y * stoneSize, color, stoneSize/2, true);
});



function drawCircle(x,y,color,r, animate){

    var stone = svg.selectAll('.stone')
        .data([1])
        .enter().append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", animate ? r * 2 : r)
        .attr("fill", color)
        .style("opacity", animate ? 0 : 1)
            .transition()
            .duration(200)
            .ease('sin')
            .attr("r", r)
            .style("opacity", 1);
}

