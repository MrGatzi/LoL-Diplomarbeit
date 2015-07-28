sampleApp.directive('differentscharts', function($rootScope){
	 return {
		restrict: 'AE',
        scope:true,
        link: function(scope, element, attrs) {
			console.log("hy :D");
			  $rootScope.$watch('ShowLeft', function(newValue, oldValue) {
                    console.log("I see a data change!" + scope.ShowLeft);
            }, true);
          
        }
	
    };
});
 