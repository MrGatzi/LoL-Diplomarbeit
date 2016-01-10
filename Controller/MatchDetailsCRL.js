MainController.controller('MatchDetailsCRL', ['$scope', '$routeParams', '$http', '$window',  function($scope, $routeParams, $http, $window) {
    /* Variable $scope.A
		Safes which Champions (The campions on the Left side of the OverTImeCHart) is selectet.
		true = not selectet
		false= selectet
		$scope.A[0]=1 Champion ...
	*/
	$scope.A = [true, true, true, true, true, true, true, true, true, true];
	//Minute Counter for TimeStampFunction
	var MinuteCounter=0;
	//Time Value for slider and Dummy
	var Time_value=0;
	//iFrequency= time for slider in milliseconds
	var iFrequency = 5000;
	// Varibale for setting the Slider on/off
	var myInterval = 1;
	//Flag that you can't press the playbutton twice
	var PlayFlag=0;
	//For the Slider all Frames are in there
	var AllFrames=[
	];
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
		'highestChart': {'taken':0}
    };
	//Dummy for Passing to PartCHart Right
    ToRight = {
        'physicalDamageDealt': 0,
		'highestChart': {'taken':0}
    };
	//Dummy to Init the MatchBoard
	$scope.MatchBoardDummy=[
	{
			 'ID': 99,
			 'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			 'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			 'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			 'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			 'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	},
	{
			 'ID': 0,
			 'Items':{
				'1':'.',
				'2':'.',
				'3':'.',
				'4':'.',
				'5':'.',
				'6':'.'
			 },
			'Kills':0,
			'Deaths':0,
			'Assists':0,
			'Level':0,
			'Minions':0,
			'teamId':0,
			'championId':0,
			'trinket':'.',
	}
	];
    // Main Function
	//try to get the Init Data like SumInfo ...
    $http.post('PHP/Cache_Match_Contents_Overview.php', {
        data1
    }).
    success(function(data, status, config) {
            $scope.GameInfoOverview = data;
            console.log($scope.GameInfoOverview);
            if ($scope.GameInfoOverview == 'Error') {
                //$window.location.href = 'http://www.matchupleague.com/#/errortmp';
				$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
            } else {
				// If you got the SumInfoData then try to get the GAmeDetails
                $http.post('PHP/Cache_MatchTimeline_ByMatchID.php', {
					data1
                }).
                success(function(data, status, config) {
                        $scope.GameInfoTimeLine = data;
						MatchBoardDummy=$scope.InitParticipantsForMatchBoard(data);
						$scope.CreateFrames(data);
                        console.log($scope.GameInfoTimeLine);
                        /*if($scope.GameInfoTimeLine=="null"){
                        	$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp'
                        };*/
						$http.post('PHP/Cache_Items_Lib.php', {
						}).
						success(function(data, status, config) {
							$scope.ItemInfo=data;
							console.log($scope.ItemInfo);
							console.log("succ");
							sortChamps();
							InitCharts();
							$scope.InitSlider();
							$scope.ShowGameDetails = false; //Hide LoadingSpinner Show Content
						})
						.error(function(data, status, headers, config) {
						//---------------------------ERROR FUCNTION EINFÜGEN !!!! ---------------------------------------------------------------------------
							console.log("ERROR IN PHP");
						});
                    })
                    .error(function(data, status, headers, config) {
                        //$window.location.href = 'http://www.matchupleague.com/#/errortmp';
						$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
                    });
            };
        })
        .error(function(data, status, headers, config) {
            //$window.location.href = 'http://www.matchupleague.com/#/errortmp';
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
		
		ToLeft.highestCharttaken = Math.max(ToLeft.physicalDamageTaken, ToLeft.magicDamageTaken, ToLeft.trueDamageTaken, ToRight.physicalDamageTaken, ToRight.magicDamageTaken, ToRight.trueDamageTaken);
        ToRight.highestCharttaken = ToLeft.highestCharttaken;
		ToLeft.highestChartdealt = Math.max(ToLeft.physicalDamageDealt, ToLeft.magicDamageDealt, ToLeft.trueDamageDealt,ToRight.physicalDamageDealt, ToRight.magicDamageDealt, ToRight.trueDamageDealt);
        ToRight.highestChartdealt = ToLeft.highestChartdealt;
		ToLeft.highestChartdealtChamp = Math.max(ToLeft.physicalDamageDealtToChampions, ToLeft.magicDamageDealtToChampions, ToLeft.trueDamageDealtToChampions,ToRight.physicalDamageDealtToChampions, ToRight.magicDamageDealtToChampions, ToRight.trueDamageDealtToChampions);
        ToRight.highestChartdealtChamp = ToLeft.highestChartdealtChamp;
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
		ToLeft.highestCharttaken = Math.max(ToLeft.physicalDamageTaken, ToLeft.magicDamageTaken, ToLeft.trueDamageTaken, ToRight.physicalDamageTaken, ToRight.magicDamageTaken, ToRight.trueDamageTaken);
        ToRight.highestCharttaken = ToLeft.highestCharttaken;
		ToLeft.highestChartdealt = Math.max(ToLeft.physicalDamageDealt, ToLeft.magicDamageDealt, ToLeft.trueDamageDealt,ToRight.physicalDamageDealt, ToRight.magicDamageDealt, ToRight.trueDamageDealt);
        ToRight.highestChartdealt = ToLeft.highestChartdealt;
		ToLeft.highestChartdealtChamp = Math.max(ToLeft.physicalDamageDealtToChampions, ToLeft.magicDamageDealtToChampions, ToLeft.trueDamageDealtToChampions,ToRight.physicalDamageDealtToChampions, ToRight.magicDamageDealtToChampions, ToRight.trueDamageDealtToChampions);
        ToRight.highestChartdealtChamp = ToLeft.highestChartdealtChamp;
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
        ToLeft.highestCharttaken = Math.max(ToLeft.physicalDamageTaken, ToLeft.magicDamageTaken, ToLeft.trueDamageTaken, ToRight.physicalDamageTaken, ToRight.magicDamageTaken, ToRight.trueDamageTaken);
        ToRight.highestCharttaken = ToLeft.highestCharttaken;
		ToLeft.highestChartdealt = Math.max(ToLeft.physicalDamageDealt, ToLeft.magicDamageDealt, ToLeft.trueDamageDealt,ToRight.physicalDamageDealt, ToRight.magicDamageDealt, ToRight.trueDamageDealt);
        ToRight.highestChartdealt = ToLeft.highestChartdealt;
		ToLeft.highestChartdealtChamp = Math.max(ToLeft.physicalDamageDealtToChampions, ToLeft.magicDamageDealtToChampions, ToLeft.trueDamageDealtToChampions,ToRight.physicalDamageDealtToChampions, ToRight.magicDamageDealtToChampions, ToRight.trueDamageDealtToChampions);
        ToRight.highestChartdealtChamp = ToLeft.highestChartdealtChamp;
        $scope.ShowLeft = ToLeft;
        $scope.ShowRight = ToRight;
    };
	//Function to sort the champion of each team so that your champion is always on the left side selected
	//your direct LaneOpponent is selcted on the right side
	// the other champions are moved into an array 
    var sortChamps = function() {

        var i = 0;
        var j = 0;
        var cnt = 0;
        var flag = 0;
        Friend = $scope.GameInfoOverview.teamId;
        console.log(Friend);
		//find out wich team you were
        if ($scope.GameInfoOverview.teamId == 100) {
            Enemy = 200;
			//find your own champion
            for (i = 0; i < 5; i++) {
                if ($scope.GameInfoOverview.championId == $scope.GameInfoTimeLine.participants[i].championId) {
                    $scope.leftplayerselected = $scope.GameInfoTimeLine.participants[i];
                    flag = i;
                }
            }
			//get your other team mates
            for (i = 0; i < 5; i++) {
                if (i != flag) {

                    $scope.othersleft[j] = $scope.GameInfoTimeLine.participants[i];
                    j++;
                }

            }
			//find out your lane opponent
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
			//If there is no lane opponent choose a random one
            if (cnt == 0) {

                $scope.rightplayerselected = $scope.GameInfoTimeLine.participants[5];
				//find other team mates on the other team
                for (i = 6; i < 10; i++) {

                    $scope.othersright[j] = $scope.GameInfoTimeLine.participants[i];
                    j++;
                }
				//find other team mates on the other team
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
			var Dummy = ['', ''];
            var ExistFlag = 0;
            var counti = 0;
			
            while (counti != $scope.InputOverTime.Lines.length) {
                if (participantId == $scope.InputOverTime.Lines[counti].PartID) {
                    ExistFlag = counti;
                }
                counti++;
            }
			if($scope.InputOverTime.Lines.length==1){
				var GameLenght=0;
				while(GameLenght!=$scope.InputOverTime.Lines[0].length){
					Dummy[GameLenght]=[GameLenght,0];
					GameLenght++;
				};
				$scope.InputOverTime.Lines.push(Dummy);
			}
            $scope.InputOverTime.Lines.splice(ExistFlag, 1);
			console.log($scope.InputOverTime.Lines)
        }
    };
	/* Function : InitParticipantsForMatchBoard()
		Input: GameTimeLine(API Callback)
		This Function will load the Dummy with the First Data to show on the Matchboard
	*/
    $scope.InitParticipantsForMatchBoard = function(GameTimeLine){
	var whileFlag=0;
		while(whileFlag<=GameTimeLine.participants.length-1){
			 $scope.MatchBoardDummy[whileFlag+1].championId=GameTimeLine.participants[whileFlag].championId;
			 $scope.MatchBoardDummy[whileFlag+1].ID=GameTimeLine.participants[whileFlag].participantId;
			 $scope.MatchBoardDummy[whileFlag+1].teamId=GameTimeLine.participants[whileFlag].teamId;
			whileFlag++;
		}
		console.log($scope.MatchBoardDummy);
	};
	/* Function : InitSlider()
		inittializ the Slider Div
	*/
    $scope.InitSlider = function(){
		$( "#slider" ).slider({
      value:0,
      min: 0,
      max: AllFrames[AllFrames.length-1].timestamp,
      step: 100,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
      }
    });
    $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
	};
	/* Function : TimeStampFunction()
		This function will be called every 50 ms.
		
	*/
	function TimeStampFunction(){
		if(AllFrames[Time_value].timestamp>=$( "#slider" ).slider( "option", "max" )){
			clearInterval(intervalID);
		};
		$scope.$apply(function () {
		//$( "#amount" ).val( $( "#slider" ).slider( "value" ) );
		//value = $( "#slider" ).slider( "option", "value" );
		Time_value++;
		//console.log(Time_value);
		if(typeof AllFrames[Time_value] != "undefined"){
		$( "#amount" ).val(AllFrames[Time_value].timestamp);
		$( "#slider" ).slider( "option", "value",AllFrames[Time_value].timestamp );
		if(AllFrames[Time_value].eventType=='CHAMPION_KILL'){
			//console.log(AllFrames[Time_value].timestamp);
			$scope.MatchBoardDummy[AllFrames[Time_value].killerId].Kills++;
			$scope.MatchBoardDummy[AllFrames[Time_value].victimId].Deaths++;
			if (typeof AllFrames[Time_value].assistingParticipantIds != "undefined") {
				$.each(AllFrames[Time_value].assistingParticipantIds,function( index, value ) {
					//console.log(Time_value);
					$scope.MatchBoardDummy[value].Assists++;
				});
			}
		};
		if(AllFrames[Time_value].eventType=='ITEM_PURCHASED'){
			var Item_while_Flag=0;
			var Out_of_while_FLag=0;
			$scope.DeleteBuiltItems(AllFrames[Time_value].itemId,AllFrames[Time_value].participantId);
			if($scope.CheckIfTrinket(AllFrames[Time_value].itemId)){
				$scope.MatchBoardDummy[AllFrames[Time_value].participantId].trinket=AllFrames[Time_value].itemId+".";
			}else{
				if($scope.CheckIfValidItem(AllFrames[Time_value].itemId)){
					while( Item_while_Flag<7 && Out_of_while_FLag==0){
						if($scope.MatchBoardDummy[AllFrames[Time_value].participantId].Items[Item_while_Flag]=='.'){
							$scope.MatchBoardDummy[AllFrames[Time_value].participantId].Items[Item_while_Flag]=AllFrames[Time_value].itemId+".";
							Out_of_while_FLag++;
						};
						Item_while_Flag++;
					};
				};
			};
		};
		if(AllFrames[Time_value].eventType=='ITEM_DESTROYED'){
			$scope.DestroyItem(AllFrames[Time_value].itemId,AllFrames[Time_value].participantId);
			
		};
		if(AllFrames[Time_value].eventType=='ITEM_UNDO'){
			console.log(AllFrames[Time_value]);
		};
			if(AllFrames[Time_value].timestamp>=60000*MinuteCounter){
				MinuteCounter++;
				$.each($scope.GameInfoTimeLine.timeline.frames[MinuteCounter].participantFrames ,function( index, value ) {
					$scope.MatchBoardDummy[value.participantId].Minions=value.minionsKilled+value.jungleMinionsKilled;
					$scope.MatchBoardDummy[value.participantId].Level=value.level;
				});
			};
		};
	});
		
	};
	/* Stops the TimeStampFunction when the button is pressed
	*/
	$( "#stop" ).click(function() {
		//$interval.cancel(intervalID);
		clearInterval(intervalID);
		PlayFlag=0;
	});
	/* starts the TimeStampFunction when the button is pressed
	*/
	$( "#play" ).click(function() {
		if(PlayFlag==0){
		intervalID = window.setInterval(TimeStampFunction, 10);
		//intervalID = $interval(TimeStampFunction, 100);
		PlayFlag=1;
		}
	});
	/* Function : CreateFrames()
		creates a FrameArray for the Timeline
	*/
	$scope.CreateFrames = function(GameTimeLine_ForFrames){
		var Events=0;
		var Minutes=1;
		while(Minutes<=GameTimeLine_ForFrames.timeline.frames.length-1){
			while(Events<=GameTimeLine_ForFrames.timeline.frames[Minutes].events.length-1){
				console.log(GameTimeLine_ForFrames.timeline.frames[Minutes].events[Events]);
				AllFrames.push(GameTimeLine_ForFrames.timeline.frames[Minutes].events[Events]);
				Events++;
			}
			Minutes++;
			Events=0;
		}
		console.log(AllFrames);
	};
	/* Function : CheckIfValidItem()
		checks if the Item is consumable if then return false
	*/
	$scope.CheckIfValidItem= function(ItemID){
		var returnflag=true;
		if(ItemID==2003||ItemID==2004||ItemID==2009||ItemID==2010||ItemID==2043||ItemID==2044||ItemID==2052||ItemID==2054||ItemID==2137||ItemID==2138||ItemID==2139||ItemID==2140){
			returnflag=false;
		};
		return returnflag;
	};
	/* Function : CheckIfTrinket()
		checks if the Item is a trinket and if return true
	*/
	$scope.CheckIfTrinket= function(ItemID){
		var returnflag=false;
		if(ItemID==3340||ItemID==3341||ItemID==3342||ItemID==3361||ItemID==3362||ItemID==3363||ItemID==3364){
			returnflag=true;
		};
		return returnflag;
	};
	/* Function : DeleteBuiltItems()
		delets all Items that ed to be deleted inorder to buy an new item
	*/
	$scope.DeleteBuiltItems= function(ItemID,OwnerID){
		var while_Flag=0;
		var while_item_Flag=1;
		if (typeof $scope.ItemInfo.data[ItemID].from != "undefined") {
			while(while_Flag!=$scope.ItemInfo.data[ItemID].from.length){
				while(while_item_Flag<7){
					if($scope.MatchBoardDummy[OwnerID].Items[while_item_Flag]==($scope.ItemInfo.data[ItemID].from[while_Flag]+".")){
						$scope.MatchBoardDummy[OwnerID].Items[while_item_Flag]=".";
					};
					while_item_Flag++;
				};
				while_Flag++;
			};
			
		};
	};
	/* Function : DestroyItem()
		delets the Item from the right owner
	*/
	$scope.DestroyItem= function(ItemID,OwnerID){
		var while_item_Flag=1;
		var Out_of_while_Flag=0;
		while(while_item_Flag<7&&Out_of_while_Flag<=0){
			if($scope.MatchBoardDummy[OwnerID].Items[while_item_Flag]==(ItemID+".")){
				$scope.MatchBoardDummy[OwnerID].Items[while_item_Flag]=".";
				Out_of_while_Flag++;
			};
			while_item_Flag++;
		};
	};
}]);