//Define an angular module for our app
var MainController = angular.module('MainController', ['ui.bootstrap']);

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
MainController.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/RecentGames/:sumName/:servName', {
            templateUrl: 'templates/RecentGames.html',
            controller: 'RecentGamesCRL'
        }).
        when('/GameDetails/:sumName/:servName/:MatchID', {
            templateUrl: 'templates/GameDetails.html',
            controller: 'GameDetailsCRL'
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