sampleApp.controller('GameDetailsCRL',['$scope','$routeParams','$http','$window', function($scope,$routeParams,$http,$window) {
	data1 = {
			'SumName':$routeParams.sumName,
			'ServName':$routeParams.servName,
            'MatchId' : $routeParams.MatchID,
			'Mode': 'get'
        };
	// show loading coinainter mit spin
    $http.post('PHP/Cache_Game_Contents_Overview.php', {data1} ).
	success(function(data, status, config) {
		$scope.GameInfoOverview=data;
		console.log($scope.GameInfoOverview);
		
		if($scope.GameInfoOverview=='Error'){
			$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
		}else{
			$http.post('PHP/Cache_GameTimeline_ByMatchID.php', {data1} ).
			success(function(data, status, config) {
				$scope.GameInfoTimeLine=data;
				console.log($scope.GameInfoTimeLine);
				/*if($scope.GameInfoTimeLine=="null"){
					$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp'
				};*/
				changeValue();
				// loading cointainer wieder hide.
			})
			.error(function(data, status, headers, config) {
				$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
			});
		};
	})
	.error(function(data, status, headers, config) {
		$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
	});
	//console.log($scope.GameInfoOverview+"??");
	//$scope.ShowLeft=$scope.GameInfoOverview.stats;
	var changeValue = function()
    {
		console.log("hy1");
		$scope.ShowLeft=$scope.GameInfoTimeLine.participants[1].stats;
		$scope.ShowRight=$scope.GameInfoTimeLine.participants[1].stats;
    };
	$scope.changeChart= function(){
		alert("hy2");
		$scope.ShowLeft=$scope.GameInfoTimeLine.participants[5].stats;
	};

}]);
