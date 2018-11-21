var app = angular.module('promesaApp.controladores', []);

app.controller('mainCtrl', ['$scope', '$q', function($scope, $q){
//Hay que meter también la $q para que se pueda utilizar
	
	$scope.miVar = 0;


	$scope.sumar = function( num ){
//Esta es una función asíncrona que se ejecuta a través del tiempo.


		var q = $q.defer();
		//defer quiere decir que es algo que ya ha pasado y no está ocurriendo en el mismo instante.

		var valido = false;
		//Esto sirve para controlar que la promesa regrea correctamente.


		num ++;

		setTimeout(function() {

			if( valido ){

				q.resolve( num )
				//Cuando lo hace bien, se usa resolve.


			}else{

				q.reject( 'No sé sumar' );
				//Cuando lo hace mal, se usa reject.


			}
			
		}, 2000);


		return q.promise;
		//Buenas prácticas: cada vez que se trabaja con $q, hay que devolver la promesa.


	}



	$scope.promise = $scope.sumar( 1 );
	//Se ejecuta una promesa de forma que se llama a una función.

	
	$scope.promise.then( 
		function( valor ){//Aquí llega lo que se lanza de resolve.

			console.log("Promesa cumplida");
			$scope.miVar = valor;

		}, 
		function( error ){//Aquí llega lo que se lanza de reject.

			console.error( error );
			$scope.miVar = "¡¡¡Error!!!";

		});


//El then necesita siempre dos parámetros, que son dos funcioens: la positiva y la negativa (qué pasa cuando lo haga bien y qué va ap asar cuando lo haga mal)


}]);
