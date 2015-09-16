MainController.controller('NavBarCRL',['$scope', '$http','$window', function($scope,$http,$window,$routeParams) {
	$scope.Input = [
        {SumName:$scope.SumName},
        {ServName:$scope.ServName}
    ];
	$scope.valid ={
			'SumInfo':0,
			'SumGames':0,
			'Name':angular.lowercase($scope.SumName),
			'Server': $scope.ServName,
		};
	// When Hit-ItButton is Pressed.
	$scope.handleClick = function() {	
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
    };
	
	
	$scope.$watch('valid', function(newValue, oldValue) {
		if(newValue!=oldValue){
				if($scope.valid.SumInfo != null){
					$scope.valid.Name=angular.lowercase($scope.SumName);
					$scope.valid.Server=$scope.ServName;
					$window.location.href = 'http://www.matchupleague.com/#/RecentMatches/'+$scope.valid.Name+'/'+$scope.valid.Server;
					
				}else{
					$window.location.href = 'http://www.matchupleague.com/#/errortmp';
				}	
		}
		},true);
    
}]);
 