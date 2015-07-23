sampleApp.controller('GameDetailsCRL',['$scope','GameInfoToMatchDetail', function($scope,GameInfo,$routeParams) {
	
	$scope.$on('handleBroadcast2', function() {
		console.log("hy :D");
        $scope.Info =GameInfo.Info;
		console.log($scope.Info);
    });
	console.log(GameInfo.Info);
}]);
 