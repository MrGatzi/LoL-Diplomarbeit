sampleApp.controller('RecentGamesCRL',['$scope', 'mySharedService', function($scope,sharedService) {
     $scope.$on('handleBroadcast', function() {
        $scope.message =sharedService.message;
		console.log($scope.message);

		//ein wvent für recent games ect. 
		//animation spinner als span id/ nuormaler viso Hidden wenn button klick -> ned hidden
		//seite erst wechseln wenn die ergebnisse da sind.
		//$route kann man inizieren und ihm sagen was aufgeruden werden soll
		//auf Valid prüfen in PHP!!!!
    });
}]);
 