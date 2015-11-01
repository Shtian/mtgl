'use strict';

describe('Service: deckbrewAPI', function () {

  // load the service's module
  beforeEach(module('alexandriaApp'));

  // instantiate service
  var deckbrewAPI;
  beforeEach(inject(function (_deckbrewAPI_) {
    deckbrewAPI = _deckbrewAPI_;
  }));

  it('should do something', function () {
    expect(!!deckbrewAPI).toBe(true);
  });

});
