'use strict';

/**
 * @ngdoc service
 * @name alexandriaApp.deckbrewAPI
 * @description
 * # deckbrewAPI
 * Factory in the alexandriaApp.
 */
angular.module('alexandriaApp')
  .factory('deckbrewAPI', ['$http', function($http) {
    var urlBase = 'https://api.deckbrew.com/mtg/';

    function getCard(id) {
      return $http.get(urlBase + 'cards/' + id);
    }

    function typeahead(searchTerm) {
      return $http.get(urlBase + 'cards/typeahead?q=' + searchTerm);
    }

    // Public API here
    return {
      getCard: getCard,
      typeahead: typeahead
    };
  }]);
