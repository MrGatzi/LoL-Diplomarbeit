sampleApp.controller('GameDetailsCRL', ['$scope', '$routeParams', '$http', '$window', function($scope, $routeParams, $http, $window) {
    $scope.ShowGameDetails = true;
    ChartOverTimeData = {
        'Lines': []
    };
    ChartOverTimeData.Lines[0] = ['0', '0'];
    ChartOverTimeData.Lines[1] = ['0', '0'];
    $scope.othersleft = ['0', '0'];
    $scope.othersright = ['0', '0'];
    data1 = {
        'SumName': $routeParams.sumName,
        'ServName': $routeParams.servName,
        'MatchId': $routeParams.MatchID,
        'Mode': 'get'
    };
    ToLeft = {
        'physicalDamageDealt': 0,
    };
    ToRight = {
        'physicalDamageDealt': 0,
    };
    // show loading coinainter mit spin
    $http.post('PHP/Cache_Game_Contents_Overview.php', {
        data1
    }).
    success(function(data, status, config) {
            $scope.GameInfoOverview = data;
            console.log($scope.GameInfoOverview);

            if ($scope.GameInfoOverview == 'Error') {
                $window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
            } else {
                $http.post('PHP/Cache_GameTimeline_ByMatchID.php', {
                    data1
                }).
                success(function(data, status, config) {
                        $scope.GameInfoTimeLine = data;
                        console.log($scope.GameInfoTimeLine);
                        /*if($scope.GameInfoTimeLine=="null"){
                        	$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp'
                        };*/
                        console.log("succ");
                        InitCharts();
                        sortChamps();
                        $scope.ShowGameDetails = false;
                        $scope.selectedchamp = 2;
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
    var InitCharts = function() {
        ToLeft = $scope.GameInfoTimeLine.participants[1].stats;

        ToRight = $scope.GameInfoTimeLine.participants[4].stats;

        var highestLeft = Math.max(ToLeft.physicalDamageDealt, ToLeft.magicDamageDealt, ToLeft.physicalDamageDealtToChampions, ToLeft.physicalDamageTaken, ToLeft.magicDamageDealtToChampions, ToLeft.magicDamageTaken, ToLeft.trueDamageDealt, ToLeft.trueDamageDealtToChampions, ToLeft.trueDamageTaken);
        var highestRight = Math.max(ToRight.physicalDamageDealt, ToRight.magicDamageDealt, ToRight.physicalDamageDealtToChampions, ToRight.physicalDamageTaken, ToRight.magicDamageDealtToChampions, ToRight.magicDamageTaken, ToRight.trueDamageDealt, ToRight.trueDamageDealtToChampions, ToRight.trueDamageTaken);
        ToLeft.highestChart = Math.max(highestLeft, highestRight);
        ToRight.highestChart = ToLeft.highestChart;
        $scope.ShowLeft = ToLeft;
        $scope.ShowRight = ToRight;
        $scope.InputOverTime = "changed";
        var i = 0;
        while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
            ChartOverTimeData.Lines[0][i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[2].minionsKilled];
            i++;
        };
        var i = 0;
        while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
            ChartOverTimeData.Lines[1][i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[3].minionsKilled];
            i++;
        };
		ChartOverTimeData.Lines[1].color="green";
		ChartOverTimeData.Lines[0].color="red";
        $scope.InputOverTime = ChartOverTimeData;
        $scope.InputOverTime.text = "CreepCrore";
        console.log($scope.InputOverTime);
    };
    $scope.changeChartLeft = function(part) {
        ToLeft = $scope.GameInfoTimeLine.participants[part].stats;
        var highestLeft = Math.max(ToLeft.physicalDamageDealt, ToLeft.magicDamageDealt, ToLeft.physicalDamageDealtToChampions, ToLeft.physicalDamageTaken, ToLeft.magicDamageDealtToChampions, ToLeft.magicDamageTaken, ToLeft.trueDamageDealt, ToLeft.trueDamageDealtToChampions, ToLeft.trueDamageTaken);
        var highestRight = Math.max(ToRight.physicalDamageDealt, ToRight.magicDamageDealt, ToRight.physicalDamageDealtToChampions, ToRight.physicalDamageTaken, ToRight.magicDamageDealtToChampions, ToRight.magicDamageTaken, ToRight.trueDamageDealt, ToRight.trueDamageDealtToChampions, ToRight.trueDamageTaken);
        ToLeft.highestChart = Math.max(highestLeft, highestRight);
        ToRight.highestChart = ToLeft.highestChart;
        $scope.ShowLeft = ToLeft;
        $scope.ShowRight = ToRight;
        $scope.InputOverTime = "changed";
        var i = 0;
        while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
            ChartOverTimeData.Lines[1][i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[part].minionsKilled];
            i++;
        };
		ChartOverTimeData.Lines[1].color="green";
		console.log(ChartOverTimeData);
        $scope.InputOverTime = ChartOverTimeData;
    };
    $scope.changeChartRight = function(part) {
        ToRight = $scope.GameInfoTimeLine.participants[part].stats;
        var highestLeft = Math.max(ToLeft.physicalDamageDealt, ToLeft.magicDamageDealt, ToLeft.physicalDamageDealtToChampions, ToLeft.physicalDamageTaken, ToLeft.magicDamageDealtToChampions, ToLeft.magicDamageTaken, ToLeft.trueDamageDealt, ToLeft.trueDamageDealtToChampions, ToLeft.trueDamageTaken);
        var highestRight = Math.max(ToRight.physicalDamageDealt, ToRight.magicDamageDealt, ToRight.physicalDamageDealtToChampions, ToRight.physicalDamageTaken, ToRight.magicDamageDealtToChampions, ToRight.magicDamageTaken, ToRight.trueDamageDealt, ToRight.trueDamageDealtToChampions, ToRight.trueDamageTaken);
        ToLeft.highestChart = Math.max(highestLeft, highestRight);
        ToRight.highestChart = ToLeft.highestChart;
        $scope.ShowLeft = ToLeft;
        $scope.ShowRight = ToRight;
        $scope.InputOverTime = "changed";
        var i = 0;
        while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
            ChartOverTimeData.Lines[0][i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[part].minionsKilled];
            i++;
        };
		console.log(ChartOverTimeData);
        $scope.InputOverTime = ChartOverTimeData;
    };

    /* 	passChampions = function(){
    		var right;
    		var left;
    		var players;
    		right=$scope.GameInfoTimeLine.participants;
    		if($scope.GameInfoOverview.teamId==100){
    			left=right.splice(0,5);
    			
    		}else{
    			left=right;
    			right=left.splice(0,5);
    			
    		}
    		$scope.leftchamps=left;
    		$scope.rightchamps=right;
    	
    	} */

    var sortChamps = function() {

        var i = 0;
        var j = 0;
        var cnt = 0;
        var flag = 0;
        if ($scope.GameInfoOverview.teamId == 100) {
            for (i = 0; i < 5; i++) {
                if ($scope.GameInfoOverview.championId == $scope.GameInfoTimeLine.participants[i].championId) {
                    $scope.leftplayerselected = $scope.GameInfoTimeLine.participants[i];
                    flag = i;
                }
            }
            for (i = 0; i < 5; i++) {
                if (i != flag) {

                    $scope.othersleft[j] = $scope.GameInfoTimeLine.participants[i];
                    j++;
                }

            }
            for (i = 5; i < 10; i++) {
                if ($scope.GameInfoTimeLine.participants[flag].timeline.lane == $scope.GameInfoTimeLine.participants[i].timeline.lane) {
                    if ($scope.GameInfoTimeLine.participants[flag].timeline.role == $scope.GameInfoTimeLine.participants[i].timeline.role) {
                        $scope.rightplayerselected = $scope.GameInfoTimeLine.participants[i];
                        cnt = 1;
                        flag = i;
                    }
                }
            }
            j = 0;
            if (cnt == 0) {

                $scope.rightplayerselected = $scope.GameInfoTimeLine.participants[5];
                for (i = 6; i < 10; i++) {

                    $scope.othersright[j] = $scope.GameInfoTimeLine.participants[i];
                    j++;
                }
            } else {
                for (i = 5; i < 10; i++) {
                    if (i != flag) {
                        $scope.othersright[j] = $scope.GameInfoTimeLine.participants[i];
                        j++;
                    }

                }
            }


        } else {
            for (i = 5; i < 10; i++) {
                if ($scope.GameInfoOverview.championId == $scope.GameInfoTimeLine.participants[i].championId) {
                    $scope.leftplayerselected = $scope.GameInfoTimeLine.participants[i];
                    flag = i;
                }
            }
            for (i = 5; i < 10; i++) {
                if (i != flag) {
                    $scope.othersleft[j] = $scope.GameInfoTimeLine.participants[i];
                    j++;
                }

            }
            for (i = 0; i < 5; i++) {
                if ($scope.GameInfoTimeLine.participants[flag].timeline.lane == $scope.GameInfoTimeLine.participants[i].timeline.lane) {
                    if ($scope.GameInfoTimeLine.participants[flag].timeline.role == $scope.GameInfoTimeLine.participants[i].timeline.role) {
                        $scope.rightplayerselected = $scope.GameInfoTimeLine.participants[i];
                        cnt = 1;
                        flag = i;
                    }
                }
            }
            j = 0;
            if (cnt == 0) {
                $scope.rightplayerselected = $scope.GameInfoTimeLine.participants[0];
                for (i = 1; i < 5; i++) {
                    $scope.othersright[j] = $scope.GameInfoTimeLine.participants[i];
                    j++;
                }
            } else {

                for (i = 0; i < 5; i++) {
                    if (i != flag) {
                        $scope.othersright[j] = $scope.GameInfoTimeLine.participants[i];
                        j++;
                    }

                }
            }

        }
    }
    $scope.XpGainedUpdate = function() {
        var i = 0;
        while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
            ChartOverTimeData[i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[2].xp];
            i++;
        };

        $scope.InputOverTime = ChartOverTimeData;
        $scope.InputOverTime.text = "Xp";
        console.log("xp");
    };
    $scope.CreepsFarmedUpdate = function() {
        var i = 0;
        while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
            ChartOverTimeData[i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[2].minionsKilled];
            i++;
        };

        $scope.InputOverTime = ChartOverTimeData;
        $scope.InputOverTime.text = "CreepCrore";
        console.log("xp");
        console.log("Creeps");
    };
    $scope.GoldGainedUpdate = function() {
        var i = 0;
        while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
            ChartOverTimeData[i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[2].totalGold];
            i++;
        };

        $scope.InputOverTime = ChartOverTimeData;
        $scope.InputOverTime.text = "Gold";
        console.log("xp");
        console.log("Gold");
    };
	$scope.UpdateCharts = function (textArray) {
		if(textArray[2]==0){
			textArray[1]=10;
		}
		
		if(textArray[0]=="R"){
			$scope.changeChartRight(textArray.split(':')[1]);
			$scope.$apply();
		}else{
			$scope.changeChartLeft(textArray.split(':')[1]);
			$scope.$apply();
		}
    };

}]);