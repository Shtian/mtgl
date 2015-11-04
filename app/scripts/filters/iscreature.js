'use strict';

/**
 * @ngdoc filter
 * @name alexandriaApp.filter:isCreature
 * @function
 * @description
 * # isCreature
 * Filter in the alexandriaApp.
 */
angular.module('alexandriaApp')
  .filter('isCreature', ['_',function (_) {
    return function (cards) {
      return _.filter(cards, function(card){ 
        return card.types && card.types[0] === 'creature';
      });
    };
  }]);
