sampleApp.controller('RecentGamesCRL',['$scope', 'Data_RecentGames', function($scope,Data_RecentGames) {
    $scope.Data_RecentGames = Data_RecentGames.getData();
	console.log($scope.Data_RecentGames);
}]);
 