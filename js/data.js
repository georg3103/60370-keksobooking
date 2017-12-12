'use strict';

window.data = (function () {

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var LIST_CHECK_IN = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var LIST_CHECK_OUT = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var LIST_APARTMENTS_TYPES = [
    'flat',
    'house',
    'bungalo'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var randomBoolean = function () {
    return Math.random() >= 0.5;
  };

  var getFeatures = function (array) {
    return array.slice().sort(function () {
      return 0.5 - Math.random();
    }).filter(randomBoolean);
  };

  var getRandomArbitrary = window.util.getRandomArbitrary;

  var getOffers = function (amount) {


    var userNumList = [];

    for (var i = 1; i <= amount; i++) {
      if (i < 10) {
        userNumList.push('0' + i.toString());
      } else {
        userNumList.push(i.toString());
      }
    }

    window.util.getRandomArray(userNumList);

    var offerList = [];

    for (var j = 0; j < amount; j++) {
      offerList.push({});
      offerList[j].author = 'img/avatars/user' + userNumList[j].toString() + '.png';

      offerList[j].offer = {};
      offerList[j].offer.title = TITLES[j];
      offerList[j].offer.price = getRandomArbitrary(1000, 1000000);
      offerList[j].offer.type = LIST_APARTMENTS_TYPES[getRandomArbitrary(0, 2)];
      offerList[j].offer.rooms = getRandomArbitrary(1, 5);
      offerList[j].offer.guests = getRandomArbitrary(1, 5);
      offerList[j].offer.checkin = LIST_CHECK_IN[getRandomArbitrary(0, 2)];
      offerList[j].offer.checkout = LIST_CHECK_OUT[getRandomArbitrary(0, 2)];
      offerList[j].offer.features = getFeatures(FEATURES);
      offerList[j].offer.description = '';
      offerList[j].offer.photos = [];

      offerList[j].location = {};
      offerList[j].location.x = getRandomArbitrary(300, 900);
      offerList[j].location.y = getRandomArbitrary(100, 500);

      offerList[j].id = j;

      offerList[j].offer.address = '' + offerList[j].location.x + ', ' + offerList[j].location.y + '';
    }
    return offerList;
  };

  return {
    getOffers: getOffers
  };

})();
