sampleApp.controller('GameDetailsCRL',['$scope','GameInfoToMatchDetail','$routeParams', function($scope,GameInfo,$routeParams) {
	console.log($routeParams.sumName);
	$scope.$on('handleBroadcast2', function() {
		console.log("hy :D");
        $scope.Info =GameInfo.Info;
		console.log($scope.Info);
    });
}]);
 