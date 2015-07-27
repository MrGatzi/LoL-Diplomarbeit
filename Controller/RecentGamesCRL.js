sampleApp.controller('RecentGamesCRL',['$scope','$window','$routeParams','$http', function($scope,$window,$routeParams,$http) {
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
			if($scope.message.SumInfo == null){
				$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
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
			$scope.Overview={
				'SumName':$scope.message.Name ,
				'SumInfo':$scope.message.SumInfo[$scope.message.Name] ,
				'GameInfo':$scope.message.SumGames.games[GameId],
				'MatchId': $scope.message.SumGames.games[GameId].gameId,
				'SumServer': $scope.message.Server,
			};
			})
		.error(function(data, status, headers, config) {
			alert("fail");
		});
    };
	
	//If Overview got chanced broadcast to GameDetails
	$scope.$watch('Overview', function(newValue, oldValue) {
		if(newValue!=oldValue){
			$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/GameDetails/'+$scope.Overview.SumName+'/'+$scope.Overview.SumServer+'/'+$scope.Overview.MatchId;
		}
		},true);
}]);
 /*
function fellowplayers(){
	alert("hey");
 	 var i=0;
	 var j=0;
	 var l=0;
	 for(i=0;i<9;i++){
		if((item.stats.team)==(item.fellowPlayers.i.teamId){
		 
			$( "#ally"+j ).append( "<img class="img-responsive" alt="Responsive image" src="Libraries/img/champion/{{item.fellowPlayers.i.championId}}.png">" );
			j++;
		}else {
			
			$( "#enemy"+l ).append( "<img class="img-responsive" alt="Responsive image" src="Libraries/img/champion/{{item.fellowPlayers.i.championId}}.png">" );
			l++;
		}
	} 
	 
 } 
 */