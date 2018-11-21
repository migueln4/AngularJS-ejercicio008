var app = angular.module('promesaApp.servicios', []);

app.factory('Personas', ['$http','$q', function ($http,$q) {
//Vamos a hacer una petición de promesas vía http
	
	var self = {
	"cargando":false,
	"datos":[
	{
		"nombre":"Hulk Hogan",
		"edad":69

	}
	]
};

	return self;
}]);