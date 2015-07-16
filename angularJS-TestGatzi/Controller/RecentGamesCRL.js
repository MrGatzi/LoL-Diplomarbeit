sampleApp.controller('RecentGamesCRL',['$scope', 'mySharedService', function($scope,sharedService) {
     $scope.$on('handleBroadcast', function() {
        $scope.message =sharedService.message;
		console.log($scope.message)
    });
}]);
 