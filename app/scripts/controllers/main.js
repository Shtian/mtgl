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
        var name = $scope.collectionName;
        var description = $scope.description;
        var url = name.trim().toLowerCase().replace(/\s/g, '-').replace(/[^a-zA-Z0-9_.+-]/g, '');
        $scope.collections.$add({
          name: name,
          url: url,
          description: description
        });
        $scope.collectionName = '';
        $scope.description = '';
    };
  }]);
