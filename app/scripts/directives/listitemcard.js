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
      template: '<li class="collection-card" ng-mouseover="triggerMouseOver($event)" ng-mouseleave="triggerMouseLeave()"><span class="glyphicon glyphicon-certificate {{rarity}}"></span> {{card.name}}</li>',
      restrict: 'E',
      scope: {
        card: '=cardData'
      },
      link: function postLink(scope) {
        scope.hideCmc = _.contains(scope.card.types, 'land');
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        var editions = _.reject(scope.card.editions, { multiverse_id: 0 });
        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        scope.rarity = editions[0].rarity;

        scope.triggerMouseOver = function ($event){
          scope.$emit('EmittedEvent',
          { name: 'CardHover', data: 
            { card: scope.card, x: $event.pageX, y: $event.pageY }
          });
        };

        scope.triggerMouseLeave = function (){
          scope.$emit('EmittedEvent', { name: 'CardHoverExit' });
        };
      }
    };
  }]);
