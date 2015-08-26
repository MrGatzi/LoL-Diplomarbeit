sampleApp.controller('GameDetailsCRL',['$scope','$routeParams','$http','$window', function($scope,$routeParams,$http,$window) {
	$scope.ShowGameDetails=true;
	ChartOverTimeData=[
		[0, 0],
		[0, 0]
		];
	data1 = {
			'SumName':$routeParams.sumName,
			'ServName':$routeParams.servName,
            'MatchId' : $routeParams.MatchID,
			'Mode': 'get'
        };
	ToLeft = {
			'physicalDamageDealt':0,
        };
	ToRight = {
			'physicalDamageDealt':0,
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
				console.log("succ");
				InitCharts();
				$scope.ShowGameDetails=false;
				$scope.selectedchamp=2;
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
	var InitCharts = function()
    {
		ToLeft=$scope.GameInfoTimeLine.participants[1].stats;
		
		ToRight=$scope.GameInfoTimeLine.participants[4].stats;
		
		var highestLeft=Math.max(ToLeft.physicalDamageDealt,ToLeft.magicDamageDealt,ToLeft.physicalDamageDealtToChampions,ToLeft.physicalDamageTaken,ToLeft.magicDamageDealtToChampions,ToLeft.magicDamageTaken,ToLeft.trueDamageDealt,ToLeft.trueDamageDealtToChampions,ToLeft.trueDamageTaken);
		var highestRight=Math.max(ToRight.physicalDamageDealt,ToRight.magicDamageDealt,ToRight.physicalDamageDealtToChampions,ToRight.physicalDamageTaken,ToRight.magicDamageDealtToChampions,ToRight.magicDamageTaken,ToRight.trueDamageDealt,ToRight.trueDamageDealtToChampions,ToRight.trueDamageTaken);
		ToLeft.highestChart=Math.max(highestLeft,highestRight);
		ToRight.highestChart=ToLeft.highestChart;
		$scope.ShowLeft=ToLeft;
		$scope.ShowRight=ToRight;
		$scope.InputOverTime="changed";
		var i=0;
		while(i<$scope.GameInfoTimeLine.timeline.frames.length){
			ChartOverTimeData[i]=[i,$scope.GameInfoTimeLine.timeline.frames[i].participantFrames[2].minionsKilled];
			i++;
		};
		$scope.InputOverTime=ChartOverTimeData;
    };
	$scope.changeChartLeft= function(){
		ToLeft=$scope.GameInfoTimeLine.participants[3].stats;
		var highestLeft=Math.max(ToLeft.physicalDamageDealt,ToLeft.magicDamageDealt,ToLeft.physicalDamageDealtToChampions,ToLeft.physicalDamageTaken,ToLeft.magicDamageDealtToChampions,ToLeft.magicDamageTaken,ToLeft.trueDamageDealt,ToLeft.trueDamageDealtToChampions,ToLeft.trueDamageTaken);
		var highestRight=Math.max(ToRight.physicalDamageDealt,ToRight.magicDamageDealt,ToRight.physicalDamageDealtToChampions,ToRight.physicalDamageTaken,ToRight.magicDamageDealtToChampions,ToRight.magicDamageTaken,ToRight.trueDamageDealt,ToRight.trueDamageDealtToChampions,ToRight.trueDamageTaken);
		ToLeft.highestChart=Math.max(highestLeft,highestRight);
		ToRight.highestChart=ToLeft.highestChart;
		$scope.ShowLeft=ToLeft;
		$scope.ShowRight=ToRight;
		$scope.InputOverTime="changed";
	};
	$scope.changeChartRight= function(){
		ToRight=$scope.GameInfoTimeLine.participants[5].stats;
		var highestLeft=Math.max(ToLeft.physicalDamageDealt,ToLeft.magicDamageDealt,ToLeft.physicalDamageDealtToChampions,ToLeft.physicalDamageTaken,ToLeft.magicDamageDealtToChampions,ToLeft.magicDamageTaken,ToLeft.trueDamageDealt,ToLeft.trueDamageDealtToChampions,ToLeft.trueDamageTaken);
		var highestRight=Math.max(ToRight.physicalDamageDealt,ToRight.magicDamageDealt,ToRight.physicalDamageDealtToChampions,ToRight.physicalDamageTaken,ToRight.magicDamageDealtToChampions,ToRight.magicDamageTaken,ToRight.trueDamageDealt,ToRight.trueDamageDealtToChampions,ToRight.trueDamageTaken);
		ToLeft.highestChart=Math.max(highestLeft,highestRight);
		ToRight.highestChart=ToLeft.highestChart;
		$scope.ShowLeft=ToLeft;
		$scope.ShowRight=ToRight;
		$scope.InputOverTime="changed";
	};
	
	var sortChamps = function(){
		
		if($scope.GameInfoOverview.teamId==100){
			
			
		}else{
			
		}
	}
}]);
