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
      template: '<li class="collection-card" preview-attr="card">' +
                  '{{card.count}} <span ng-hide="showmenu">{{card.name}}</span>' +
                  '<div class="card-mini-menu" ng-show="showmenu"><span class="glyphicon glyphicon-arrow-up"></span><span class="glyphicon glyphicon-arrow-down"></span><span class="glyphicon glyphicon-certificate"></span><span class="glyphicon glyphicon-remove"></span></div>'+
                  '<span class="glyphicon glyphicon-cog" ng-click="toggleMenu()"></span>' +
                '</li>',
      restrict: 'E',
      scope: {
        card: '=cardData'
      },
      link: function postLink(scope) {
        scope.showmenu = false;
        scope.card.count = scope.card.count || 1;
        scope.hideCmc = _.contains(scope.card.types, 'land');
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        var editions = _.reject(scope.card.editions, { multiverse_id: 0 });
        // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        scope.rarity = editions[0].rarity;

        scope.toggleMenu = function(){
          scope.showmenu = !scope.showmenu;
        };
      }
    };
  }]);
