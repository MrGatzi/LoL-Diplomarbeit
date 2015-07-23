sampleApp.controller('RecentGamesCRL',['$scope', 'mySharedService','GameInfoToMatchDetail','$window','$routeParams','$http', function($scope,sharedService,GameInfo,$window,$routeParams,$http) {
	$scope.Overview={
			'SumName':0 ,
			'SumInfo':0 ,
			'GameInfo':0,
			'MatchId': 0
		};
	$scope.$on('handleBroadcast', function() {
        $scope.message =sharedService.message;
    });
	
	// If the Broadcast is not working take it form the URL
	if($scope.message==undefined){
		data1 = {
            'SumName_input' : $routeParams.sumName,
            'ServerName_input' : $routeParams.servName
        };
        $http.post('PHP/Cache_and_API_Request.php', {data1} ).
		success(function(data, status, config) {
			$scope.message=data;
			$scope.message.Name= $routeParams.sumName;
			$scope.message.Server=$routeParams.servName;
			})
		.error(function(data, status, headers, config) {
			alert("fail");
		});
	}
	/*
		on Click Load the Overview Varibale
		
	*/
	
	$scope.GameClick = function(GameId) {
		$scope.Overview={
			'SumName':$scope.message.Name ,
			'SumInfo':$scope.message.SumInfo[$scope.message.Name] ,
			'GameInfo':$scope.message.SumGames.games[GameId],
			'MatchId': $scope.message.SumGames.games[GameId].gameId,
			'SumServer': $scope.message.Server,
		};
    };
	
	//If Overview got chanced broadcast to GameDetails
	$scope.$watch('Overview', function(newValue, oldValue) {
		if(newValue!=oldValue){
			GameInfo.prepForBroadcast2($scope.Overview);
			$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/GameDetails/'+$scope.Overview.SumName+'/'+$scope.Overview.SumServer+'/'+$scope.Overview.MatchId;
		}
		},true);
}]);
 