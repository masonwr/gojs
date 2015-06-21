
var stoneSize = 70;
var gameSize = 19;
var width = (gameSize * stoneSize) - stoneSize;
var bgColor = '#B48F60';

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", width)
    .style({
        background: bgColor 
    });


svg.selectAll("rect.verticalLines")
    .data(d3.range(gameSize))
    .enter().append("rect")
    .attr('class', 'verticalLines')
    .attr("width", 2)
    .attr("x", function (d) { return d * (width + stoneSize) / gameSize;})
    .attr("height", width)
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
    .attr("width", width + 2) 
    .style({
        fill: bgColor,
        'stroke-width':0
    });


svg.selectAll(".horizontalLines")
    .transition(300)
    .delay(function(d,u){
        console.log(u);
        return u * 0;
    })
    .style({ fill: "black"});

svg.selectAll(".verticalLines")
    .transition(300)
    .delay(function(d,u){
        console.log(u);
        return u * 0;
    })
    .style({ fill: "black"});

