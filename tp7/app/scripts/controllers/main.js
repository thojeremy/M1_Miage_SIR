'use strict';

/**
 * @ngdoc function
 * @name jeremyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jeremyApp
 */
angular.module('jeremyApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
	$scope.h1 	= "Voici le TP7!";
	$scope.p	= "Allez dans la section List pour voir les différentes listes. Allez dans la section Ajout pour pouvoir ajouter des choses";
}]);
