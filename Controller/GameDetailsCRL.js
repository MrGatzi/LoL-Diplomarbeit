sampleApp.controller('GameDetailsCRL', ['$scope', '$routeParams', '$http', '$window', function($scope, $routeParams, $http, $window) {
    /* Variable $scope.A
		Safes which Champions (The campions on the Left side of the OverTImeCHart) is selectet.
		true = not selectet
		false= selectet
		$scope.A[0]=1 Champion ...
	*/
	$scope.A = [true, true, true, true, true, true, true, true, true, true];
	/*Variable Friend/Enemy 
		Determinds if an ally is an Friend or an Enemy. 
		One of them has to be 100 the other 200
	*/
    var Friend = 000;
    var Enemy = 000;
    var CurrenChart = 0; //0 -> Minions| 1-> Gold | 2 -> Xp
	/*
		Flag for the Spinner.
	*/
    $scope.ShowGameDetails = true;
	/*
		Variable : $scope.InputOverTime
		The Pass Variable to OverTimeChart
	*/
    $scope.InputOverTime = {
        'Lines': []
    };
    $scope.InputOverTime.Lines[0] = ['A', 'A'];
    $scope.othersleft = ['0', '0'];
    $scope.othersright = ['0', '0'];
	// Getting the Data from the URL
    data1 = {
        'SumName': $routeParams.sumName,
        'ServName': $routeParams.servName,
        'MatchId': $routeParams.MatchID,
        'Mode': 'get'
    };
	//Dummy for Passing to PartCHart Left
    ToLeft = {
        'physicalDamageDealt': 0,
    };
	//Dummy for Passing to PartCHart Right
    ToRight = {
        'physicalDamageDealt': 0,
    };
	
    // Main Function
	//try to get the Init Data like SumInfo ...
    $http.post('PHP/Cache_Game_Contents_Overview.php', {
        data1
    }).
    success(function(data, status, config) {
            $scope.GameInfoOverview = data;
            console.log($scope.GameInfoOverview);
            if ($scope.GameInfoOverview == 'Error') {
                $window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
            } else {
				// If you got the SumInfoData then try to get the GAmeDetails
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
                        sortChamps();
                        InitCharts();

                        $scope.ShowGameDetails = false; //Hide LoadingSpinner Show Content
                    })
                    .error(function(data, status, headers, config) {
                        $window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
                    });
            };
        })
        .error(function(data, status, headers, config) {
            $window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
        });
/* 	Function InitCharts()

	Will be called on the Beginning. Init both charts with the selectet Player Right and left.
*/	
    var InitCharts = function() {
        console.log();
        $scope.A[$scope.leftplayerselected.participantId - 1] = false;
        $scope.A[$scope.rightplayerselected.participantId - 1] = false;
        ToLeft = $scope.GameInfoTimeLine.participants[$scope.leftplayerselected.participantId - 1].stats;

        ToRight = $scope.GameInfoTimeLine.participants[$scope.rightplayerselected.participantId - 1].stats;

        var highestLeft = Math.max(ToLeft.physicalDamageDealt, ToLeft.magicDamageDealt, ToLeft.physicalDamageDealtToChampions, ToLeft.physicalDamageTaken, ToLeft.magicDamageDealtToChampions, ToLeft.magicDamageTaken, ToLeft.trueDamageDealt, ToLeft.trueDamageDealtToChampions, ToLeft.trueDamageTaken);
        var highestRight = Math.max(ToRight.physicalDamageDealt, ToRight.magicDamageDealt, ToRight.physicalDamageDealtToChampions, ToRight.physicalDamageTaken, ToRight.magicDamageDealtToChampions, ToRight.magicDamageTaken, ToRight.trueDamageDealt, ToRight.trueDamageDealtToChampions, ToRight.trueDamageTaken);
        ToLeft.highestChart = Math.max(highestLeft, highestRight);
        ToRight.highestChart = ToLeft.highestChart;
        $scope.ShowLeft = ToLeft;
        $scope.ShowRight = ToRight;
        $scope.ChartOverTimeUpdate($scope.leftplayerselected.participantId, "draw", $scope.leftplayerselected.teamId);
        $scope.ChartOverTimeUpdate($scope.rightplayerselected.participantId, "draw", $scope.rightplayerselected.teamId);
    };
/* 	Function changeChartLeft()

	UpdateFunction for the LeftBarCHart
	Input : part (Partisipant Id to Show stats in the BarCHarts)
	Load the Dummy with the stats(from the Participant) Data of the Timline.
	Find The HighestData und Load it into the right und left Chart.
*/
    $scope.changeChartLeft = function(part) {
        ToLeft = $scope.GameInfoTimeLine.participants[part].stats;
        var highestLeft = Math.max(ToLeft.physicalDamageDealt, ToLeft.magicDamageDealt, ToLeft.physicalDamageDealtToChampions, ToLeft.physicalDamageTaken, ToLeft.magicDamageDealtToChampions, ToLeft.magicDamageTaken, ToLeft.trueDamageDealt, ToLeft.trueDamageDealtToChampions, ToLeft.trueDamageTaken);
        var highestRight = Math.max(ToRight.physicalDamageDealt, ToRight.magicDamageDealt, ToRight.physicalDamageDealtToChampions, ToRight.physicalDamageTaken, ToRight.magicDamageDealtToChampions, ToRight.magicDamageTaken, ToRight.trueDamageDealt, ToRight.trueDamageDealtToChampions, ToRight.trueDamageTaken);
        ToLeft.highestChart = Math.max(highestLeft, highestRight);
        ToRight.highestChart = ToLeft.highestChart;
        $scope.ShowLeft = ToLeft;
        $scope.ShowRight = ToRight;

    };
/* 	Function changeChartRight()

	UpdateFunction for the RightBarCHart
	Input : part (Partisipant Id to Show stats in the BarCHarts)
	Load the Dummy with the stats(from the Participant) Data of the Timline.
	Find The HighestData und Load it into the right und left Chart.
*/
    $scope.changeChartRight = function(part) {
        ToRight = $scope.GameInfoTimeLine.participants[part].stats;
        var highestLeft = Math.max(ToLeft.physicalDamageDealt, ToLeft.magicDamageDealt, ToLeft.physicalDamageDealtToChampions, ToLeft.physicalDamageTaken, ToLeft.magicDamageDealtToChampions, ToLeft.magicDamageTaken, ToLeft.trueDamageDealt, ToLeft.trueDamageDealtToChampions, ToLeft.trueDamageTaken);
        var highestRight = Math.max(ToRight.physicalDamageDealt, ToRight.magicDamageDealt, ToRight.physicalDamageDealtToChampions, ToRight.physicalDamageTaken, ToRight.magicDamageDealtToChampions, ToRight.magicDamageTaken, ToRight.trueDamageDealt, ToRight.trueDamageDealtToChampions, ToRight.trueDamageTaken);
        ToLeft.highestChart = Math.max(highestLeft, highestRight);
        ToRight.highestChart = ToLeft.highestChart;
        $scope.ShowLeft = ToLeft;
        $scope.ShowRight = ToRight;
    };

    var sortChamps = function() {

        var i = 0;
        var j = 0;
        var cnt = 0;
        var flag = 0;
        Friend = $scope.GameInfoOverview.teamId;
        console.log(Friend);
        if ($scope.GameInfoOverview.teamId == 100) {
            Enemy = 200;
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
            Enemy = 100;
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
/* 	Function XpGainedUpdate()

	Input : ----
	Set the ChartMarker on 2 (stands for XP)
	Create a Dummy.
	Check how much Lines have to be changed to XP.
	Change the existing lines to Xp-Lines and write them into the dummy
	Delete all the not-used DummySpace and send them to the Chart-Directiv
*/
    $scope.XpGainedUpdate = function() {
        CurrenChart = 2;
        var Dummy = {
            'Lines': []
        };
        Dummy.Lines[0] = ['A', 'A'];
        Dummy.Lines[1] = ['A', 'A'];
        Dummy.Lines[2] = ['A', 'A'];
        Dummy.Lines[3] = ['A', 'A'];
        Dummy.Lines[4] = ['A', 'A'];
        Dummy.Lines[5] = ['A', 'A'];
        Dummy.Lines[6] = ['A', 'A'];
        Dummy.Lines[7] = ['A', 'A'];
        Dummy.Lines[8] = ['A', 'A'];
        Dummy.Lines[9] = ['A', 'A'];
        var Participants = ['0']
        var i = 0;
        while (i != $scope.InputOverTime.Lines.length) {
            Participants[i] = $scope.InputOverTime.Lines[i].PartID
            i++;
        }
        i = 0;
        var j = 0;
        while (j != Participants.length) {
            while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
                Dummy.Lines[j][i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[Participants[j]].xp];
                i++;
            };
            Dummy.Lines[j].PartID = $scope.InputOverTime.Lines[j].PartID;
            Dummy.Lines[j].color = $scope.InputOverTime.Lines[j].color;
            i = 0;
            j++;
        }
        Dummy.Lines.splice(j, 10 - j);
        Dummy.text = "XP";
        $scope.InputOverTime = Dummy;
        console.log(Dummy);
    };
/* 	Function CreepsFarmedUpdate()

	Input : ----
	Set the ChartMarker on 0 (stands for Minions)
	Create a Dummy.
	Check how much Lines have to be changed to Minions.
	Change the existing lines to Minions-Lines and write them into the dummy
	Delete all the not-used DummySpace and send them to the Chart-Directiv
*/
    $scope.CreepsFarmedUpdate = function() {
        CurrenChart = 0;
        var Dummy = {
            'Lines': []
        };
        Dummy.Lines[0] = ['A', 'A'];
        Dummy.Lines[1] = ['A', 'A'];
        Dummy.Lines[2] = ['A', 'A'];
        Dummy.Lines[3] = ['A', 'A'];
        Dummy.Lines[4] = ['A', 'A'];
        Dummy.Lines[5] = ['A', 'A'];
        Dummy.Lines[6] = ['A', 'A'];
        Dummy.Lines[7] = ['A', 'A'];
        Dummy.Lines[8] = ['A', 'A'];
        Dummy.Lines[9] = ['A', 'A'];
        var Participants = ['0']
        var i = 0;
        while (i != $scope.InputOverTime.Lines.length) {
            Participants[i] = $scope.InputOverTime.Lines[i].PartID
            i++;
        }
        i = 0;
        var j = 0;
        while (j != Participants.length) {
            while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
                Dummy.Lines[j][i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[Participants[j]].minionsKilled];
                i++;
            };
            Dummy.Lines[j].PartID = $scope.InputOverTime.Lines[j].PartID;
            Dummy.Lines[j].color = $scope.InputOverTime.Lines[j].color;
            i = 0;
            j++;
        }
        Dummy.Lines.splice(j, 10 - j);
        Dummy.text = "Minions";
        $scope.InputOverTime = Dummy;
        console.log(Dummy);
    };
/* 	Function GoldGainedUpdate()

	Input : ----
	Set the ChartMarker on 1 (stands for Gold)
	Create a Dummy.
	Check how much Lines have to be changed to Gold.
	Change the existing lines to Gold-Lines and write them into the dummy
	Delete all the not-used DummySpace and send them to the Chart-Directiv
*/
    $scope.GoldGainedUpdate = function() {
        CurrenChart = 1;
        var Dummy = {
            'Lines': []
        };
        Dummy.Lines[0] = ['A', 'A'];
        Dummy.Lines[1] = ['A', 'A'];
        Dummy.Lines[2] = ['A', 'A'];
        Dummy.Lines[3] = ['A', 'A'];
        Dummy.Lines[4] = ['A', 'A'];
        Dummy.Lines[5] = ['A', 'A'];
        Dummy.Lines[6] = ['A', 'A'];
        Dummy.Lines[7] = ['A', 'A'];
        Dummy.Lines[8] = ['A', 'A'];
        Dummy.Lines[9] = ['A', 'A'];
        var Participants = ['0']
        var i = 0;
        while (i != $scope.InputOverTime.Lines.length) {
            Participants[i] = $scope.InputOverTime.Lines[i].PartID
            i++;
        }
        i = 0;
        var j = 0;
        while (j != Participants.length) {
            while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
                Dummy.Lines[j][i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[Participants[j]].totalGold];
                i++;
            };
            Dummy.Lines[j].PartID = $scope.InputOverTime.Lines[j].PartID;
            Dummy.Lines[j].color = $scope.InputOverTime.Lines[j].color;
            i = 0;
            j++;
        }
        Dummy.Lines.splice(j, 10 - j);
        Dummy.text = "Gold";
        $scope.InputOverTime = Dummy;
        console.log(Dummy);
    };
