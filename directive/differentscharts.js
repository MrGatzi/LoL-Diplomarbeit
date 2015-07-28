sampleApp.directive('differentscharts', function($rootScope){
	 return {
		restrict: 'AE',
				// scope object defines the attributes that can be used in the HTML tag
				// for '@', '=', '&' syntax see http://onehungrymind.com/angularjs-sticky-notes-pt-2-isolated-scope/
        scope:{
	        'leftPlayer': '@',
			'rightPlayer': '@'
	      },
        link: function(scope, element, attrs) {
				scope.$watch('leftPlayer', function(newValue, oldValue) {
						if(newValue !== oldValue) {
							scope.leftPlayer=angular.fromJson(scope.leftPlayer);
							var data = [scope.leftPlayer.magicDamageDealtPlayer];
							data[1]=scope.leftPlayer.magicDamageDealtToChampions;
							data[2]=scope.leftPlayer.magicDamageTaken;
							data[3]=scope.leftPlayer.physicalDamageDealtPlayer;
							data[4]=scope.leftPlayer.physicalDamageDealtToChampions;
							data[5]=scope.leftPlayer.physicalDamageTaken;
							data[6]=scope.leftPlayer.trueDamageDealtPlayer;
							data[7]=scope.leftPlayer.trueDamageDealtToChampions;
							data[8]=scope.leftPlayer.trueDamageTaken;
							
							var margin = {top: 30, right: 0, bottom: 0, left: 30},
								width = 320,
								barHeight = 30,
								height = barHeight * data.length;

							var x = d3.scale.linear()
								.domain([0, d3.max(data)])
								.range([0, width-100]);

							var xAxis = d3.svg.axis()
								.scale(x)
								.orient("top")
								.ticks(3);

							var chart = d3.select(".chart")
								.attr("width", width + margin.left + margin.right)
								.attr("height", height + margin.top + margin.bottom)
							  .append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
								

							chart.append("g")
								.attr("class", "bars")
							  .selectAll("rect")
								.data(data)
							  .enter().append("g")
								.attr("class", "GameInfoData")
								.append("rect")
									.attr("y", function(d, i) { return i * barHeight; })
									.attr("height", barHeight - 1)
									.attr("width", x)
								.text(function(d) { return d; });
								
							chart.append("g")
								.attr("class", "axis")
								.call(xAxis)
							  .select(".tick line")
								.style("stroke", "#000");
								
							chart.selectAll(".GameInfoData")
								.append("text")
								.attr("x", function(d) { return x(d); })
								.attr("y", function(d, i) { return i * barHeight +12; })
								.attr("dy", ".35em")
								.text(function(d) { return d; });

							
					};
				}, true);	
				scope.$watch('rightPlayer', function(newValue, oldValue) {
						if(newValue !== oldValue) {
						}
				}, true);
    }
	};
});
