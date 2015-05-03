(function(){
	var app = angular.module('demoapp', ['ngRoute', 'uiGmapgoogle-maps', 'appServices']);

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
                when('/demo1', {templateUrl: 'demo1.html',   controller: 'MapaCtrl'}).
                when('/demo2', {templateUrl: 'demo2.html',   controller: 'FormCtrl'}).
                when('/demo2a/:marca', {templateUrl: 'demo2a.html',   controller: 'JsonCtrl'}).
                when('/demo2b/:marca', {templateUrl: 'demo2b.html',   controller: 'JsonCtrl'}).
                // Otras rutas
                otherwise({redirectTo: '/inicio'});
	}]);


    app.controller('MainCtrl', function($scope, Page) {
	    //console.log(Page);
	    $scope.page = Page; 
	});

	app.controller('HomeCtrl', function($scope, Page) {
	    Page.setTitle("Bienvenido");
	});

	app.controller('DemoCtrl', function($scope, Page) {
	    Page.setTitle("AngularJS Demo");
	    this.mensaje = "Haz click en uno de los Demos para cargarlo:";
    });

    var marca = null;

    var lugares = [
        {
            lugar : 'Sala 517',
            desc : 'Sala de Clases de TBD',
            lat : -33.4499596331,
            long : -70.686739789
        },
        {
            lugar : 'Casa Central',
            desc : 'Gobierno Central de la USACH',
            lat : -33.4489122671,
            long : -70.6827862129
        },
        {
            lugar : 'Frontis',
            desc : 'Lugar de actos y manifestaciones simbólicas',
            lat : -33.450725008,
            long : -70.6799484358
        },
        {
            lugar : 'DIINF USACH',
            desc : 'Departamento de Ingeniería Infomática',
            lat : -33.449686603,
            long : -70.6872333155
        },
        {
            lugar : 'PAIEP USACH',
            desc : 'Lugar de encuentro para cachorros',
            lat : -33.4496731753,
            long : -70.6850768194
        },
        {
            lugar : 'Biblioteca Central',
            desc : 'Centro de estudios y préstamo de libros',
            lat : -33.4503087523,
            long : -70.6832368241
        },
        {
            lugar : 'Planetario',
            desc : 'Lugar de alta connotación educativa',
            lat : -33.4503311317,
            long : -70.681375371
        },
        {
            lugar : 'CITE-CAMP',
            desc : 'Centro de Innovación Tecnológica Educativa',
            lat : -33.4464101747,
            long : -70.6832529173
        }
    ];


    app.controller('MapaCtrl', function($scope, $http) {
        var mapOptions = {
            zoom: 17,
            center: new google.maps.LatLng(-33.449147, -70.682269),
            mapTypeId: google.maps.MapTypeId.HYBRID
        }

        $scope.map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

        $scope.markers = [];
        
        var infoWindow = new google.maps.InfoWindow();
        
        var createMarker = function (info){
            
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.lugar
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            
            $scope.markers.push(marker);
            
        }  
        
        for (i = 0; i < lugares.length; i++){
            createMarker(lugares[i]);
        }

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
    });
    
    app.controller('FormCtrl', function($scope, $http) {
        this.mensaje = "Escoge una de las marcas de cámara para cargar la consulta en JSON o parseada en una Tabla:";
    });

    app.controller('JsonCtrl', function($scope, $http, $routeParams) {
        $scope.ruta = "json/"+$routeParams.marca+"_cameras.json";
        $scope.json = null;
        $scope.estado = null;
        
        $http.get($scope.ruta).
            success(function(data, status, headers, config) {
                console.log("Se leyó el JSON");
                $scope.respuesta = data;
                $scope.estado = status;

                $scope.objeto = angular.fromJson($scope.respuesta);
            }).
            error(function(data, status, headers, config) {
                console.log("No se leyó el JSON");
                $scope.json = data;
                $scope.estado = status;
            });
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