'use strict';
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
  return array.slice().sort(function () {
    return 0.5 - Math.random();
  }).filter(randomBoolean);
}

// генерирует случайное число в диапазоне
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// функция, генерирующая объект
function getOffers(numberObj) {

  // сделать массив с количеством юзеров
  var userNum = []; // camelCase, т.к. это переменная, а не константа

  for (var i = 1; i <= numberObj; i++) {
    if (i < 10) {
      userNum.push('0' + i.toString());
    } else {
      userNum.push(i.toString());
    }
  }

  // массив с объектами
  var offerList = [];

  for (var j = 0; j < numberObj; j++) {
    offerList.push({});
    offerList[j].author = 'img/avatars/user' + userNum[j].toString() + '.png'; // avatar

    offerList[j].offer = {};
    offerList[j].offer.title = TITLE[j]; // title
    offerList[j].offer.price = getRandomArbitrary(1000, 1000000); // price
    offerList[j].offer.type = TYPE[getRandomArbitrary(0, 2)]; // type
    offerList[j].offer.rooms = getRandomArbitrary(1, 5); // rooms
    offerList[j].offer.guests = getRandomArbitrary(1, 5); // guests
    offerList[j].offer.checkin = TIME[getRandomArbitrary(0, 2)]; // checkin
    offerList[j].offer.checkout = TIME[getRandomArbitrary(0, 2)]; // checkout
    offerList[j].offer.features = getFeatures(FEATURES); // features
    offerList[j].offer.description = '';
    offerList[j].offer.photos = [];

    offerList[j].location = {};
    offerList[j].location.x = getRandomArbitrary(300, 900); // location.x
    offerList[j].location.y = getRandomArbitrary(100, 500); // location.y

    offerList[j].offer.address = '' + offerList[j].location.x + ', ' + offerList[j].location.y + ''; // adress
  }
  return offerList;
}

// массив с предложениями жилья
var OFFERS = getOffers(8);

// Task 2
function toggleElement(selector, className) {
  var map = document.querySelector(selector); // принимает на вход селекторы типа '.className' (string)
  map.classList.remove(className); // принимает на вход класс типа 'className' (string)
}

toggleElement('.map', 'map--faded');

// Task 3
function getGeneratedPins(offers) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    var newButton = document.createElement('button');
    newButton.style.left = offers[i].location.x + 'px';
    newButton.style.top = offers[i].location.y + 'px';
    newButton.className = 'map__pin';

    // Добавляет аватар пользователя, устанавливает стили
    var pinImage = document.createElement('img');
    pinImage.src = offers[i].author;
    pinImage.style.width = 40 + 'px';
    pinImage.style.height = 40 + 'px';
    pinImage.setAttribute('draggable', false);
    newButton.appendChild(pinImage);
    fragment.appendChild(newButton);
  }
  return fragment;
}

var GeneratedPins = getGeneratedPins(OFFERS);

// Task 4
var mapPin = document.querySelector('.map__pins');

function addPinsToMap(pins, className) {
  document.querySelector(className); // на вход принимает класс вида '.className' (String)
  mapPin.appendChild(pins); // на вход принимает document-fragment
}

addPinsToMap(GeneratedPins, '.map__pins');

// Task 5
function generateFeatures(itemFeatureList) {
  var listOfli = '';
  for (var i = 0; i <= itemFeatureList.length - 1; i++) {
    listOfli += '<li class="feature feature--' + itemFeatureList[i] + '"></li>';
  }
  return listOfli;
}

function generateCard(offerNumber) {

  var template = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

  template.querySelector.className += 'popup';
  template.querySelector('.popup__avatar').src = offerNumber.author;
  template.querySelector('h3').innerHTML = offerNumber.offer.title;
  template.querySelector('p small').textContent = offerNumber.offer.address;
  template.querySelector('p.popup__price').innerHTML = offerNumber.offer.price + ' &#x20bd;/ночь'; // Как сделать черезе .textContent? Проблема - выдает &#x20bd; вместо знака рубля
  template.querySelector('h4').textContent = offerNumber.offer.type;
  template.querySelector('p:nth-of-type(3)').textContent = offerNumber.offer.rooms + ' комнаты для ' + offerNumber.offer.guests + ' гостей'; // не получается выбрать элемент
  template.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + offerNumber.offer.checkin + ', выезд до ' + offerNumber.offer.checkout; // не получается выбрать элемент
  template.querySelector('ul.popup__features').innerHTML = generateFeatures(offerNumber.offer.features); // неоптимальный способ, можно заменить на рекурсивную функцию
  template.querySelector('p:nth-of-type(5)').textContent = offerNumber.offer.description; // не получается выбрать элемент
  template.querySelector('ul.popup__pictures li img').src = offerNumber.author;

  return template;
}

var firstCart = generateCard(OFFERS[0]);

function addCartToMap(cart) {
  return mapPin.appendChild(cart);
}

addCartToMap(firstCart);
