sampleApp.controller('GameDetailsCRL',['$scope','GameInfoToMatchDetail', function($scope,GameInfo) {
	
	$scope.$on('handleBroadcast2', function() {
		console.log("hy :D");
        $scope.Info =GameInfo.Info;
		console.log($scope.Info);
		
    });
}]);
 