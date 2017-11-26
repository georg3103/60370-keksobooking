'use strict';
// массив с объетами
var OFFERS = [];
// массив с фразами
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
// массив с временем
var TIME = ['12:00', '13:00', '14:00'];
// массив с типом жилья
var TYPE = ['flat', 'house', 'bungalo'];
// массив с типом жилья
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// функция, генерирующая объект
function makeObject(numberObj) {
  var USERNUM = [];
  // сделать массив с количеством юзеров
  function getUserNumber() {
    for (var i = 1; i <= numberObj; i++) {
      if (i < 10) {
        USERNUM.push('0' + i.toString());
      } else {
        USERNUM.push(i.toString());
      }
    }
    return USERNUM;
  }
  getUserNumber();
  // генерирует случайное число в диапазоне
  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function getFeatures(numFeatures) {
    var featuresList = [];
    for (var i = 0; i <= numFeatures - 1; i++) {
      featuresList.push(FEATURES[i]);
    }
    return featuresList;
  }

  function generateObj() {
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
    }
  }

  generateObj();
}
makeObject(8);

// Task 2
var MAP = document.querySelector('.map');
MAP.classList.remove('map--faded');

// Task 3
var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

function makeUser() {
  for (var i = 0; i < OFFERS.length; i++) {
    var newButton = document.createElement('button');
    newButton.style.position = 'absolute'; // Можно ли так делать?
    newButton.style.left = OFFERS[i].location.x.toString() + 'px';
    newButton.style.top = OFFERS[i].location.y.toString() + 'px';
    newButton.innerHTML = '<img src=' + OFFERS[i].author + ' width="40" height="40" draggable="false">';
    fragment.appendChild(newButton);
  }
}

makeUser();
// Task 4
mapPin.appendChild(fragment);

// Task 5

function generateCards() {

  function generateFeatures(itemFeatureList) {
    var listOfli = '';
    for (var i = 0; i <= itemFeatureList.length - 1; i++) {
      listOfli += '<li class="feature feature--' + itemFeatureList[i] + '"></li>';
    }
    return listOfli;
  }

  for (var i = 0; i <= OFFERS.length; i++) {
    var newArticle = document.createElement('article');
    newArticle.classList.add('map__card', 'popup');
    newArticle.innerHTML = '<img src=' + OFFERS[i].author + ' class="popup__avatar" width="70" height="70">';
    newArticle.innerHTML += '<button class="popup__close">Закрыть</button>';
    newArticle.innerHTML += '<h3>' + OFFERS[i].offer.title + '</h3>';
    newArticle.innerHTML += '<p><small>' + OFFERS[i].offer.address + '</small></p>';
    newArticle.innerHTML += '<p class="popup__price">' + OFFERS[i].offer.price + ' &#x20bd;/ночь</p>';
    newArticle.innerHTML += '<h4>' + OFFERS[i].offer.type + '</h4>';
    newArticle.innerHTML += '<p>' + OFFERS[i].offer.rooms + ' комнаты для ' + OFFERS[i].offer.guests + ' гостей</p>';
    newArticle.innerHTML += '<p>Заезд после ' + OFFERS[i].offer.checkin + ', выезд до ' + OFFERS[i].offer.checkout + '</p>';
    newArticle.innerHTML += '<ul class="popup__features">';
    newArticle.innerHTML += generateFeatures(OFFERS[i].offer.features);
    newArticle.innerHTML += '</ul>';
    newArticle.innerHTML += '<p>' + OFFERS[i].offer.description + '</p>';
    newArticle.innerHTML += '<ul class="popup__pictures"><li><img src="' + OFFERS[i].author + '"></li></ul>';

    mapPin.appendChild(newArticle);
  }
}

generateCards();

