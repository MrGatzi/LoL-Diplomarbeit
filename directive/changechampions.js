
sampleApp.directive('champSelection', function() {
    return {
        restrict: 'A',
        scope:  
		{
			'playersRight': '=',
			'playersLeft': '='		
		}, 
        link: function($scope, element, attrs) {		
			$scope.isVisible=false;				
			console.log($scope);
			
      $('.champion,.open', element[0]).bind('click', function(event) {
        event.stopPropagation();
        $scope.isVisible = !$scope.isVisible;
        $scope.$apply();
      });
      
      $('.selector li', element[0]).bind('click', function(event) {
        event.stopPropagation();
        
        console.log('selected this champ', event.target);
      });
      
      // close the selector on outside click
      $(document).bind('click', function(){
        event.stopPropagation();
        $scope.isVisible = false;
        $scope.$apply();
      });
		}
    };
});
    

/* customDirectives = angular.module('customDirectives', []);
customDirectives.directive('customPopover', function () {
    return {
        restrict: 'A',
        template: '<span>{{label}}</span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;
            $(el).popover({
                trigger: 'click',
                html: true,
                content: attrs.popoverHtml,
                placement: attrs.popoverPlacement
            });
        }
    };
});

angular.module('CustomComponents', ['customDirectives']); */