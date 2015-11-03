'use strict';

/**
 * @ngdoc directive
 * @name alexandriaApp.directive:listItemCard
 * @description
 * # listItemCard
 */
angular.module('alexandriaApp')
  .directive('listItemCard', function () {
    return {
      template: '<li>{{card.name}}</li>',
      restrict: 'E',
      scope: {
        card: '=cardData'
      },
      link: function postLink(scope, element, attrs) {
        console.log(scope.card, element, attrs);
      }
    };
  });
