'use strict';

window.data = (function () {
  var offers = {
    all: [],
    filtered: []
  };

  var setFilteredOffers = function (data) {
    setOffers(data, true);
  };

  var setOffers = function (data, isFilteredOffers) {
    if (data.constructor !== Array) {
      data = [];
    }
    if (isFilteredOffers) {
      offers.filtered = data;

      return;
    }
    offers.all = data;
  };

  var getOffers = function () {
    return offers.all.slice();
  };

  var getFilteredOffers = function () {
    return offers.filtered.slice();
  };

  var findPinById = function (pin) {
    var gilteredOffers = getFilteredOffers();
    var pinId = parseInt(pin.dataset.pinId, 10);

    if (!gilteredOffers[pinId]) {
      return -1;
    }

    return gilteredOffers[pinId];
  };

  return {
    setOffers: setOffers,
    getOffers: getOffers,
    setFilteredOffers: setFilteredOffers,
    getFilteredOffers: getFilteredOffers,
    findPinById: findPinById
  };

})();
