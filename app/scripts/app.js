'use strict';

/**
 * @ngdoc overview
 * @name alexandriaApp
 * @description
 * # alexandriaApp
 *
 * Main module of the application.
 */
angular
  .module('alexandriaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .constant('_', window._)
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/collection/:collectionId', {
        templateUrl: 'views/collection.html',
        controller: 'CollectionCtrl',
        controllerAs: 'collection'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
