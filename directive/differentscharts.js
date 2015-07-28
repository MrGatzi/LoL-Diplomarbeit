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
