angular
  .module('app')
  .controller('aboutCtrl', ['$scope', function($scope) {
    $scope.title = "About";
	$("#Hit_it").button().on("click", function() {
		var First; 
		First=getData();
	});
  }]);