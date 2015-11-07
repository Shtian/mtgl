'use strict';

/**
 * @ngdoc directive
 * @name alexandriaApp.directive:previewAttr
 * @description
 * # previewAttr
 */
angular.module('alexandriaApp')
  .directive('previewAttr', function () {
    return {
      restrict: 'A',
      scope: {
        card: '&previewAttr'
      },
      link: function postLink(scope, element) {
        element.on('mouseenter', function(event) {
          var card = scope.card();
          scope.$emit('EmittedEvent',
          { name: 'CardHover', data:
            { card: card, x: event.pageX, y: event.pageY }
          });
        });
        element.on('mouseleave', function() {
            element.removeClass(scope.hoverClass);
        });
      }
    };
  });
