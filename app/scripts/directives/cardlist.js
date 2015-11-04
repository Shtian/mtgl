'use strict';

/**
 * @ngdoc directive
 * @name alexandriaApp.directive:cardList
 * @description
 * # cardList
 */
angular.module('alexandriaApp')
  .directive('cardList',[function () {
    return {
      template: '<div ng-show="showList">'+
                  '<div class="card-list-title">{{title}}</div>' +
                  '<ul class="card-list">'+
                    '<list-item-card ng-repeat="card in cards" card-data="card" />'+
                  '</ul>'+
                '</div>',
      restrict: 'E',
      scope: {
        cards: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        scope.showList = false;
        var unwatch = scope.$watch('cards', function(cards) {
          if(cards && cards.length){
            scope.showList = cards.length;
            unwatch();
          }
        }, true);
      }
    };
  }]);
