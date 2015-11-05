'use strict';

/**
 * @ngdoc filter
 * @name alexandriaApp.filter:customType
 * @function
 * @description
 * # customType
 * Filter in the alexandriaApp.
 */
angular.module('alexandriaApp')
  .filter('customType', ['_',function (_) {
    return function (cards, typeName) {
      var filteredResult = _.filter(cards, function(card){
        return card.types && card.types[0] === typeName;
      });
      cards = filteredResult;
      return cards;
    };
  }]);
