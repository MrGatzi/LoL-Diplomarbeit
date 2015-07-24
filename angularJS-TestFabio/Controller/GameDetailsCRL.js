sampleApp.controller('GameDetailsCRL',['$scope','$routeParams','$http','$window', function($scope,$routeParams,$http,$window) {
	data1 = {
			'SumName':$routeParams.sumName,
			'ServName':$routeParams.servName,
            'MatchId' : $routeParams.MatchID,
			'Mode': 'get'
        };
	GameInfoOverview=0;
    $http.post('PHP/Cache_Game_Contents_Overview.php', {data1} ).
	success(function(data, status, config) {
		GameInfoOverview=data;
		if(GameInfoOverview=='Error'){
			$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/errortmp';
		}else{
			$http.post('PHP/Cache_GameTimeline_ByMatchID.php', {data1} ).
			success(function(data, status, config) {
				GameInfoTimeLine=data;
			})
			.error(function(data, status, headers, config) {
				$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/errortmp';
			});
		};
	})
	.error(function(data, status, headers, config) {
		$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/errortmp';
	});
	
}]);
 