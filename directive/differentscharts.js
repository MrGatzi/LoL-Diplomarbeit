sampleApp.directive('differentscharts', function($rootScope) {
    return {
        restrict: 'AE',
        // scope object defines the attributes that can be used in the HTML tag
        // for '@', '=', '&' syntax see http://onehungrymind.com/angularjs-sticky-notes-pt-2-isolated-scope/
        scope: {
            'leftPlayer': '@',
            'rightPlayer': '@'
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
                chartHeight = 300;

            /*
            var bars = chart.append("g")
                .attr("class", "bars");
            var AxisXX = chart.append("g")
                .attr("class", "axis");*/
                
            var chart = d3.select(".chartLeft")
                .attr("width", chartWidth)
                .attr("height", chartHeight);

            scope.$watch('leftPlayer', function(newValue, oldValue) {
                // FIRES $ TIMES NO IDEA WY!

                if (newValue != oldValue) {
                    scope.leftPlayer = angular.fromJson(scope.leftPlayer);
                    var data = {
                        labels: [
                            'Damage Dealt to Champ', 'Damage delt', 'Damage taken'
                        ],
                        series: [{
                            label: 'Physikl',
                            values: [scope.leftPlayer.physicalDamageDealt, scope.leftPlayer.physicalDamageDealtToChampions, scope.leftPlayer.physicalDamageTaken]
                        }, {
                            label: 'Magical',
                            values: [scope.leftPlayer.magicDamageDealt, scope.leftPlayer.magicDamageDealtToChampions, scope.leftPlayer.magicDamageTaken]
                        }, {
                            label: 'True',
                            values: [scope.leftPlayer.trueDamageDealt, scope.leftPlayer.trueDamageDealtToChampions, scope.leftPlayer.trueDamageTaken]
                        }, ],
                        abs: [
                            560, 500, 500, 485, 485, 485, 495
                        ]
                    };
                    console.log("you changed te data !");
                    groupHeight = barHeight * data.series.length;
                    // Zip the series data together (first values, second values, etc.)
                    var zippedData = [];
                    for (var i = 0; i < data.labels.length; i++) {
                        for (var j = 0; j < data.series.length; j++) {
                            zippedData.push(data.series[j].values[i]);
                        }
                    };
                    console.log(zippedData);
                    // Color scale
                    var color = d3.scale.category20();
                    var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

                    var x = d3.scale.linear()
                        .domain([0, d3.max(zippedData)])
                        .range([0, chartWidth]);

                    var y = d3.scale.linear()
                        .range([chartHeight + gapBetweenGroups, 0]);

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .tickFormat('')
                        .tickSize(0)
                        .orient("right");

                    // Specify the chart area and dimensions


                    
                    // Create bars
                    var bar = chart
                        .selectAll("g.bar") // select the group DOM elements
                        .data(zippedData); // join with the dataset
                    
                    bar.enter() // create a new DOM element for new data items (D3 does the for-loop here for you)
                      // add all attribute and items that won't change (on update)
                      .append("g") // create group element first
                      .attr("class", "bar")
                      // transform attribute is updated so no need to add this here
                      .append("rect") // Create rect element inside the group element of the correct width
                      .attr("x", function(d) {
                        console.log(chartWidth);
                        return chartWidth - x(d);
                      })
                      .attr("fill", function(d, i) {
                        return color(i % data.series.length);
                      })
                      .attr("class", "bar")
                      // width attribute is updated so no need to add this here
                      .attr("height", barHeight - 1);
                    
                    bar // update the the DOM element according to the data (D3 does the for-loop here for you)
                      .attr("transform", function(d, i) { // shift the group element to the correct position
                          return "translate(" + 0 + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ")";
                      })
                      .select("rect") // select the rect inside the group element
                      .attr("width", function(d) { return x(d); });
                    
                    bar.exit() // removes DOM elements if the data items are not available any more (D3 does the for-loop here for you)
                      .remove(); 

                    // Add text label in bar
                    /* bar.append("text")
                         .attr("x", function(d) {
                             var count = 9.5;
                             var flag = d;
                             while (flag >= 10) {
                                 count = count + count;
                                 flag = flag / 100;
                             };
                             return chartWidth - x(d) + count;
                         })
                         .attr("y", barHeight / 2)
                         .attr("fill", "red")
                         .attr("dy", ".35em")
                         .text(function(d) {
                             return d;
                         });*/

                    // Draw labels


                    /* bar.append("text")
                         .attr("class", "label")
                         .attr("x", function(d, i) {
                             console.log(i);
                             return data.abs[i];
                         })
                         .attr("y", groupHeight / 2)
                         .attr("dy", ".35em")
                         .text(function(d, i) {
                             if (i % data.series.length === 0)
                                 return data.labels[Math.floor(i / data.series.length)];
                             else
                                 return ""
                         });*/

                    var NewXAxis = chart.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + 0 + ", " + -gapBetweenGroups / 2 + ")")
                        .call(yAxis);
                };
            }, true);
            scope.$watch('rightPlayer', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.rightPlayer = angular.fromJson(scope.rightPlayer);
                    var data = {
                        labels: [
                            'Damage Dealt to Champ', 'Damage delt', 'Damage taken'
                        ],
                        series: [{
                            label: 'Physikl',
                            values: [scope.rightPlayer.physicalDamageDealt, scope.rightPlayer.physicalDamageDealtToChampions, scope.rightPlayer.physicalDamageTaken]
                        }, {
                            label: 'Magical',
                            values: [scope.rightPlayer.magicDamageDealt, scope.rightPlayer.magicDamageDealtToChampions, scope.rightPlayer.magicDamageTaken]
                        }, {
                            label: 'True',
                            values: [scope.rightPlayer.trueDamageDealt, scope.rightPlayer.trueDamageDealtToChampions, scope.rightPlayer.trueDamageTaken]
                        }, ],
                        abs: [
                            560, 500, 500, 485, 485, 485, 495
                        ]
                    };

                    // Zip the series data together (first values, second values, etc.)
                    var zippedData = [];
                    for (var i = 0; i < data.labels.length; i++) {
                        for (var j = 0; j < data.series.length; j++) {
                            zippedData.push(data.series[j].values[i]);
                        }
                    }

                    // Color scale
                    var color = d3.scale.category20();
                    var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

                    var x = d3.scale.linear()
                        .domain([0, d3.max(zippedData)])
                        .range([0, chartWidth]);

                    var y = d3.scale.linear()
                        .range([chartHeight + gapBetweenGroups, 0]);

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .tickFormat('')
                        .tickSize(0)
                        .orient("right");

                    // Specify the chart area and dimensions
                    var chart = d3.select(".chartRight")
                        .attr("width", spaceForLabels + chartWidth + spaceForLegend)
                        .attr("height", chartHeight);

                    // Create bars
                    var bar = chart
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
                    
                    bar // update the data in the group element (D3 does the for-loop here for you) -- no update() function needed
                      .attr("transform", function(d, i) {
                          return "translate(" + 1 + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ")";
                      })
                      .select("rect") // select the rect inside the group element
                      .attr("width", function(d) { return x(d); });
                    
                    bar.exit() // removes DOM elements if the data items are not available any more (D3 does the for-loop here for you)
                      .remove(); 
                    

                    /*// Add text label in bar
                    bar.append("text")
                        .attr("x", function(d) { return x(d) - 3; })
                        .attr("y", barHeight / 2)
                        .attr("fill", "red")
                        .attr("dy", ".35em")
                        .text(function(d) { return d; });
                    */
                    /*
                    bar.append("text")
                        .attr("class", "label")
                        .attr("x", function(d) { return - 10; })
                        .attr("y", groupHeight / 2)
                        .attr("dy", ".35em")
                        .text(function(d,i) {
                          if (i % data.series.length === 0)
                            return data.labels[Math.floor(i/data.series.length)];
                          else
                            return ""});

                    chart.append("g")
                          .attr("class", "y axis")
                          .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
                          .call(yAxis);
                    */
                    // Draw legend
                    var legendRectSize = 18,
                        legendSpacing = 4;

                    var legend = chart.selectAll('.legend')
                        .data(data.series)
                        .enter()
                        .append('g')
                        .attr('transform', function(d, i) {
                            var height = legendRectSize + legendSpacing;
                            var offset = -gapBetweenGroups / 2;
                            var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
                            var vert = i * height - offset;
                            return 'translate(' + horz + ',' + vert + ')';
                        });

                    legend.append('rect')
                        .attr('width', legendRectSize)
                        .attr('height', legendRectSize)
                        .style('fill', function(d, i) {
                            return color(i);
                        })
                        .style('stroke', function(d, i) {
                            return color(i);
                        });

                    legend.append('text')
                        .attr('class', 'legend')
                        .attr('x', legendRectSize + legendSpacing)
                        .attr('y', legendRectSize - legendSpacing)
                        .text(function(d) {
                            return d.label;
                        });
                }
            }, true);
        }
    };
});