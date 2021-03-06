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
    $scope.collectionId = $routeParams.collectionId;
    // Blocks of card categories

    function resetlocalCardLists(){
      $scope.whiteCards = [];
      $scope.redCards = [];
      $scope.blackCards = [];
      $scope.blueCards = [];
      $scope.greenCards = [];
      $scope.colorlessCards = [];
      $scope.multicolorCards = [];
    }

    resetlocalCardLists();

    function setLocalCardList(){
        resetlocalCardLists();
        if($scope.refItem && $scope.refItem.cards){
          _.each($scope.refItem.cards, function(card){
            if(!card.colors || !card.colors.length){
              $scope.colorlessCards.push(card);
              return;
            }
            if(card.colors.length > 1){
              $scope.multicolorCards.push(card);
              return;
            }
            switch (card.colors[0]) {
              case 'white':
                $scope.whiteCards.push(card);
                break;
              case 'black':
                $scope.blackCards.push(card);
                break;
              case 'blue':
                $scope.blueCards.push(card);
                break;
              case 'red':
                $scope.redCards.push(card);
                break;
              case 'green':
                $scope.greenCards.push(card);
                break;
              default:
                console.log('Could not find a collection for card:', card);
            }
          });
        }
    }

    $scope.addCard = function(data) {
      if (!objectRef.cards) {
        objectRef.cards = [];
      }
      objectRef.cards.push(data);
      objectRef.$save();

      $scope.clearSearch();
    };

    function updateSearchResult() {
      if ($scope.searchTerm) {
        deckbrewAPI.typeahead($scope.searchTerm)
          .success(function(res) {
            $scope.searchResult = res;
          });
      } else if($scope.searchResult) {
        $scope.searchResult = [];
      }
    }

    function removeCard(key){
      _.remove($scope.refItem.cards, function(card) {
        return card.$$hashKey === key;
      });
      setLocalCardList();
    }

    $scope.clearSearch = function() {
        $scope.searchTerm = '';
        $scope.searchResult = [];
    };
    $scope.$on('EmittedEvent', function(event, message){
      $scope.$broadcast(message.name, message.data);
    });
    $scope.$on('DeleteCard', function(event, data){
      removeCard(data.$$hashKey);
    });
    $scope.$watch('refItem', setLocalCardList);
    $scope.$watch('searchTerm', _.debounce(updateSearchResult, 500));
  }]);
