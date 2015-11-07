'use strict';

/**
 * @ngdoc directive
 * @name alexandriaApp.directive:listItemCard
 * @description
 * # listItemCard
 */
angular.module('alexandriaApp')
  .directive('listItemCard',  ['_', function(_) {
    return {
      template: '<li class="collection-card" ng-class="{ \'foil\': card.foil }">' +
                  '{{card.count}} <span ng-hide="showmenu" preview-attr="card">{{card.name}}</span>' +
                  '<div class="card-mini-menu" ng-show="showmenu">' +
                    '<span class="glyphicon glyphicon-arrow-up" ng-click="increment()"></span>' +
                    '<span class="glyphicon glyphicon-arrow-down" ng-click="decrement()"></span>' +
                    '<span class="glyphicon glyphicon-certificate" ng-click="toggleFoil()"></span>' +
                    '<span class="glyphicon glyphicon-remove" ng-click="deleteCard()"></span></div>'+
                  '<span class="glyphicon glyphicon-cog" ng-click="toggleMenu()"></span>' +
                '</li>',
      restrict: 'E',
      scope: {
        card: '=cardData'
      },
      link: function postLink(scope, element) {
        scope.showmenu = false;
        scope.card.count = scope.card.count || 1;
        scope.card.foil = (typeof scope.card.foil === 'undefined') ? false : scope.card.foil;
        scope.hideCmc = _.contains(scope.card.types, 'land');
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        var editions = _.reject(scope.card.editions, { multiverse_id: 0 });
        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        scope.rarity = editions[0].rarity;

        scope.toggleMenu = function(){
          scope.showmenu = !scope.showmenu;
        };

        scope.increment = function(){
          scope.card.count++;
        };

        scope.decrement = function(){
          if(scope.card.count > 1) {
            scope.card.count--;
          }
        };

        scope.toggleFoil = function(){
          scope.card.foil = !scope.card.foil;
        };

        scope.deleteCard = function(){
          element.remove();
          scope.$emit('DeleteCard', scope.card);
        };
      }
    };
  }]);
