'use strict';

/**
 * @ngdoc function
 * @name alexandriaApp.controller:ImportCtrl
 * @description
 * # ImportCtrl
 * Controller of the alexandriaApp
 */
angular.module('alexandriaApp')
  .controller('ImportCtrl',  ['$scope', '$firebaseObject', 'FIREBASE_REF', '$routeParams', 'deckbrewAPI', '_', '$q', function ImportCtrl($scope, $firebaseObject, FIREBASE_REF, $routeParams, deckbrewAPI, _, $q) {
    var ref = new Firebase(FIREBASE_REF + 'collections/' + $routeParams.collectionId);
    var objectRef = $firebaseObject(ref);
    objectRef.$bindTo($scope, 'refItem');
    $scope.collectionId = $routeParams.collectionId;

    function resetImportStatus(){
      $scope.lineCount = 0;
      $scope.cardCountImported = 0;
      $scope.cardsToImport = 0;
      $scope.importing = false;
      $scope.successfullImport = false;
      $scope.unsuccessfullImport = false;
    }

    resetImportStatus();

    $scope.importCards = function(){
      resetImportStatus();
      if(!$scope.importList)
      {
        return;
      }
      $scope.importing = true;
      var lines = $scope.importList.split('\n');
      $scope.cardsToImport = lines.length;
      var sanitizedInput = _.map(lines, sanitizeCardName);
      var cardsImported = [];
      var cardsFailed = [];
      var cardQueue = [];

      _.each(sanitizedInput, function(name){
        cardQueue.push(deckbrewAPI.getCard(name)
        .success(function(data){
          cardsImported.push(data);
          $scope.cardCountImported++;
        }).error(function(){
          cardsFailed.push(name);
        }));
      });

      var allRequests = $q.all(cardQueue);
      allRequests.then(function(){
          addCardsToCollection(cardsImported);
          cardsImported = [];
          $scope.successfullImport = true;
      }, function(){
          addCardsToCollection(cardsImported);
          cardsImported = [];
          $scope.unsuccessfullImport = true;
          $scope.cardsFailed = cardsFailed;
      });
    };

    function addCardsToCollection(cards){
      _.each(cards, function(card){
        objectRef.cards.push(card);
      });
      objectRef.$save();
    }

    function sanitizeCardName(cardName){
      return cardName.trim().toLowerCase().replace(/\s/g, '-').replace(/[^a-zA-Z0-9_.+-]/g, '');
    }

    function countLines(){
      if(!$scope.importList)
      {
        return;
      }
      $scope.lineCount = $scope.importList.split('\n').length;
    }

    $scope.$watch('importList', countLines);
  }]);
