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
  .value('FIREBASE_REF', 'https://mtgl.firebaseio.com/')
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
      .when('/collection/:collectionId/import', {
        templateUrl: 'views/import.html',
        controller: 'ImportCtrl',
        controllerAs: 'import'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
