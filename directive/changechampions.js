
sampleApp.directive('champSelection', function() {
    return {
        restrict: 'A',
        scope:  
		{
			'allPlayers': '=',
			'selectedRight': '=',
			'selectedLeft': '=',
			'playersRight': '=',
			'playersLeft': '='		
		}, 
        link: function($scope, element, attrs) {		
			$scope.isVisible=false;	
			var passValue=0;
			console.log($scope);
			
      $('.champion,.open', element[0]).bind('click', function(event) {
        event.stopPropagation();
        $scope.isVisible = !$scope.isVisible;
        $scope.$apply();
      });
      
      $('.leftlist', element[0]).bind('click', function(event) {
		  var i=0;
		  var j=0;
		 event.stopPropagation();
		passValue=$scope.selectedLeft;
		for(i=0;i<4;i++){
			if($( event.target ).hasClass( $scope.playersLeft[i] )){
				$scope.selectedLeft=$scope.playersLeft[i];
				$scope.playersLeft[i]=passValue;
				for(j=0;j<10;j++){
					if($scope.playersLeft[i]==$scope.allPlayers[j].championId){
						alert("hallo");
					}
				}
				$scope.isVisible = false;
				$scope.$apply();
			}
		}
      });
	  $('.rightlist', element[0]).bind('click', function(event) {
        event.stopPropagation();
        passValue=$scope.selectedRight;
		for(i=0;i<4;i++){
			if($( event.target ).hasClass( $scope.playersRight[i] )){
				$scope.selectedRight=$scope.playersRight[i];
				$scope.playersRight[i]=passValue;
				for(j=0;j<10;j++){
					if($scope.playersLeft[i]==$scope.allPlayers[j].championId){
						alert("hallo");
					}
				}
				$scope.isVisible = false;
				$scope.$apply();
			}
		}
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
    

