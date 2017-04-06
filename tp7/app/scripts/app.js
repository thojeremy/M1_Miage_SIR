'use strict';

/**
 * @ngdoc overview
 * @name jeremyApp
 * @description
 * # jeremyApp
 *
 * Main module of the application.
 */
angular
  .module('jeremyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/ajout', {
        templateUrl: 'views/ajout.html',
        controller: 'AjoutCtrl',
        controllerAs: 'ajout'
      })
      .when('/liste', {
        templateUrl: 'views/liste.html',
        controller: 'ListeCtrl',
        controllerAs: 'liste'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
