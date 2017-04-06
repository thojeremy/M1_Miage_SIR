'use strict';

/**
 * @ngdoc function
 * @name jeremyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jeremyApp
 */
angular.module('jeremyApp')
  .controller('ListeCtrl', ['$scope', 'LoadBase', function ($scope, LoadBase) {
	$scope.h1 	= "Liste";
	$scope.p	= "Allez dans la section List pour voir les différentes listes. Allez dans la section Ajout pour pouvoir ajouter des choses";
	
	$scope.personnes = [];
	
	var lb = LoadBase.query(function(){
		for(var i = 0; i < lb.length; i++){
			$scope.personnes.push({	"nom": lb[i]["nom"], "prenom":lb[i]["prenom"], "mail":lb[i]["mail"]});
		}
	});
}]);

/**
 * The factory to get everything
 */
angular.module('jeremyApp').factory('LoadBase', ['$resource', function($resource){
	return $resource("rest/person/");
}]);