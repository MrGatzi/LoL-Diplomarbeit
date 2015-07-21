sampleApp.controller('NavBarCRL',['$scope', 'mySharedService', '$http','$window', function($scope,sharedService,$http,$window) {
	$scope.Input = [
        {SumName:$scope.SumName},
        {ServName:$scope.ServName}
    ];
	$scope.valid ={
			'SumInfo':0,
			'SumGames':0,
			'Name':angular.lowercase($scope.SumName),
		};
	// When Hit-ItButton is Pressed.
	$scope.handleClick = function() {
		//$scope.valid=0; --> zurücksetzten
		data1 = {
            'SumName_input' : angular.lowercase($scope.SumName),
            'ServerName_input' : $scope.ServName
        };
        $http.post('PHP/Cache_and_API_Request.php', {data1} ).
		success(function(data, status, config) {
			$scope.valid=data;
			})
		.error(function(data, status, headers, config) {
			alert("fail");
		});
		// when the Variable $scope.valid Changed, Checked if 0. If 0 then go to _Mistake.
		
    };
	$scope.$watch('valid', function(newValue, oldValue) {
		if(newValue!=oldValue){
				if($scope.valid.SumInfo != null){
					$scope.valid.Name=angular.lowercase($scope.SumName);
					sharedService.prepForBroadcast($scope.valid);
					$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/RecentGames';
					
				}else{
					$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/errortmp';
				}	
		}
		},true);
    
}]);
 