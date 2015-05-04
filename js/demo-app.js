(function(){
    // Se carga un nuevo módulo para configuraciones y controladores
	var app = angular.module('demoapp', ['ngRoute']);

    // Configuración de rutas a través de $routeProvider
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        		// Rutas de vistas
                // Nótese que cada vista tiene un URL asociado, un URL de la plantilla (vista en HTML) y un controlador asociado
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
                // Las siguientes 2 rutas añaden además el valor de la variable 'marca' en el URL asociado
                when('/demo2a/:marca', {templateUrl: 'demo2a.html',   controller: 'JsonCtrl'}).
                when('/demo2b/:marca', {templateUrl: 'demo2b.html',   controller: 'JsonCtrl'}).
                // Si se accede a una ruta no especificada, se redirige a la ruta '/inicio' 
                otherwise({redirectTo: '/inicio'});
	}]);

    // Controlador principal de la aplicación, obtiene datos de la factoría 'Page'
    app.controller('MainCtrl', function($scope, Page) {
	    $scope.page = Page; 
	});

    // Controlador del cuadro de vistas (ng-view) de la aplicación, setea un título obtenido desde 'Page'
	app.controller('HomeCtrl', function($scope, Page) {
	    Page.setTitle("Bienvenido");
	});

    // Controlador de la vista Demo, entrega la variable 'this.mensaje' a la vista HTML
	app.controller('DemoCtrl', function($scope, Page) {
	    Page.setTitle("AngularJS Demo");
	    this.mensaje = "Haz click en uno de los Demos para cargarlo:";
    });

    // Variable global 'lugares', ofrece un objeto JS con datos para ser parseados
    // (puede ser reemplazado por un JSON)
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

    // Controlador de la vista Demo Mapa
    app.controller('MapaCtrl', function($scope, $http) {
        // Configuramos las opciones básicas del mapa
        var mapOptions = {
            zoom: 17,
            center: new google.maps.LatLng(-33.449147, -70.682269),
            mapTypeId: google.maps.MapTypeId.HYBRID
        }

        // Creamos una instancia de Google Maps y la empotramos en el <div> con id 'mapa'
        $scope.map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

        // Variable local para almacenar los marcadores del mapa
        $scope.marcadores = [];
        
        // Creamos una instancia de ventanas informativas de Google Maps
        var infoWindow = new google.maps.InfoWindow();

        // Función para crear marcadores        
        var crearMarcadores = function (info){
            // Creamos un marcador con los datos del objeto JS 'info' y lo guardamos en 'marcador'
            var marcador = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.long),
                title: info.lugar
            });
            marcador.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            
            // Añadimos un evento al marcador para que muestre la información al hacer click
            google.maps.event.addListener(marcador, 'click', function(){
                infoWindow.setContent('<h2>' + marcador.title + '</h2>' + marcador.content);
                infoWindow.open($scope.map, marcador);
            });
            
            // Introducimos el marcador en la pila de marcadores
            $scope.marcadores.push(marcador);
        }  
        
        // Creamos los marcadores con la función recién creada y tomando los datos desde la variable global 'lugares'
        for (i = 0; i < lugares.length; i++){
            crearMarcadores(lugares[i]);
        }

        // Función trigger que permite reaccionar al hacer click en el marcador
        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
    });

    // Controlador de la vista Demo JSON, pasa un mensaje a la vista    
    app.controller('FormCtrl', function($scope, $http) {
        this.mensaje = "Escoge una de las marcas de cámara para cargar la consulta en JSON o parseada en una Tabla:";
    });

    // Controlador manipulador de JSON
    app.controller('JsonCtrl', function($scope, $http, $routeParams) {
        // Se construye el string que accede a la ruta del JSON en función de los parámetros ingresados por URL
        // NOTA: La aplicación tiene implementado solo los json para las marcas 'canon', 'nikon' y 'samsung'
        $scope.ruta = "json/"+$routeParams.marca+"_cameras.json";
        // String de estado del servidor
        $scope.estado = null;
        
        // Hacemos una consulta HTTP GET a la ruta del JSON recién definida
        $http.get($scope.ruta).
            // Si tenemos éxito, parseamos el JSON como objeto JS para ser procesado en la vista
            success(function(data, status, headers, config) {
                console.log("Se leyó el JSON");
                $scope.respuesta = data;
                $scope.estado = status;
                // La funcion angular.fromJson() transforma el string JSON en objeto JS
                $scope.objeto = angular.fromJson($scope.respuesta);
            }).
            // Si no tenemos éxito, no hacemos el parseo
            error(function(data, status, headers, config) {
                console.log("No se leyó el JSON");
                $scope.respuesta = data;
                $scope.estado = status;
            });
    });

    // Factoría 'Page' que setea el título de la página
    // (en la vista no se usa, pero se deja como ejemplo de Factoría)
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