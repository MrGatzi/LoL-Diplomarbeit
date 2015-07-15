//Define an angular module for our app
var sampleApp = angular.module('sampleApp', []);
 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/RecentGames', {
        templateUrl: 'templates/RecentGames.html',
        controller: 'RecentGamesCRL'
    }).
      when('/Home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCRL'
      }).
      when('/About', {
        templateUrl: 'templates/About.html',
        controller: 'AboutCRL'
      }).
      otherwise({
        redirectTo: '/'
      });
}]); 

sampleApp.service('Data_RecentGames', function() {
	this.ReturnData=0;
    });
