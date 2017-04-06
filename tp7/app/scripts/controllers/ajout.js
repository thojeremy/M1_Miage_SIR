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
	
	// When the user presses "Ajouter"
	$scope.ajout = function(){
		if(test()){
			var add = new AddPerson;
			add.email 	= $scope.person.email;
			add.nom 	= $scope.person.name;
			add.prenom 	= $scope.person.surname;
			
			add.$save(function(){
				// To make the page talk
				Talk.setText("Succès, " + add["nom"] + " " + add["prenom"] + " a été ajouté dans la base de données").talk();
			});
		}
	};

	// To test if the fields are complete
	var test = function(){
		var ok = true;
		
		// Testing the email
		var tmp = $scope.person.email.length > 0 ? /^.+@.+\.(.{2}|.{3})$/.test($scope.person.email) : false;
		ok &= tmp;
		$scope.showErrorEmail = tmp ? "none" : "block";
		// Saying what is the error
		Talk.setText(tmp ? "L'adresse e-mail que vous avez entré est correct!" : $scope.errorEmail).talk();
		
		// Testing the name
		var tmp = $scope.person.name.length > 0;
		ok &= tmp;
		$scope.showErrorName = tmp ? "none" : "block";
		// Saying what is the error
		Talk.setText(tmp ? "Le nom que vous avez entré est correct!" : $scope.errorName).talk();
		
		// Testing the surname
		var tmp = $scope.person.surname.length > 0;
		ok &= tmp;
		$scope.showErrorSurname = tmp ? "none" : "block";
		// Saying what is the error
		Talk.setText(tmp ? "Le prénom que vous avez entré est correct!" : $scope.errorSurname).talk();
		
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