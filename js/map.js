var OFFERS = [];
// функция, генерирующая объект

function makeObject(numberObj) {

  // сделать массив с количеством юзеров
  var USERNUM = [];
  for (var i = 1; i <= numberObj; i++) {
    if (i < 10) {
      USERNUM.push('0' + i.toString());
    } else {
      USERNUM.push(i.toString());
    }
  }

  // генерирует случайное число в диапазоне
  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  // массив с фразами
  var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  // массив с временем
  var TIME = ['12:00', '13:00', '14:00'];

  // массив с типом жилья
  var TYPE = ['flat', 'house', 'bungalo'];

  // массив с типом жилья
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  function getFeatures (numFeatures) {
    var featuresList = [];
    for (var i = 0; i <= numFeatures; i++) {
      featuresList.push(FEATURES[i]);
    }
    return featuresList;
  }

  // 'img/avatars/user' + USERNAME[i] + '.png'


  for (var i = 0; i < numberObj; i++) {
    OFFERS.push({});
    OFFERS[i].author = 'img/avatars/user' + USERNUM[i].toString() + '.png'; // avatar // avatar

    OFFERS[i].offer = {};
    OFFERS[i].offer.title = TITLE[i]; // title
    OFFERS[i].offer.price = getRandomArbitrary(1000, 1000000); // price
    OFFERS[i].offer.type = TYPE[getRandomArbitrary(0, 2)]; // type
    OFFERS[i].offer.rooms = getRandomArbitrary(1, 5); // rooms
    OFFERS[i].offer.guests = getRandomArbitrary(1, 5); // guests
    OFFERS[i].offer.checkin = TIME[getRandomArbitrary(0, 2)]; // checkin
    OFFERS[i].offer.checkout = TIME[getRandomArbitrary(0, 2)]; // checkout
    OFFERS[i].offer.features = getFeatures(getRandomArbitrary(1, FEATURES.length)); // features
    OFFERS[i].offer.description = '';
    OFFERS[i].offer.photos = [];

    OFFERS[i].location = {};
    OFFERS[i].location.x = getRandomArbitrary(300, 900); // location.x
    OFFERS[i].location.y = getRandomArbitrary(100, 500); // location.y

    OFFERS[i].offer.address = '' + OFFERS[i].location.x + ', ' + OFFERS[i].location.y + ''; // adress
  };

};

makeObject(4);

console.log(OFFERS)

// Task 2
var MAP = document.querySelector('.map');
MAP.classList.remove('map--faded');

// Task 3

console.log(OFFERS[1].location.x + 'px');

var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

for (var i = 0; i < OFFERS.length - 1; i++) {
  var newButton = document.createElement('button');
  newButton.style.left = OFFERS[i].location.x;
  newButton.style.top = OFFERS[i].location.y;
  newButton.innerHTML = '<img src=' +OFFERS[i].author.avatar + ' width='40' height='40' draggable='false'>';
  fragment.appendChild(newButton);
}

mapPin.appendChild(fragment);
