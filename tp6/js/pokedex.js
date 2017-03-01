var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('Controller', ['$scope', '$log', function($scope, $log){
  // Names
  $scope.id = "";
  $scope.name = "";
  $scope.buttonValue = "Get";

  // Select
  $scope.go = function(){
    var list = document.getElementById("pselect");

    var pname = list.options[list.selectedIndex].text;
    var pid = list.options[list.selectedIndex].value;

    $scope.id = pid;
    $scope.name = pname;
    $log.log($scope.id + " - " + $scope.name);
  };

  // List
  $scope.liste = [
    "carapuce",
    "bulbizarre",
    "salamèche",
    "evoli"
  ];
}]);