/*Funktion UpdateCharts()
	Input :  textArray z.b : R3 (stands for : RightSide Participant 3)
			if first Letter is R call .changeChartRight(Participnat)
			if first Letter is L call .changeChartLeft(Participnat)
*/
    $scope.UpdateCharts = function(textArray) {
        if (textArray[2] == 0) {
            textArray[1] = 10;
        }

        if (textArray[0] == "R") {
            $scope.changeChartRight(textArray.split(':')[1]);
            $scope.$apply();
        } else {
            $scope.changeChartLeft(textArray.split(':')[1]);
            $scope.$apply();
        }
    };
/* Function : ChampSelectForTimeCharts()

	Input: 	Index of the Player how was clicked (Right side of OverTimeCHarts)
			team of the Player
	If the team is 200 then the index will be add 5 cause the index of the palyer always goes form 5 to 10.
	the marker for the position will be toggelt.
	If the marker is true afterwards then Option should be "remove"
	call ChartOverTimeUpdate();
*/
    $scope.ChampSelectForTimeCharts = function(index, team) {
        if (team == 200) {
            index = index + 5;
        };

        $scope.A[index] = !$scope.A[index];
        ParticipantIdToDraw = index + 1;
        OptionToUpdate = "draw";
        if ($scope.A[index]) {
            OptionToUpdate = "remove";
        }
        $scope.ChartOverTimeUpdate(ParticipantIdToDraw, OptionToUpdate, team);
    };

    $scope.Hide = function(index, team) {
        if (team == 200) {
            index = index + 5;
        };

        return $scope.A[index];
    };
