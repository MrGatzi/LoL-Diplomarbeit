/*function NavBarCRL($scope, $http) {
    $scope.Input = [
        {SumName:''},
        {ServName:''}
    ];
    $scope.addTodo = function () {
		 data1 = {
            'SumName_input' : angular.lowercase($scope.Input.SumName),
            'ServerName_input' : $scope.Input.ServName
        };
        $http.post('PHP/Cache_and_API_Request.php', {data1} ).
		success(function(data, status, config) {
			alert(data.SumInfo);
			}).
			error(function(data, status, headers, config) {
			alert("fail");
		});
    };
}*/
sampleApp.controller('NavBarCRL',['$scope', 'Data_RecentGames', '$http', function($scope,Data_RecentGames,$http) {
    $scope.Data_RecentGames=Data_RecentGames;
	$scope.Input = [
        {SumName:$scope.Data_RecentGames.SumName},
        {ServName:$scope.Data_RecentGames.ServName}
    ];
	
    $scope.addTodo = function () {
		 data1 = {
            'SumName_input' : angular.lowercase($scope.Data_RecentGames.SumName),
            'ServerName_input' : $scope.Data_RecentGames.ServName
        };
        $http.post('PHP/Cache_and_API_Request.php', {data1} ).
		success(function(data, status, config) {
			Data_RecentGames.setDataRecentGames(data);
			}).
			error(function(data, status, headers, config) {
			alert("fail");
		});
    };
}]);
 