sampleApp.controller('NavBarCRL',['$scope', 'mySharedService', '$http','$window', function($scope,sharedService,$http,$window) {
	$scope.Input = [
        {SumName:$scope.SumName},
        {ServName:$scope.ServName}
    ];
	$scope.handleClick = function() {
	 data1 = {
            'SumName_input' : angular.lowercase($scope.SumName),
            'ServerName_input' : $scope.ServName
        };
        $http.post('PHP/Cache_and_API_Request.php', {data1} ).
		success(function(data, status, config) {
			sharedService.prepForBroadcast(data);
			})
		.error(function(data, status, headers, config) {
			alert("fail");
		});
    $window.location.href = 'http://127.0.0.1/Diplomarbeit/angularJS-TestFabio/#/RecentGames';
		
    };
    
}]);
 