MainController.directive('champSelection', function() {
    return {
        restrict: 'A',
		//selected are the Champions with the big Icon on the page
		//players are the others wich you can select
        scope: {
            'selectedRight': '=',
            'selectedLeft': '=',
            'playersRight': '=',
            'playersLeft': '=',
            methodToCall: '&method'
        },
        link: function($scope, element, attrs) {
            $scope.isVisible = false;
            var passValue = 0;
            console.log($scope);
			// function to open the selectbar of the other teammates
            $('.champion,.open', element[0]).bind('click', function(event) {
                event.stopPropagation();
                $scope.isVisible = !$scope.isVisible;
                $scope.$apply();
            });
			//If clicked on the left list it will swap the selected with the current selected champion
            $('.leftlist', element[0]).bind('click', function(event) {
                var i = 0;
                var j = 0;
               event.stopPropagation();

                passValue = $scope.selectedLeft;
                for (i = 0; i < 4; i++) {
                    if ($(event.target).hasClass($scope.playersLeft[i].championId)) {
                        $scope.selectedLeft = $scope.playersLeft[i];
                        $scope.playersLeft[i] = passValue;
                        //console.log($scope.selectedLeft.participantId);
                        $scope.isVisible = false;
                        $scope.$apply();
                    }
                }
				$scope.finish("L:"+($scope.selectedLeft.participantId-1));
            });
			//If clicked on the right list it will swap the selected with the current selected champion
            $('.rightlist', element[0]).bind('click', function(event) {
                event.stopPropagation();
                passValue = $scope.selectedRight;
                for (i = 0; i < 4; i++) {
                    if ($(event.target).hasClass($scope.playersRight[i].championId)) {
                        $scope.selectedRight = $scope.playersRight[i];
                        $scope.playersRight[i] = passValue;
                        //console.log($scope.selectedRight.participantId);
                        $scope.isVisible = false;
                        $scope.$apply();
                    }
                }
				
				$scope.finish("R:"+($scope.selectedRight.participantId-1));
            });

            // close the selector on outside click
            $(document).bind('click', function() {
                event.stopPropagation();
                $scope.isVisible = false;
                $scope.$apply();
            });
			
            $scope.finish = function(PlayerToShow) {
                var func = $scope.methodToCall();
                func(PlayerToShow);
            }
        }
    };
});