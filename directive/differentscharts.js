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
							console.log(scope.leftPlayer);
							var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
							d3.select("differentscharts").selectAll("div")
								.data(dataset)
								.enter()
								.append("div")
								.attr("class", "bar")
								.style("height", function(d) {
									var barHeight = d * 5;
									return barHeight + "px";
								});
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
