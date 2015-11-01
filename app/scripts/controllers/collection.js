'use strict';

/**
 * @ngdoc function
 * @name alexandriaApp.controller:CollectionCtrl
 * @description
 * # CollectionCtrl
 * Controller of the alexandriaApp
 */
angular.module('alexandriaApp')
  .controller('CollectionCtrl', ['$scope', '$firebaseObject', 'FIREBASE_REF', '$routeParams', 'deckbrewAPI', '_', function CollectionCtrl($scope, $firebaseObject, FIREBASE_REF, $routeParams, deckbrewAPI, _) {
    var ref = new Firebase(FIREBASE_REF + 'collections/' + $routeParams.collectionId);
    var objectRef = $firebaseObject(ref);
    objectRef.$bindTo($scope, 'refItem');

    $scope.addCard = function(data) {
      console.log(data);
      if (!objectRef.cards) {
        objectRef.cards = [];
      }
      objectRef.cards.push(data);
      objectRef.$save();
    };

    function updateSearchResult() {
      if ($scope.searchTerm) {
        deckbrewAPI.typeahead($scope.searchTerm)
          .success(function(res) {
            console.log(res);
            $scope.searchResult = res;
          });
      }
    }

    $scope.$watch('searchTerm', _.debounce(updateSearchResult, 500));
  }]);