'use strict';

/**
 * @ngdoc directive
 * @name alexandriaApp.directive:cardList
 * @description
 * # cardList
 */
angular.module('alexandriaApp')
  .directive('cardList',['customTypeFilter', function (customTypeFilter) {
    return {
      template: '<div>'+
                  '<div class="card-list-title">{{title}}</div>' +
                  '<ul class="card-list">'+
                    '<list-item-card ng-repeat="card in filteredCards" card-data="card" />'+
                  '</ul>'+
                '</div>',
      restrict: 'E',
      scope: {
        cards: '='
      },
      link: function postLink(scope, element, attrs) {
        var typeName = attrs.typeName;
        scope.title = attrs.title;
        scope.$watch('cards', function(cards) {
          if(cards && cards.length){
            scope.filteredCards = customTypeFilter(cards, typeName);
          }
        }, true);
      }
    };
  }]);
