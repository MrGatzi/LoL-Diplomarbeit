MainController.controller('NavBarCRL',['$scope', '$http','$window', function($scope,$http,$window,$routeParams) {
	$scope.Input = [
        {SumName:$scope.SumName},
        {ServName:$scope.ServName}
    ];
	 $scope.ServerOptions = [
    { name: 'EUW', value: 'euw' }, 
    { name: 'NA', value: 'na' }, 
    { name: 'Ru', value: 'ru' },
	{ name: 'EUE', value: 'eue' }
    ];
	$scope.ServName = {type : $scope.ServerOptions[0].value};
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
            'ServerName_input' : $scope.ServName.type
        };
		console.log(data1);
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
					//$window.location.href = 'http://www.matchupleague.com/#/RecentMatches/'+$scope.valid.Name+'/'+$scope.valid.Server;
					$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/RecentMatches/'+$scope.valid.Name+'/'+$scope.valid.Server.type;
					
				}else{
					//$window.location.href = 'http://www.matchupleague.com/#/errortmp';
					$window.location.href = 'http://127.0.0.1/LoL-Diplomarbeit/#/errortmp';
				}	
		}
		},true);
    
}]);
 