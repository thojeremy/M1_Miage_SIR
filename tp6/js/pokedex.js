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

pokeApp.controller(	'Controller', 
					['$scope', '$log', 'ChargementPkmn', 'ChargementInfosPkmn', function(
																					$scope, $log, ChargementPkmn, ChargementInfosPkmn
																				){
  // Names
  $scope.id 	= "";
  $scope.name 	= "";
  
  // For the informations
  $scope.pkmnName 			= "Select a pokemon and hit [Get]";
  $scope.abilities			= ["--"];
  $scope.types				= ["--"];
  $scope.moveset			= {"--": "--"};
  $scope.attack 			= "--";
  $scope.defense 			= "--";
  $scope.sp_atk 			= "--";
  $scope.sp_def 			= "--";
  $scope.speed				= "--";
  $scope.height				= "--";
  $scope.move_learn_type	= "--";
  $scope.move_name			= "--";
  
  $scope.buttonGetValue = "Get";
  $scope.buttonSearchValue = "Search in pokedex";

  // Select
  $scope.go = function(){
	// Gets the html list
    var list = document.getElementById("pselect");

	// Gets the name and the id
    var pname = list.options[list.selectedIndex].text;
    var pid = list.options[list.selectedIndex].value;

	// Changes the name and the id
    $scope.id = Number(pid) + 1;
    $scope.name = pname.split(" - ")[1];
	
	// Gets the moveset, etc..
	var infos = ChargementInfosPkmn.get({uri: $scope.liste_uri[$scope.id]}, function(){
		// The name
		$scope.pkmnName = infos["name"];
		
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
  });
  
}]);
