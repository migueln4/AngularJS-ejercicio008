var app = angular.module('promesaApp.controladores', []);

app.controller('mainCtrl', ['$scope', '$q', function($scope, $q){
//Hay que meter también la $q para que se pueda utilizar
//$q es un proceso que permite hacer acciones de manera asíncrona.
//Generalmente, el uso de promesas se hace para procesar cantidades de datos. Estos se mandan a procesar con la promesa y se devuelve algo cuando ese proceso termine. Mientras, se puede continuar con otras operaciones en la aplicación, porque se trata de un proceso asíncrono.
	
	$scope.miVar = 0;


	$scope.sumar = function( num ){
//Así es como se crea una función asíncrona que se ejecuta a través del tiempo.


		var q = $q.defer();//Es habitual darle el nombre q a las variables del tipo diferido. 
		//defer quiere decir que es algo que ya ha pasado y no está ocurriendo en el mismo instante.

		var valido = false;
		//Esto sirve para controlar que la promesa regrea correctamente. Simplemente, es una demostración.


		num ++;

		setTimeout(function() {

			if( valido ){//El uso de esta variable controla que se ejecute una parte del if o la otra y es solo útil para el ejemplo práctico.

				q.resolve( num )
				//Cuando lo hace bien, se usa resolve.


			}else{

				q.reject( 'No sé sumar' );
				//Cuando lo hace mal, se usa reject.


			}
			
		}, 2000);


		return q.promise;
		//Buenas prácticas: cada vez que se trabaja con $q, hay que devolver la promesa. Se coloca q.promise y no $q.promise porque en q se ha almacenado el diferido y es con lo que estamos trabajando aquí. No es un método a lo que se llama, es el valor que se ha devuelto de la función que está escrita justo encima (la del timeout).


	}

	/* Las funciones con promesas se llaman casi igual que cualquier otra función, pero se usa un método muy particular para ello. */

	$scope.promise = $scope.sumar( 1 );
	//Se ejecuta una promesa de forma que se llama a una función.
	//Se crea una promesa que consiste en ejecutar la función sumar. Cuando haya acabado, devuelve una respuesta, que será o bien el resultado de la función o bien un mensaje de error de que no ha sido posible hacer la tarea.

	
	$scope.promise.then(//El then necesita siempre dos parámetros que deben ser dos funciones y son especiales: una es la positiva (qué ocurre cuando se haya hecho bien) y la otra es negativa (no se ha hecho bien).  
		function( valor ){//Aquí llega lo que se lanza de resolve.

			console.log("Promesa cumplida");
			$scope.miVar = valor;

		}, 
		function( error ){//Aquí llega lo que se lanza de reject.

			console.error( error );
			$scope.miVar = "¡¡¡Error!!!";

		});


}]);
