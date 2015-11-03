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
      template: '<li class="collection-card"><span class="glyphicon glyphicon-certificate {{rarity}}"></span> <span ng-hide="hideCmc">({{card.cmc}}) </span>{{card.name}}</li>',
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
      }
    };
  }]);
