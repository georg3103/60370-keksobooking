'use strict';

window.data = (function () {
  var offers = {
    /** Нормальные офферы */
    normal: [],
    /** Отфильтрованные */
    filtered: []
  };

  var setFilteredOffers = function(data) {
    setOffers(data, true);
  };

  var setOffers = function(data, isFilteredOffers) {
    if (data.constructor !== Array) {
      return;
    }
    if (isFilteredOffers) {
      offers.filtered = data;

      return;
    }
    offers.normal = data;
  };

  var getOffers = function () {
    return offers.normal.slice();
  };

  var getFilteredOffers = function () {
    return offers.filtered.slice();
  };

  var findPinById = function (pin) {
    var offers = getFilteredOffers();
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
