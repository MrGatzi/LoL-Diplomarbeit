sampleApp.controller('RecentGamesCRL',['$scope', 'Data_RecentGames', function($scope,Data_RecentGames) {
    $scope.Data_RecentGames = Data_RecentGames;
	console.log($scope.Data_RecentGames);
	if($scope.Data_RecentGames.ReturnData!=0){
		alert("hallo");
	}
}]);
 