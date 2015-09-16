//Define an angular module for our app
var MainController = angular.module('MainController', ['ui.bootstrap']);

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
MainController.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/RecentMatches/:sumName/:servName', {
            templateUrl: 'templates/RecentMatches.html',
            controller: 'RecentMatchesCRL'
        }).
        when('/MatchDetails/:sumName/:servName/:MatchID', {
            templateUrl: 'templates/MatchDetails.html',
            controller: 'MatchDetailsCRL'
        }).
        when('/Home', {
            templateUrl: 'templates/home.html',
            controller: 'HomeCRL'
        }).
        when('/errortmp', {
            templateUrl: 'templates/errortmp.html',
            controller: 'HomeCRL'
        }).
        when('/About', {
            templateUrl: 'templates/About.html',
            controller: 'AboutCRL'
        }).
		when('/Contact', {
            templateUrl: 'templates/Contact.html',
            controller: 'ContaktCRL'
        }).
        otherwise({
            redirectTo: '/Home'
        });
    }
]);