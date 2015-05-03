(function(){
	var app = angular.module('demoapp', ['ngRoute', 'appServices']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        		// Rutas de vistas
                when('/inicio', {templateUrl: 'inicio.html',   controller: 'HomeCtrl'}).
                when('/descripcion', {templateUrl: 'descripcion.html',   controller: 'HomeCtrl'}).
                when('/porque', {templateUrl: 'porque.html',   controller: 'HomeCtrl'}).
                when('/arquitectura', {templateUrl: 'arquitectura.html',   controller: 'HomeCtrl'}).
                when('/introduccion', {templateUrl: 'introduccion.html',   controller: 'HomeCtrl'}).
                when('/integrantes', {templateUrl: 'inicio.html',   controller: 'HomeCtrl'}).
                when('/tabla-contenido', {templateUrl: 'tabla.html',   controller: 'HomeCtrl'}).
                when('/ventajas', {templateUrl: 'ventaja.html',   controller: 'HomeCtrl'}).
                when('/desventajas', {templateUrl: 'desventajas.html',   controller: 'HomeCtrl'}).
                when('/material', {templateUrl: 'material.html',   controller: 'HomeCtrl'}).
                when('/comparacion', {templateUrl: 'comparacion.html',   controller: 'HomeCtrl'}).
                when('/referencias', {templateUrl: 'referencias.html',   controller: 'HomeCtrl'}).
                when('/demo', {templateUrl: 'demo.html',   controller: 'DemoCtrl'}).
                // Otras rutas
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
	    Page.setTitle("Bienvenido");
	});

	app.controller('DemoCtrl', function($scope, Page) {
	    Page.setTitle("AngularJS Demo");
	    this.mensaje = "Hola Mundito!";
	});

	var app = angular.module('appServices', []);

	app.factory('Page', function($rootScope) {
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
})();