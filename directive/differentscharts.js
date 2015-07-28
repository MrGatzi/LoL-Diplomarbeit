sampleApp.directive('differentscharts', function(){
	 return {
		restrict: 'EA',
		scope:false,
        link: function ($scope, element, attrs) {
			console.log($scope);
			console.log($scope["GameInfoOverview"]);
			$scope.$watch($scope.GameInfoOverview, function(newValue, oldValue) {
				if (newValue!=oldValue) {
					alert("hy");
				}
			});	
		
        }
    };
});
 