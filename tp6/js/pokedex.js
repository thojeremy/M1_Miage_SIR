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
																					$scope, 
																					$log, 
																					ChargementPkmn, 
																					ChargementInfosPkmn
																				){
  // Names
  $scope.id 	= "";
  $scope.name 	= "";
  
  // For the informations
  $scope.pkmnName 			= "Select a pokemon and hit [Get]";
  $scope.srcImg				= "http://vignette3.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest?cb=20150418234807";
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
  $scope.description		= "--";
  
  $scope.buttonGetValue 	= "Get";
  $scope.buttonResetValue 	= "Reset";
  
  // Reset
  $scope.reset = function(){
	  $scope.name 	= "";
	  $scope.id		= "";
  }

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
	
	// Gets the moveset, etc..
	var infos = ChargementInfosPkmn.get({uri: $scope.liste_uri[$scope.id]}, function(){
		// The name
		$scope.pkmnName = infos["name"];
		
		// The image
		try{
			var uriImg = infos["sprites"][0]["resource_uri"].replace('/', '');
			
			var xhrImg = ChargementInfosPkmn.get({uri: uriImg}, function(){
				// C'est bizarre, ça marche une fois sur deux.
				$scope.srcImg = "http://pokeapi.co/" + xhrImg["image"];
			});
		} catch(e){
		}
		
		// The description
		try{
			var uriDesc = infos["descriptions"][0]["resource_uri"].replace('/', '');
			
			var xhrDesc = ChargementInfosPkmn.get({uri: uriDesc}, function(){
				$scope.description = xhrDesc["description"];
			});
		} catch(e){
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
