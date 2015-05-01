var demoApp = angular.module('demo', ['demo.controllers', 'demo.services']);

demoApp.config(['$stateProvider', function($stateProvider) {
	$stateProvider

	.state('angulardemo', {
    	url: "/angulardemo",
    	abstract: true
    })

	.state('angular.inicio', {
    	url: "/inicio",
    	views: {
        	'demoContent' :{
          	templateUrl: "app/index.html"
        }
      }
    })
}]);

/*
sampleApp .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/addOrder', {
        templateUrl: 'templates/add-order.html',
        controller: 'AddOrderController'
      }).
      when('/showOrders', {
        templateUrl: 'templates/show-orders.html',
        controller: 'ShowOrdersController'
      }).
      otherwise({
        redirectTo: '/addOrder'
      });
  }]);
*/