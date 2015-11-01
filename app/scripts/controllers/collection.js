'use strict';

/**
 * @ngdoc function
 * @name alexandriaApp.controller:CollectionCtrl
 * @description
 * # CollectionCtrl
 * Controller of the alexandriaApp
 */
angular.module('alexandriaApp')
  .controller('CollectionCtrl', ['$scope', '$firebaseObject', 'FIREBASE_REF', '$routeParams', function CollectionCtrl($scope, $firebaseObject, FIREBASE_REF, $routeParams) {
    var ref = new Firebase(FIREBASE_REF + 'collections/' + $routeParams.collectionId);
    var objectRef = $firebaseObject(ref);
    objectRef.$bindTo($scope, 'refItem').then(function(){
      console.log('bound object');
    });
    console.log($scope.refItem);

    $scope.addLetter = function(){
      $scope.refItem.name = 'aoui';
    };
  }]);
