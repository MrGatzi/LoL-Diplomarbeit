angular
  .module('app')
  .controller('aboutCtrl', ['$scope', function($scope) {
    $scope.title = "About";
	$scope.click=function(){
		alert("hey");
	}

  }]);