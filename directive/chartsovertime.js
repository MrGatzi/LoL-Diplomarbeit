MainController.directive('chartsovertime', function($rootScope) {
    return {
        restrict: 'AE',
        scope: {
            'showData': '='
        },
        link: function(scope, element, attrs) {
            var div = d3.select("body").append("div")
                .attr("class", "tooltip_ChartsOverTime")
                .style("opacity", 1e-6);
            var margin = {
                    top: 20,
                    right: 30,
                    bottom: 30,
                    left: 100
                },
                width = 900 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
            var lineArea = d3.select(".OverTime")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
            var svg = lineArea
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var NewXAxis = svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");
			var TextX=svg.append("text");
			var TextY=svg.append("text");
            var NewYAxis = svg.append("g")
                .attr("class", "y axis");
            scope.$watch('showData', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    data = newValue;
						var maxX=['0','0'];
						var maxY=['0','0'];
						var i=data.Lines.length-1;
						while(i!=-1){
							maxY.push(data.Lines[i][data.Lines[i].length - 1][1]);
							i--;	
						};
						maxY.splice(0, 2); 
						
						var x = d3.scale.linear()
							.domain([0, data.Lines[0].length])
							.range([0, width]);
						
						var y = d3.scale.linear()
							.domain([0, d3.max(maxY)])
							.range([height, 0]);


						var xAxis = d3.svg.axis()
							.scale(x)
							.orient("bottom")
							.ticks('7')
							.tickSize(10)
							.orient("bottom");

						var yAxis = d3.svg.axis()
							.scale(y)
							.orient("left")
							.ticks('5')
							.tickSize(10)
							.orient("left");

						var lineGen = d3.svg.line()
							.x(function(d) {
								return x(d[0]);
							})
							.y(function(d) {
								return y(d[1]);
							});



						NewXAxis
							.call(xAxis);
							
						TextX
							.attr("y", height - 20)
							.attr("x", width-10)
							.attr("dy", ".71em")
							.style("text-anchor", "end")
							.text("Minutes");
													

						NewYAxis
							.call(yAxis);

						TextY
							.attr("transform", "rotate(-90)")
							.attr("x", -5)
							.attr("y",	20)
							.style("text-anchor", "end")
							 .text(function(d) {
								return data.text;
							});
						
						var lines = svg.selectAll('path.line').data(data.Lines);

						lines.enter()
							.append('path')
							.attr('class', 'line')
							.attr('fill', 'none')
							.attr('stroke', function(d,i) {
								return d.color ;
							});

						lines.attr('d', function(d) {
							return lineGen(d);
						});
						
						lines.exit().remove();


						/*var dots = svg.selectAll(".dot").data(data.Lines);


						dots
							.enter()
							.append("circle")
							.attr("class", "dot")
							.attr("cx", lineGen.x())
							.attr("cy", lineGen.y())
							.attr("r", 10)
							.attr("fill", "rgba(25, 25, 25, 0.01)")
							.on("mouseover", function(d) {
								mouseover(d, "green");
							})
							.on("mouseout", mouseout);
							
						dots
							.enter()
							.append("circle")
							.attr("class", "dot_Black")
							.attr("cx",  lineGen.x())
							.attr("cy", lineGen.y())
							.attr("r", 4);
						
						dots.exit().remove();
							
							
						function mouseover(d, color) {
							div.transition()
								.duration(500)
								.style("opacity", 1);
							div
								.text(d[0] + ":00 -- " + d[1] + " Creeps")
								.style("left", (d3.event.pageX + 50) + "px")
								.style("top", (d3.event.pageY + 20) + "px")
								.style("background", color);
						};

						function mouseout() {
							div.transition()
								.duration(200)
								.style("opacity", 1e-6);
						};*/
					
                }
            }, true);
        }
    };
});