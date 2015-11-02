MainController.directive('differnetsdealtchamp', function($rootScope) {
    return {
        restrict: 'AE',
        // scope object defines the attributes that can be used in the HTML tag
        // for '@', '=', '&' syntax see http://onehungrymind.com/angularjs-sticky-notes-pt-2-isolated-scope/
        scope: {
            'leftPlayer': '=',
            'rightPlayer': '='
        },
        link: function(scope, element, attrs) {
            var margin = {
                    top: 30,
                    right: 0,
                    bottom: 0,
                    left: 30
                },
                width = 320,
                barHeight = 30,
                height = 0;
            var chartWidth = 380,
                barHeight = 20,
                groupHeight = barHeight,
                gapBetweenGroups = 30,
                spaceForLabels = 0,
                spaceForLegend = 90,
                chartHeight = 200;


            var chartLeft = d3.select(".chartLeftdiffernetsdealtchamp")
                .attr("width", chartWidth)
                .attr("height", chartHeight);

            var chartRight = d3.select(".chartRightdiffernetsdealtchamp")
                .attr("width", chartWidth + spaceForLegend)
                .attr("height", chartHeight);

            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 1e-6);
				
			var NewXAxisL = chartLeft.append("g")
			.attr("class", "x axis")
                        .attr("transform", "translate(" + 0 + ", " + 260 + ")");
						
			var NewXAxisR = chartRight.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(" + 0 + ", " + 260 + ")");			
            var highstNumberLeft;
            var highstNumberRight;
            scope.$watch('leftPlayer', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    var data = {
                        labels: [
                            'Damage Dealt to Champ'
                        ],
                        series: [{
                            label: 'Physical',
                            values: [scope.leftPlayer.physicalDamageDealtToChampions ]
                        }, {
                            label: 'Magical',
                            values: [scope.leftPlayer.magicDamageDealtToChampions ]
                        }, {
                            label: 'True',
                            values: [scope.leftPlayer.trueDamageDealtToChampions ]
                        }, ]
                    };
                   
                    groupHeight = barHeight * data.series.length;
                    // Zip the series data together (first values, second values, etc.)
                    var zippedData = [];
                    for (var i = 0; i < data.labels.length; i++) {
                        for (var j = 0; j < data.series.length; j++) {
                            zippedData.push(data.series[j].values[i]);
                        }
                    };
                    // Color scale
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////// !!!!!!! i need the highest number from both Charts!!!
                    var color = d3.scale.category20();
                    var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;
					
					var showX=d3.scale.linear()
                        .domain([0, scope.leftPlayer.highestChartdealtChamp])
                        .range([chartWidth, 0]);
						
                    var x = d3.scale.linear()
                        .domain([0, scope.leftPlayer.highestChartdealtChamp])
                        .range([0, chartWidth]);

                    var y = d3.scale.linear()
                        .range([chartHeight + gapBetweenGroups, 0]);

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .tickFormat('')
                        .tickSize(0)
                        .orient("right");

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .ticks('7')
                        .tickSize(10)
                        .orient("bottom");
						
					var xAxisShow = d3.svg.axis()
                        .scale(showX)
                        .ticks('7')
                        .tickSize(10)
                        .orient("bottom");
                    
                        
                    // Specify the chart area and dimensions
                    // Create bars
                    var bar = chartLeft
                        .selectAll("g.bar") // select the group DOM elements
                        .data(zippedData); // join with the dataset

                    bar.enter() // create a new DOM element for new data items (D3 does the for-loop here for you)
                        // add all attribute and items that won't change (on update)
                        .append("g") // create group element first
                        .attr("class", "bar")
                        // transform attribute is updated so no need to add this here
                        .append("rect") // Create rect element inside the group element of the correct width
                        .attr("fill", function(d, i) {
                            return color(i % data.series.length);
                        })
                        .attr("class", "bar")
                        // width attribute is updated so no need to add this here
                        .attr("height", barHeight - 1);

                    bar // update the the DOM element according to the data (D3 does the for-loop here for you)
                        .attr("transform", function(d, i) { // shift the group element to the correct position
                            return "translate(" + 0 + "," + (i * barHeight+10 + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ")";
                        })
                        .select("rect") // select the rect inside the group element
                        .attr("width", function(d) {

                            return x(d);
                        })
                        .attr("x", function(d) {
							
                            return  chartWidth-x(d)-1;
                        })
                        .on("mouseover", function(d, i) {
                            mouseover(d, d3.select(this).attr("fill"), x(d));
                        })
                        .on("mouseout", mouseout);

                    bar.exit() // removes DOM elements if the data items are not available any more (D3 does the for-loop here for you)
                        .remove();
                    NewXAxisL
                        .call(xAxisShow)
						.attr("transform", "translate(" + 0 + ", "+chartHeight+ ")")
						.selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", function(d) {
                            return "rotate(-65)"
                        });

                    function mouseover(data, color, width) {
                        var formatShow = d3.format("s");
                        div.transition()
                            .duration(500)
                            .style("opacity", 1);
                        div
                            .text(formatShow(data))
                            .style("left", (d3.event.pageX - 100) + "px")
                            .style("top", (d3.event.pageY - 12) + "px")
                            .style("background", color);
                    };

                    function mouseout() {
                        div.transition()
                            .duration(200)
                            .style("opacity", 1e-6);
                    };
                };
            }, true);
            scope.$watch('rightPlayer', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.rightPlayer = angular.fromJson(scope.rightPlayer);
					var PositionLabelX=[120,120,120];
					var PositionLabelY=[10,100,190];
                    var data = {
                        labels: [
                             'Damage-Delt'
                        ],
                        series: [{
                            label: 'Physikl',
                            values: [scope.rightPlayer.physicalDamageDealtToChampions]
                        }, {
                            label: 'Magical',
                            values: [scope.rightPlayer.magicDamageDealtToChampions]
                        }, {
                            label: 'True',
                            values: [scope.rightPlayer.trueDamageDealtToChampions]
                        }, ]
                    };
                    // Zip the series data together (first values, second values, etc.)

                    groupHeight = barHeight * data.series.length;
                    // Zip the series data together (first values, second values, etc.)
                    var zippedData = [];
                    for (var i = 0; i < data.labels.length; i++) {
                        for (var j = 0; j < data.series.length; j++) {
                            zippedData.push(data.series[j].values[i]);
                        }
                    };
                    // Color scale
                    var color = d3.scale.category20();
                    var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;
                    var x = d3.scale.linear()
                        .domain([0, scope.rightPlayer.highestChartdealtChamp])
                        .range([0, chartWidth]);

                    var y = d3.scale.linear()
                        .range([chartHeight + gapBetweenGroups, 0]);

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .tickFormat('')
                        .tickSize(0)
                        .orient("right");

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .ticks('7')
                        .tickSize(10)
                        .orient("bottom");
                    var NewYAxis = chartRight.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + 0 + ", " + -20 + ")");

                  
                    // Specify the chart area and dimensions

                    // Create bars
                    var bar = chartRight
                        .selectAll("g.bar") // select the group DOM elements
                        .data(zippedData); // join with the dataset

                    bar.enter() // create a new DOM element for new data items (D3 does the for-loop here for you)
                        // add all attribute and items that won't change (on update)
                        .append("g") // create group element first
                        .attr("class", "bar")
                        // transform attribute is updated so no need to add this here
                        .append("rect") // Create rect element inside the group element of the correct width
                        .attr("fill", function(d, i) {
                            return color(i % data.series.length);
                        })
                        .attr("class", "bar")
                        // width attribute is updated so no need to add this here
                        .attr("height", barHeight - 1);

                    bar // update the the DOM element according to the data (D3 does the for-loop here for you)
                        .attr("transform", function(d, i) { // shift the group element to the correct position
                            return "translate(" + 0 + "," + (i * barHeight +10+ gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ")";
                        })
                        .select("rect") // select the rect inside the group element
                        .attr("width", function(d) {
                            return x(d);
                        })
                        .attr("x", function(d) {
                            return 2
                        })
                        .on("mouseover", function(d, i) {
                            mouseover(d, d3.select(this).attr("fill"), x(d));
                        })
                        .on("mouseout", mouseout);


                    bar.exit() // removes DOM elements if the data items are not available any more (D3 does the for-loop here for you)
                        .remove();

                    NewXAxisR
                        .call(xAxis)
						.attr("transform", "translate(" + 0 + ", "+chartHeight+ ")")
                        .selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", function(d) {
                            return "rotate(-65)"
                        });
						

                    NewYAxis
                        .call(yAxis);


                    function mouseover(data, color, width) {
                        var formatShow = d3.format("s");
                        div.transition()
                            .duration(500)
                            .style("opacity", 1);
                        div
                            .text(formatShow(data))
                            .style("left", (d3.event.pageX + 34) + "px")
                            .style("top", (d3.event.pageY - 12) + "px")
                            .style("background", color);
                    };

                    function mouseout() {
                        div.transition()
                            .duration(200)
                            .style("opacity", 1e-6);
                    };
                }
            }, true);
        }
    };
});