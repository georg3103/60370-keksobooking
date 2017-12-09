'use strict';

window.data = (function () {
  // массив с фразами
  var TITLES = [ // data.js
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  // массив с временем
  var LIST_CHECK_IN = [ // data.js
    '12:00',
    '13:00',
    '14:00'
  ];
  var LIST_CHECK_OUT = [ // data.js
    '12:00',
    '13:00',
    '14:00'
  ];
  // массив с типом жилья
  var LIST_APARTMENTS_TYPES = [ // data.js
    'flat',
    'house',
    'bungalo'
  ];
  // массив с услугами
  var FEATURES = [ // data.js
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var randomBoolean = function () { // data.js
    return Math.random() >= 0.5;
  };

  var getFeatures = function (array) { // data.js
    return array.slice().sort(function () {
      return 0.5 - Math.random();
    }).filter(randomBoolean);
  };

  var getOffers = function (amount) { // data.js

    // сделать массив с количеством юзеров
    var userNumList = []; // camelCase, т.к. это переменная, а не константа

    for (var i = 1; i <= amount; i++) {
      if (i < 10) {
        userNumList.push('0' + i.toString());
      } else {
        userNumList.push(i.toString());
      }
    }

    // массив с объектами
    var offerList = [];

    for (var j = 0; j < amount; j++) {
      offerList.push({});
      offerList[j].author = 'img/avatars/user' + userNumList[j].toString() + '.png'; // avatar

      offerList[j].offer = {};
      offerList[j].offer.title = TITLES[j]; // title
      offerList[j].offer.price = window.util.getRandomArbitrary(1000, 1000000); // price
      offerList[j].offer.type = LIST_APARTMENTS_TYPES[window.util.getRandomArbitrary(0, 2)]; // type
      offerList[j].offer.rooms = window.util.getRandomArbitrary(1, 5); // rooms
      offerList[j].offer.guests = window.util.getRandomArbitrary(1, 5); // guests
      offerList[j].offer.checkin = LIST_CHECK_IN[window.util.getRandomArbitrary(0, 2)]; // checkin
      offerList[j].offer.checkout = LIST_CHECK_OUT[window.util.getRandomArbitrary(0, 2)]; // checkout
      offerList[j].offer.features = getFeatures(FEATURES); // features
      offerList[j].offer.description = '';
      offerList[j].offer.photos = [];

      offerList[j].location = {};
      offerList[j].location.x = window.util.getRandomArbitrary(300, 900); // location.x
      offerList[j].location.y = window.util.getRandomArbitrary(100, 500); // location.y

      offerList[j].id = j;

      offerList[j].offer.address = '' + offerList[j].location.x + ', ' + offerList[j].location.y + ''; // adress
    }
    return offerList;
  };

  return {
    getOffers: getOffers
  };

})();
