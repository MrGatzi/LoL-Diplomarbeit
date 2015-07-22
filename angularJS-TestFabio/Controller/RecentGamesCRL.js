sampleApp.controller('RecentGamesCRL',['$scope', 'mySharedService','GameInfoToMatchDetail','$window', function($scope,sharedService,GameInfo,$window) {
     $scope.Overview={
			'SumName':0 ,
			'SumInfo':0 ,
			'GameInfo':0,
			'MatchId': 0
		};
	 $scope.$on('handleBroadcast', function() {
        $scope.message =sharedService.message;
		console.log($scope.message);
		$scope.GameClick = function(GameId) {
		$scope.Overview={
			'SumName':$scope.message.Name ,
			'SumInfo':$scope.message.SumInfo[$scope.message.Name] ,
			'GameInfo':$scope.message.SumGames.games[GameId],
			'MatchId': $scope.message.SumGames.games[GameId].gameId
		};
    };
		//ein wvent für recent games ect. 
		//animation spinner als span id/ nuormaler viso Hidden wenn button klick -> ned hidden
		//seite erst wechseln wenn die ergebnisse da sind.
		//$route kann man inizieren und ihm sagen was aufgeruden werden soll
		//auf Valid prüfen in PHP!!!!
    });
	$scope.$watch('Overview', function(newValue, oldValue) {
		if(newValue!=oldValue){
			GameInfo.prepForBroadcast2($scope.Overview);
			$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/GameDetails';
			
		}
		},true);
}]);
 