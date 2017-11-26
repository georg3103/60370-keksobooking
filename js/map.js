'use strict';
// массив с объектами
var OFFERS = [];
// массив с фразами
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
// массив с временем
var TIME = ['12:00', '13:00', '14:00'];
// массив с типом жилья
var TYPE = ['flat', 'house', 'bungalo'];
// массив с типом жилья
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var randomBoolean = function () {
  return Math.random() >= 0.5;
};

function getFeatures(array) {
  var tempArray = array.slice();
  return tempArray.sort(function () {
    return 0.5 - Math.random();
  }).filter(randomBoolean);
}

// генерирует случайное число в диапазоне
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

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

  for (var i = 0; i < numberObj; i++) {
    OFFERS.push({});
    OFFERS[i].author = 'img/avatars/user' + USERNUM[i].toString() + '.png'; // avatar

    OFFERS[i].offer = {};
    OFFERS[i].offer.title = TITLE[i]; // title
    OFFERS[i].offer.price = getRandomArbitrary(1000, 1000000); // price
    OFFERS[i].offer.type = TYPE[getRandomArbitrary(0, 2)]; // type
    OFFERS[i].offer.rooms = getRandomArbitrary(1, 5); // rooms
    OFFERS[i].offer.guests = getRandomArbitrary(1, 5); // guests
    OFFERS[i].offer.checkin = TIME[getRandomArbitrary(0, 2)]; // checkin
    OFFERS[i].offer.checkout = TIME[getRandomArbitrary(0, 2)]; // checkout
    OFFERS[i].offer.features = getFeatures(FEATURES); // features
    OFFERS[i].offer.description = '';
    OFFERS[i].offer.photos = [];

    OFFERS[i].location = {};
    OFFERS[i].location.x = getRandomArbitrary(300, 900); // location.x
    OFFERS[i].location.y = getRandomArbitrary(100, 500); // location.y

    OFFERS[i].offer.address = '' + OFFERS[i].location.x + ', ' + OFFERS[i].location.y + ''; // adress
  }

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

function generateFeatures(itemFeatureList) {
  var listOfli = '';
  for (var i = 0; i <= itemFeatureList.length - 1; i++) {
    listOfli += '<li class="feature feature--' + itemFeatureList[i] + '"></li>';
  }
  return listOfli;
}

function generateCards() {

  var articleTemplate = document.querySelector('template').content.querySelector('article.map__card');

  var template = articleTemplate.cloneNode(true);
  template.querySelector.className += 'popup';
  template.querySelector('.popup__avatar').src = OFFERS[0].author;
  template.querySelector('h3').innerHTML = OFFERS[0].offer.title;
  template.querySelector('p small').innerHTML = OFFERS[0].offer.address;
  template.querySelector('p.popup__price').innerHTML = OFFERS[0].offer.price + ' &#x20bd;/ночь';
  template.querySelector('h4').innerHTML = OFFERS[0].offer.type;
  template.querySelector('p:nth-of-type(3)').innerHTML = OFFERS[0].offer.rooms + ' комнаты для ' + OFFERS[0].offer.guests + ' гостей'; // не получается выбрать элемент
  template.querySelector('p:nth-of-type(4)').innerHTML = 'Заезд после ' + OFFERS[0].offer.checkin + ', выезд до ' + OFFERS[0].offer.checkout; // не получается выбрать элемент
  template.querySelector('ul.popup__features').innerHTML = generateFeatures(OFFERS[0].offer.features);
  template.querySelector('p:nth-of-type(5)').innerHTML = OFFERS[0].offer.description; // не получается выбрать элемент
  template.querySelector('ul.popup__pictures li img').src = OFFERS[0].author;

  mapPin.appendChild(template);
}

generateCards();
