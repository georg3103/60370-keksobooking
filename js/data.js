'use strict';

window.data = (function () {

  var getOffers = function (data) {

    var offerList = [];

    if (offerList.constructor === Array) {
      offerList = data;
    }

    return offerList;
  };

  return {
    getOffers: getOffers
  };

})();
