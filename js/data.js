'use strict';

window.data = (function () {

  var offerList = [];

  var getOffers = function (data) {

    if (offerList.constructor === Array) {
      offerList = data;
    }

    return offerList;
  };

  var getOffersList = function () {
    return offerList.slice();
  };

  return {
    getOffers: getOffers,
    getOffersList: getOffersList
  };

})();
