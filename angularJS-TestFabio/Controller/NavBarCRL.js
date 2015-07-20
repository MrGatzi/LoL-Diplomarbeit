sampleApp.controller('NavBarCRL',['$scope', 'mySharedService', '$http','$window', function($scope,sharedService,$http,$window) {
	$scope.Input = [
        {SumName:$scope.SumName},
        {ServName:$scope.ServName}
    ];
	$scope.handleClick = function() {
		$scope.valid ={
			'SumInfo':0,
			'SumGames':0
		};
		data1 = {
            'SumName_input' : angular.lowercase($scope.SumName),
            'ServerName_input' : $scope.ServName
        };
        $http.post('PHP/Cache_and_API_Request.php', {data1} ).
		success(function(data, status, config) {
			$scope.valid=data;
			sharedService.prepForBroadcast(data);
			})
		.error(function(data, status, headers, config) {
			alert("fail");
		});
		//console.log($scope.valid);
		/*$scope.$watch('valid', function() {
		alert('hey, valid has changed!');
		});
		/*if($scope.valid.SumInfo == null){
			
		}else{
			$window.location.href = 'http://127.0.0.1/Diplomarbeit/angularJS-TestFabio/#/RecentGames';
		}*/
		$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/angularJS-TestFabio/#/RecentGames';
		
    };
    
}]);
 