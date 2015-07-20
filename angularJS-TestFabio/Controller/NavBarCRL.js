sampleApp.controller('NavBarCRL',['$scope', 'mySharedService', '$http','$window', function($scope,sharedService,$http,$window) {
	$scope.Input = [
        {SumName:$scope.SumName},
        {ServName:$scope.ServName}
    ];
	$scope.valid ={
			'SumInfo':0,
			'SumGames':0,
			'new1' :0
		};
	// When Hit-ItButton is Pressed.
	$scope.handleClick = function() {
		data1 = {
            'SumName_input' : angular.lowercase($scope.SumName),
            'ServerName_input' : $scope.ServName
        };
        $http.post('PHP/Cache_and_API_Request.php', {data1} ).
		success(function(data, status, config) {
			sharedService.prepForBroadcast($scope.valid);
			$scope.valid=data;
			//$scope.valid.new1++;
			})
		.error(function(data, status, headers, config) {
			alert("fail");
		});
		// when the Variable $scope.valid Changed, Checked if 0. If 0 then go to _Mistake.
		$scope.$watch('valid', function(newValue, oldValue) {
			if (newValue !== oldValue) {
				
				if($scope.valid.SumInfo != null){
					console.log($scope.valid);
					
					$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/RecentGames';
					
				}else{
					$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/Home';
				}	
			}
		},true);
		
    };
    
}]);
 