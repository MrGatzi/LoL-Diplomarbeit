MainController.controller('RecentGamesCRL',['$scope','$window','$routeParams','$http', function($scope,$window,$routeParams,$http) {
	$scope.Overview={
			'SumName':0 ,
			'SumInfo':0 ,
			'GameInfo':0,
			'MatchId': 0
		};

	if($scope.message==undefined){
		data1 = {
            'SumName_input' : $routeParams.sumName,
            'ServerName_input' : $routeParams.servName
        };
        $http.post('PHP/Cache_and_API_Request.php', {data1} ).
		success(function(data, status, config) {
			$scope.message=data;
			console.log($scope.message);
			$scope.message.Name= $routeParams.sumName;
			$scope.message.Server=$routeParams.servName;
			angular.forEach($scope.message.SumGames.games, function(value, key) {
				value.fellowPlayers[9]={
					'championId':value.championId,
					'summonerId': 'you',
					'teamId': value.teamId
				};
			});
			if($scope.message.SumInfo == null){
				$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
			}
			if($scope.message.SumInfo){
			}
			})
		.error(function(data, status, headers, config) {
			alert("fail");
		});
	}
	/*
		on Click Load the Overview Varibale
		
	*/
	$scope.GameClick = function(GameId) {
		data1 = {
			'SumName': $scope.message.Name,
			'ServName': $scope.message.Server,
            'MatchId' : $scope.message.SumGames.games[GameId].gameId,
            'GameInfoOverview' : $scope.message.SumGames.games[GameId],
			'Mode': 'set'
        };
        $http.post('PHP/Cache_Game_Contents_Overview.php', {data1} ).
		success(function(data, status, config) {
			$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/GameDetails/'+$scope.message.Name+'/'+$scope.message.Server+'/'+$scope.message.SumGames.games[GameId].gameId;
			})
		.error(function(data, status, headers, config) {
			alert("fail");
		});
		
    };
}]);
