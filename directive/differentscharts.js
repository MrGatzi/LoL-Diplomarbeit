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
							var dataset = [scope.leftPlayer.magicDamageDealtPlayer];
							dataset[1]=scope.leftPlayer.magicDamageDealtToChampions;
							dataset[2]=scope.leftPlayer.magicDamageTaken;
							dataset[3]=scope.leftPlayer.physicalDamageDealtPlayer;
							dataset[4]=scope.leftPlayer.physicalDamageDealtToChampions;
							dataset[5]=scope.leftPlayer.physicalDamageTaken;
							dataset[6]=scope.leftPlayer.totalHeal;
							
							var w = 500;
							var h = 100;
							var svg = d3.select("differentscharts")
									.append("svg")
									.attr("width", w)
									.attr("height", h);

							svg.selectAll("rect")
								.data(dataset)
								.enter()
								.append("rect")
								.attr("x", function(d, i) {
									return i * 21;  //Bar width of 20 plus 1 for padding
								})
								.attr("y", 0)
								.attr("width", 20)
								.attr("height", 20);
			
							/*d3.select("differentscharts").selectAll("div")
								.data(dataset)
								.enter()
								.append("div")
								.attr("class", "bar")
								.style("width", function(d) {
									var barHeight = d * 0.003;
									return barHeight + "px";
								});*/
						}
				}, true);
				scope.$watch('rightPlayer', function(newValue, oldValue) {
						if(newValue !== oldValue) {
							console.log(scope.rightPlayer);
						}
				}, true);
        } 
    };
});
