'use strict';

/**
 * @ngdoc function
 * @name jeremyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jeremyApp
 */
angular.module('jeremyApp')
  .controller('AjoutCtrl', ['$scope', 'AddPerson', 'Talk', function ($scope, AddPerson, Talk) {
	$scope.h1 		= "Ajout";
	
	// The person
	$scope.person 			= {};
	$scope.person.name		= "";
	$scope.person.surname 	= "";
	$scope.person.email 	= "";
	
	// The error messages
	$scope.errorEmail		= "Veuillez entrer un email valide";
	$scope.errorName		= "Veuillez entrer votre nom";
	$scope.errorSurname		= "Veuillez entrer votre prénom";
	
	// The display style of the error messages
	$scope.showErrorEmail	= "none";
	$scope.showErrorName	= "none";
	$scope.showErrorSurname	= "none";
	
	// To know if the user is a fuckin jerk or not
	$scope.jerk = 0;
	$scope.MAX_JERK = 3;
	
	// When the user presses "Ajouter"
	$scope.ajout = function(){
		if(test()){
			var add = new AddPerson;
			add.email 	= $scope.person.email;
			add.nom 	= $scope.person.name;
			add.prenom 	= $scope.person.surname;
			
			add.$save(function(){
				$scope.jerk = 0;
				// To make the page talk
				Talk.setText("Succès, " + add["nom"] + " " + add["prenom"] + " a été ajouté dans la base de données").talk();
			});
			
			// Removes the values of the person's things
			$scope.person.email 	= "";
			$scope.person.name		= "";
			$scope.person.surname	= "";
		}
	};

	// To test if the fields are complete
	var test = function(){
		var ok = true;
		
		// Testing the email
		var tmpEmail = $scope.person.email.length > 0 ? /^.+@.+\.(.{2}|.{3})$/.test($scope.person.email) : false;
		ok &= tmpEmail;
		$scope.showErrorEmail = tmpEmail ? "none" : "block";
		// Saying what is the error
		Talk.setText(tmpEmail ? "L'adresse e-mail que vous avez entré est correct!" : ($scope.jerk < $scope.MAX_JERK ? $scope.errorEmail : "")).talk();
		
		// Testing the name
		var tmpName = $scope.person.name.length > 0;
		ok &= tmpName;
		$scope.showErrorName = tmpName ? "none" : "block";
		// Saying what is the error
		Talk.setText(	tmpName ? 	( $scope.person.name.toLowerCase() == "ma bite" ? "Non, je ne pense pas que ta bite est assez grande mon bichon. Prends donc du sirop de Cordom!" : "Le nom que vous avez entré est correct!") 
									: ($scope.jerk < $scope.MAX_JERK ? $scope.errorName : "")).talk();
		
		// Testing the surname
		var tmpSurname = $scope.person.surname.length > 0;
		ok &= tmpSurname;
		$scope.showErrorSurname = tmpSurname ? "none" : "block";
		// Saying what is the error
		Talk.setText(	tmpSurname ? ( 	$scope.person.surname.toLowerCase() == "ma bite" ? "Non, je ne pense pas que ta bite est assez grande mon bichon. Prends donc du sirop de Cordom!" : "Le prénom que vous avez entré est correct!") 
										: ($scope.jerk < $scope.MAX_JERK ? $scope.errorSurname : "")).talk();
		
		if($scope.jerk >= $scope.MAX_JERK){
			Talk.setText("Bon, t'es con ou quoi? Remplis donc les champs comme il est demandé. Olalalala").talk();
		}
		
		$scope.jerk++;
		
		return ok;
	}
}]);

/**
 * The factory to add an user
 */
angular.module('jeremyApp').factory('AddPerson', ['$resource', function($resource){
	return $resource("rest/person/add/", {}, {});
}]);



/**
 * The service to make the page talk
 */
angular.module('jeremyApp').service('Talk', function(){
	// The vars
	this.utterance = new SpeechSynthesisUtterance("Perdu");
	this.utterance.default = false;
	this.utterance.lang = "fr-FR";
	
	this.setText = function(text){
		this.utterance = new SpeechSynthesisUtterance(text);
		this.utterance.default = false;
		this.utterance.lang = "fr-FR";
		
		return this;
	};
	
	this.talk = function(){
		window.speechSynthesis.speak(this.utterance);
	}
});