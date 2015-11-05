'use strict';

/**
 * @ngdoc directive
 * @name alexandriaApp.directive:cardPreview
 * @description
 * # cardPreview
 */
angular.module('alexandriaApp')
  .directive('cardPreview', ['_', function(_) {
    return {
      template: '<div class="preview-image">{{name}}</div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        var xOffset = 20;
        var yOffset = -50;
        scope.imageSource = '';
        element.css({ background: ''});
        scope.$on('CardHover', function(event, data){
          // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
          if(data.card && data.card.editions.length > 1){
              var edition = _.find(data.card.editions, function(edition){
              return edition.multiverse_id !== 0;
            });
            setImage(edition.image_url, data.x, data.y, true);
          } else {
            setImage(data.card.editions[0].image_url, data.x, data.y, true);
          }
          // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        });

        scope.$on('CardHoverExit', function(){
          setImage('', 0, 0, false);
        });

        function setImage(url, x, y, display) {
          var displayValue = display ? "inline" : "none";
          element.css({
            'background-image': 'url("'+ url +'")',
            'background-size': 'cover',
            left: (x + xOffset) + 'px',
            top: (y + yOffset) + 'px',
            display: displayValue
          });
        }
      }
    };
  }]);
