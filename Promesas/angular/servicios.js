var app = angular.module('promesaApp.servicios', []);

app.factory('personas', ['$http','$q','$rootScope',function ($http,$q,$rootScope) {
//rootScope está por encima del scope

	var self = {
		"cargando":false,
		"mensajeFinalProceso":'',
		"data":[{
			"nombre":"Hulk Hogan",
			"edad":69
		}
		]

	};

	self.cargarDatos = function() {
//Aquí, por JavaScript, se le está agregando a la variable self una nueva función.

	console.log("Se ha hecho la llamada a la función.");

		self.cargando = true; //Hace el cambio del dato cargando.

//Se empieza a definir la promesa:

		var q = $q.defer();
//NOTA: se va a recurrir a json-generator.com para generar un json con el que se puede trabajar y que ya está en línea. Lo que se genera se puede subir y copiar la URL de lo que genera. Así ya se puede apuntar a él.
//Esta parte es que recoja el json allí donde se lo hemos dicho y que avise cuando lo haya hecho con éxito o diga que ha habido un problema.

		$http.jsonp('http://www.json-generator.com/api/json/get/bQuMbLWDQO?callback=JSON_CALLBACK')
			.then(function success(respuesta) { //Qué ocurre si lo hace bien

				console.log("¡Todo bien!");
				console.log(respuesta);

				setTimeout(function() {
					q.resolve(respuesta.data);

				},1000); //Lo que hace aquí es solo para poder ver los cambios en la variable de cargando. Si tarda un segundo, se puede ver luego en la pantalla cómo se modifica. También sirve para tener algún control con la parte de los estilos.
				
//Básicamente, esto es lo que se encarga de llamar a la función, pero lo hace para la promesa.


			},
			function error(response) { //Qué ocurre cuando lo hace mal

				console.log("Algo salió mal.");
				q.reject("Error al cargar.");

			});

			return q.promise;
			//Si no se retorna nada, da error.

	};

	$rootScope.promise = self.cargarDatos();
	$rootScope.promise.then(
		function(data) {
			self.cargando = false;
			self.mensajeFinalProceso = "Información cargada correctamente.";
			self.data = data; //el data de la variable self se iguala a los datos que se le han metido a la función.
		},
		function(error){
			self.cargando = false;
			self.mensajeFinalProceso = "Error al cargar los datos.";
			console.error(error);
		});

//Cuando es instanciado el servicio llega y empieza a leer todo. Al ejecutar la función, retorna el valor de self.

	return self;
	
}])