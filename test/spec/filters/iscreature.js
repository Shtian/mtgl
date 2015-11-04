'use strict';

describe('Filter: isCreature', function () {

  // load the filter's module
  beforeEach(module('alexandriaApp'));

  // initialize a new instance of the filter before each test
  var isCreature;
  beforeEach(inject(function ($filter) {
    isCreature = $filter('isCreature');
  }));

  it('should return only cards with type array containing string "creature" as the first element', function () {
    var cards = [{ types: ['creature', 'enchantment']}, {types: ['enchantment']}, {types: ['enchantment', 'creature']}];
    var result = isCreature(cards);
    expect(result.length).toBe(1);
  });
});
