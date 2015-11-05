'use strict';

describe('Filter: customType', function () {

  // load the filter's module
  beforeEach(module('alexandriaApp'));

  // initialize a new instance of the filter before each test
  var customType;
  beforeEach(inject(function ($filter) {
    customType = $filter('customType');
  }));

  it('should return card having the first type matching the given name', function () {
    var cards = [{ types: ['instant', 'enchantment']}, {types: ['creature']}, {types: ['enchantment', 'instant']}];
    var result = customType(cards, 'instant');
    expect(result.length).toBe(1);
  });

  it('should return empty array when filtering empty list', function () {
    var cards = [];
    var result = customType(cards, 'instant');
    expect(result.length).toBe(0);
  });

});
