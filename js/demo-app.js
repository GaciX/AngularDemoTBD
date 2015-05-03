(function(){
	var app = angular.module('demoapp', ['ngRoute', 'appServices']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
                when('/inicio', {templateUrl: 'inicio.html',   controller: 'HomeCtrl'}).
                when('/descripcion', {templateUrl: 'descripcion.html',   controller: 'HomeCtrl'}).
                when('/porque', {templateUrl: 'porque.html',   controller: 'HomeCtrl'}).
                when('/arquitectura', {templateUrl: 'arquitectura.html',   controller: 'HomeCtrl'}).
                //when('/inicio', {templateUrl: 'index.html',   controller: 'HomeCtrl'}).
                //when('/inicio', {templateUrl: 'index.html',   controller: 'HomeCtrl'}).
                when('/list', {templateUrl: 'list.html',   controller: 'ListCtrl'}).
                when('/detail/:itemId', {templateUrl: 'detail.html',   controller: 'DetailCtrl'}).
                when('/settings', {templateUrl: 'settings.html',   controller: 'SettingsCtrl'}).
                otherwise({redirectTo: '/inicio'});
	}]);

	app.controller('MainCtrl', function($scope, Page) {
	    console.log(Page);
	    $scope.page= Page; 
	});

	app.controller('HomeCtrl', function($scope, Page) {
	    Page.setTitle("Welcome");
	});

	var app = angular.module('appServices', []);

	app.factory('Page', function($rootScope){
	            var pageTitle = "Untitled";
	            return {
	                title:function(){
	                    return pageTitle;
	                },
	                setTitle:function(newTitle){
	                    pageTitle = newTitle;
	                }
	            }
	        });


	/*
	var app = angular.module('demoapp', [], function($routeProvider, $locationProvider) {
	  $routeProvider.when('/inicio', {
	    templateUrl: '/index.html',
	    controller: HomeController
	  });
	  $routeProvider.otherwise( { redirectTo: '/inicio'} );

	  // configure html5 to get links working
	  // If you don't do this, you URLs will be base.com/#/home rather than base.com/home
	  $locationProvider.html5Mode(true);
	});*/

	/*app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider

		.state('inicio', {
	        url:'/',
	        templateUrl: 'inicio.html'
	        //controller: 'ControladorPrincipal'
	    })

		$urlRouterProvider.otherwise('/');
	}]);*/

	/*var cam = "a";
    var test = "Hola Mundo!"

	app.controller('ControladorJSON', ['$scope', '$http', function($scope, $http) {
		//$scope.camaras = cam;
		this.texto = cam;
		var cams = this;

		console.log("holiwi");
		$http.get('json/canon_cameras.json').
			success(function(data, status, headers, config) {
			  // this callback will be called asynchronously
			  // when the response is available
			  console.log(status);
			  cams = angular.fromJson(cams);
			  
			}).
			error(function(data, status, headers, config) {
			  // called asynchronously if an error occurs
			  // or server returns response with an error status.
			  console.log(status);
			});
	}]);*/
})();