/* Function : ChartOverTimeUpdate()
	
	Input: ParticipantId (which player schould be drawn or removed)
			Option (draw or remove)
			team (100 or 200)
	It will check if it has to draw a Line or remove one.
	By "draw" it will check if the Participant already exist if so then it does nothing
	It will Check the variable "CurrentChart" which data it schould load into the Dummy
	The Dummy will be pushed in the d3-lines Array on the end.
	
	By "remove"  it will check if the Participant even exist in the d3-line Array and if where
	Just a simple splice in the end.
*/
    $scope.ChartOverTimeUpdate = function(participantId, option, team) {

        if (option == "draw") {
            var ExistFlag = 0;
            var counti = 0;
            while (counti != $scope.InputOverTime.Lines.length) {
                if (participantId == $scope.InputOverTime.Lines[counti].PartID) {
                    ExistFlag++;
                }
                counti++;
            }
            if (ExistFlag == 0) {
                var Dummy = ['', ''];
                var i = 0;
                while (i < $scope.GameInfoTimeLine.timeline.frames.length) {
                    if (CurrenChart == 0) {
                        Dummy[i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[participantId].minionsKilled];
                    }
                    if (CurrenChart == 1) {
                        Dummy[i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[participantId].totalGold];
                    }
                    if (CurrenChart == 2) {
                        Dummy[i] = [i, $scope.GameInfoTimeLine.timeline.frames[i].participantFrames[participantId].xp];
                    }
                    i++;
                };
                if (team == Friend) {
                    Dummy.color = "green";
                } else {
                    Dummy.color = "red";
                };
                if ($scope.InputOverTime.Lines[0][0] == 'A') {
                    $scope.InputOverTime.Lines.splice(0, 1);
                    $scope.InputOverTime.text = "Minions";
                }
                Dummy.PartID = participantId;
                $scope.InputOverTime.Lines.push(Dummy);
            };
        }
        if (option == "remove") {
            console.log($scope.InputOverTime);
            var ExistFlag = 0;
            var counti = 0;
            while (counti != $scope.InputOverTime.Lines.length) {
                if (participantId == $scope.InputOverTime.Lines[counti].PartID) {
                    ExistFlag = counti;
                }
                counti++;
            }
            $scope.InputOverTime.Lines.splice(ExistFlag, 1);
            console.log($scope.InputOverTime.Lines);
        }
    };
}]);