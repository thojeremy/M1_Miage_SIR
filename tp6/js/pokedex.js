var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.factory('ChargementPkmn', ['$resource', 'POKEAPI', function($resource, POKEAPI){
	return $resource(POKEAPI + "/api/v1/pokedex/");
}]);

pokeApp.factory('ChargementInfosPkmn', ['$resource', 'POKEAPI', function($resource, POKEAPI){
	return $resource(POKEAPI + "/:uri");
}]);

/**
 * Le service permettant d'appeler l'api
 */
pokeApp.service('idPokemon', ['$resource', function($resource){
	this.id = 0;
	this.scopeUri = 0
	this.triggered = false;
	
	this.setId = function(the_id){
		this.id = the_id;
		// To make the page call the api
		this.triggered = !this.triggered;
	};
	
	this.setUri = function(uri){
		this.scopeUri = uri;
	}
	
	this.getId = function(){
		return this.id;
	};
	
	this.getUri = function(){
		return this.scopeUri;
	};
}]);

/**
 * ============= Directive pour le form =============
 */
pokeApp.directive('pokedex', function(){
	return {
		templateUrl: 'pokedex.html'
	};
});

/**
 * ============== The controller for the pokemon's selection =============
 */
pokeApp.controller(	'Controller', 
					['$scope', '$log', 'ChargementPkmn', 'ChargementInfosPkmn', 'idPokemon', function(
																										$scope, 
																										$log, 
																										ChargementPkmn, 
																										ChargementInfosPkmn,
																										idPokemon
																									){
	// Names
	$scope.id 	= "";
	$scope.name = "";
  
	$scope.buttonGetValue 		= "Get";
	$scope.buttonResetValue 	= "Reset";
	$scope.buttonLogValue 		= "Log";
	
	// Reset
	$scope.reset = function(){
		$scope.name 	= "";
		$scope.id		= "";
	};

	// Select
	$scope.go = function(){
		// Gets the html list
		var list = document.getElementById("pselect");
		
		// Tries if there is something selected in the <select>
		if(list.options[list.selectedIndex] == undefined){
			alert("Please select something!");
			return;
		}
		
		// Sets the image src to the loader image
		$scope.srcImg = "img/load.gif";
		
		// Gets the name and the id
		var slct 	= list.options[list.selectedIndex].text.split(" - ");

		// Changes the name and the id
		$scope.id 	= slct[0];
		$scope.name = slct[1];
		
		// Setting the pokemon's id
		idPokemon.setId($scope.id);
	};
	
	// Log
	$scope.printLog = function(){
		var list = document.getElementById("pselect");
		
		list = list.options[list.selectedIndex] == undefined ? "--" : list.options[list.selectedIndex].text;
		
		$log.log("Valeur sélectionnée : " + list);
	};
	
	// Gets the list
	var charge = ChargementPkmn.get(function(){
		var pkmn_list 	= [];
		var pkmn_uri_list = [];
		var pkmn_list_tmp = charge["objects"][0]["pokemon"];
		for(var id in pkmn_list_tmp){
			// Gets the pokeId
			var pokeId = pkmn_list_tmp[id]["resource_uri"].split("/");
			pokeId = pokeId[pokeId.length - 2];
		  
			// Gets the pokemon's name
			pkmn_list[pokeId] = pokeId + " - " + pkmn_list_tmp[id]["name"];
		  
			// Gets the pokemon's uri
			pkmn_uri_list[pokeId] = pkmn_list_tmp[id]["resource_uri"];
		}
		
		$scope.liste 		= pkmn_list;
		$scope.liste_uri 	= pkmn_uri_list;
		idPokemon.setUri($scope.liste_uri);
	});
}]);

/**
 * ============== The controller containing the informations of the pokemon ===========
 */
pokeApp.controller(	'Infos', 
					['$scope', '$log', 'ChargementPkmn', 'ChargementInfosPkmn', 'idPokemon', function(
																										$scope, 
																										$log, 
																										ChargementPkmn, 
																										ChargementInfosPkmn,
																										idPokemon
																									){
	// For the informations
	$scope.pkmnName 			= "Select a pokemon and hit [Get]";
	$scope.srcImg				= "http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest?cb=20150418234807";
	$scope.abilities			= ["--"];
	$scope.types				= ["--"];
	$scope.moveset				= {"--": "--"};
	$scope.attack 				= "--";
	$scope.defense 				= "--";
	$scope.sp_atk 				= "--";
	$scope.sp_def 				= "--";
	$scope.speed				= "--";
	$scope.height				= "--";
	$scope.move_learn_type		= "--";
	$scope.move_name			= "--";
	$scope.description			= "--";
	
	// Gets the moveset, etc..
	$scope.$watch(	// If the id of the pokemon changed
					function(){
						return idPokemon.triggered;
					}, 
					function(){
						try{
							var infos = ChargementInfosPkmn.get({uri: idPokemon.getUri()[idPokemon.getId()]}, function(){
							// The name
							$scope.pkmnName = infos["name"];
							
							// The image
							try{
								var uriImg = infos["sprites"][0]["resource_uri"].replace('/', '');
								
								var xhrImg = ChargementInfosPkmn.get({uri: uriImg}, function(){
									// C'est bizarre, รงa marche une fois sur deux.
									$scope.srcImg = "http://pokeapi.co/" + xhrImg["image"];
								});
							} catch(e){
								$scope.srcImg = "http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest?cb=20150418234807";
							}
							
							// The description
							try{
								var uriDesc = infos["descriptions"][0]["resource_uri"].replace('/', '');
								
								var xhrDesc = ChargementInfosPkmn.get({uri: uriDesc}, function(){
									$scope.description = xhrDesc["description"];
									
									// To make the pokedex talk
									var utterance = new SpeechSynthesisUtterance($scope.description);
									if(! document.getElementById("cb_voix").checked ){// If the user wants the french girl to talk
										utterance.default = false;
										utterance.lang = "en-GB";
									}
									window.speechSynthesis.speak(utterance);
								});
							} catch(e){
								$scope.description = "No description available";
								
								// To make the pokedex talk
								var utterance = new SpeechSynthesisUtterance($scope.description);
								if(! document.getElementById("cb_voix").checked ){// If the user wants the french girl to talk
									utterance.default = false;
									utterance.lang = "en-GB";
								}
								window.speechSynthesis.speak(utterance);
							}
							
							// The abilities
							$scope.abilities = [];
							for(var a in infos["abilities"]){
								$scope.abilities.push(infos["abilities"][a]['name']);
							}
							
							// The types
							$scope.types = [];
							for(var a in infos["types"]){
								$scope.types.push(infos["types"][a]['name']);
							}
							
							// The moveset
							$scope.moveset = {};
							for(var a in infos["moves"]){
								var learn_type = infos["moves"][a]['learn_type'];
								$scope.moveset[infos["moves"][a]["name"]] = infos["moves"][a]["learn_type"];
							}
							
							// Specificities
							$scope.attack 	= infos["attack"];
							$scope.defense 	= infos["defense"];
							$scope.sp_atk	= infos["sp_atk"];
							$scope.sp_def	= infos["sp_def"];
							$scope.speed	= infos["speed"];
							$scope.height	= infos["height"];
						});
						} catch(e) {}
				});
}]);