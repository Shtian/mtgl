'use strict';

/**
 * @ngdoc function
 * @name alexandriaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alexandriaApp
 */
angular.module('alexandriaApp')
  .controller('MainCtrl', ['$scope', '$firebaseArray', '_', 'FIREBASE_REF', function MainCtrl($scope, $firebaseArray, _, FIREBASE_REF) {
    var ref = new Firebase(FIREBASE_REF + 'collections');
    $scope.collections = $firebaseArray(ref);

    $scope.createCollection = function() {
      if($scope.isNameUnique()) {
        var name = $scope.collectionName;
        var url = name.trim().toLowerCase().replace(/\s/g, '-').replace(/[^a-zA-Z0-9_.+-]/g, '');
        $scope.collections.$add({ name: name, url: url });
        console.log('collection added', $scope.collectionName);
        $scope.collectionName = '';
      }
    };

    $scope.isNameUnique = function() {
      var name = $scope.collectionName;
      if(name) {
         if($scope.collections && $scope.collections.length){
           return !_.some($scope.collection, { 'name': $scope.collectionName});
         } else {
           return true;
         }
      }
      return false;
    };
  }]);
