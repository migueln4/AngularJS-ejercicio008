var app = angular.module('promesaApp.controladores', []);

app.controller('personasCtrl', ['$scope','personas', function($scope,personas){
	//Donde queremos usar el servicio, hay que mandarlo también con el mismo nombre que le hemos dado en su archivo. Debe ser copia literal (diferencia mayúsculas de minúsculas).

	$scope.personas = personas;

}]);
