sampleApp.directive('chartsovertime', function($rootScope) {
    return {
        restrict: 'AE',
        scope: {
            'showData': '='
        },
        link: function(scope, element, attrs) {
		var div = d3.select("body").append("div")
						.attr("class", "tooltip")
						.style("opacity", 1e-6);
		var margin = {
							top: 20,
							right: 30,
							bottom: 30,
							left: 100
						},
						width = 900 - margin.left - margin.right,
						height = 500 - margin.top - margin.bottom;
		var lineArea=d3.select(".OverTime")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom);
		var NewXAxis = lineArea.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")");
			
		var NewYAxis = lineArea.append("g")
			.attr("class", "y axis");
		scope.$watch('showData', function(newValue, oldValue) {
                if (newValue !== oldValue) {				
					data=newValue;
					console.log(data);
					
					
					var x = d3.scale.linear()
						.domain([0, data.length])
						.range([0, width]);

					var y = d3.scale.linear()
						.domain([0, data[data.length-1][1]])
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

					var svg = lineArea
						.data(data)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis)
						.append("text")
						.attr("transform", "rotate(-90)")
						.attr("y", 6)
						.attr("x", height)
						.attr("dy", ".71em")
						.style("text-anchor", "end")
						.text("Creepscore");

					svg.append("g")
						.attr("class", "y axis")
						.call(yAxis)
						.append("text")
						.attr("x", width)
						.attr("y", height - 10)
						.style("text-anchor", "end")
						.text("Minutes");

					svg.append("path")
						.attr('d', lineGen(data))
						.attr('stroke', 'green')
						.attr('stroke-width', 2)
						.attr('fill', 'none');
					


					var dots = svg.selectAll(".dot");

					dots.data(data)
						.enter().append("circle")
						.attr("class", "dot")
						.attr("cx", lineGen.x())
						.attr("cy", lineGen.y())
						.attr("r", 3)
						.on("mouseover", function(d) {
							mouseover(d, "green");
						})
						.on("mouseout", mouseout);
						
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
					};
				}
			},true);
        }
    };
});