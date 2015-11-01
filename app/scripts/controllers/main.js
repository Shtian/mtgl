'use strict';

/**
 * @ngdoc function
 * @name alexandriaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the alexandriaApp
 */
angular.module('alexandriaApp')
  .controller('MainCtrl', ['$scope', '$firebaseArray', '_', function MainCtrl($scope, $firebaseArray, _) {
    var ref = new Firebase('https://mtgl.firebaseio.com/collections');

    $scope.collections = $firebaseArray(ref);
    $scope.disableButton = true;

    $scope.createCollection = function() {
      if($scope.isNameUnique()) {
        var name = $scope.collectionName;
        var url = name.trim().toLowerCase().replace(/\s/g, '-');
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
