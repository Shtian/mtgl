'use strict';

/**
 * @ngdoc directive
 * @name alexandriaApp.directive:collectionNavigation
 * @description
 * # collectionNavigation
 */
angular.module('alexandriaApp')
  .directive('collectionNavigation', function () {
    return {
      template: '<a ng-href="#/collection/{{collectionId}}" class="{{overviewClass}}"><span class="glyphicon glyphicon-list"></span> Overview</a>' +
                '<a ng-href="#/collection/{{collectionId}}/import" class="{{importClass}}"><span class="glyphicon glyphicon-import"></span> Import</a>',
      restrict: 'E',
      scope: {
        current: '@',
        collectionId: '@'
      },
      link: function postLink(scope) {
        scope.overviewClass = scope.current === 'overview' ? 'active' : '';
        scope.importClass = scope.current === 'import' ? 'active' : '';
      }
    };
  });
