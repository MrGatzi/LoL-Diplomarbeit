sampleApp.controller('NavBarCRL',['$scope', 'mySharedService', '$http', function($scope,sharedService,$http) {
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
			}).
			error(function(data, status, headers, config) {
			alert("fail");
		});
        
    };
    
}]);
 