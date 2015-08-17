
sampleApp.directive('change', function() {
    return {
        restrict: 'A',
		
        link: function($scope, element, attrs) {
			$scope.toggleValue=false;
			$scope.elem=angular.element('#champswitch');
			$scope.elem.bind("mouseover", function() {
				if($scope.toggleValue==true){
					$scope.toggleValue=false;
					console.log($scope.toggleValue);
				}else{
					$scope.toggleValue=true;
					console.log($scope.toggleValue);
				}
				
				
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