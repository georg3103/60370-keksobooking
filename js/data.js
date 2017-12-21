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
    if (data.constructor !== Array) {  // тут по-другому сделай, словил ошибку, но не смог воспроизвести
      return; // замени return на data = [];
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
    offers = getFilteredOffers();
    var pinId = parseInt(pin.dataset.pinId, 10);

    if (!offers[pinId]) {
      return -1;
    }

    return offers[pinId];
  };

  return {
    setOffers: setOffers,
    getOffers: getOffers,
    setFilteredOffers: setFilteredOffers,
    getFilteredOffers: getFilteredOffers,
    findPinById: findPinById
  };

})();
