'use strict';
var KEYBOARD_KEY_ENTER = 13;
var KEYBOARD_KEY_ESC = 27;
// массив с фразами
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
// массив с временем
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
// массив с типом жилья
var LIST_APARTMENTS_TYPES = [
  'flat',
  'house',
  'bungalo'
];
// массив с услугами
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
function getOffers(amount) {

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
    offerList[j].offer.price = getRandomArbitrary(1000, 1000000); // price
    offerList[j].offer.type = LIST_APARTMENTS_TYPES[getRandomArbitrary(0, 2)]; // type
    offerList[j].offer.rooms = getRandomArbitrary(1, 5); // rooms
    offerList[j].offer.guests = getRandomArbitrary(1, 5); // guests
    offerList[j].offer.checkin = LIST_CHECK_IN[getRandomArbitrary(0, 2)]; // checkin
    offerList[j].offer.checkout = LIST_CHECK_OUT[getRandomArbitrary(0, 2)]; // checkout
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

// Task 2
function toggleElement(selector, className) {
  var map = document.querySelector(selector); // принимает на вход селекторы типа '.className' (string)
  map.classList.remove(className); // принимает на вход класс типа 'className' (string)
}

toggleElement('.map', 'map--faded');

// Task 3
function getGeneratedPins(listOfOffers) {

  var offers = listOfOffers;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    var newButton = document.createElement('button');
    newButton.style.left = offers[i].location.x + 'px';
    newButton.style.top = offers[i].location.y + 'px';
    newButton.className = 'map__pin';

    // добавляем уникальный ID
    newButton.dataset.id = 'pin' + i;

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

// Task 4
function addPinsToMap(listOfOffers) {
  var mapPin = document.querySelector('.map__pins');
  mapPin.appendChild(listOfOffers); // на вход принимает document-fragment
}

// Task 5
function generateFeatures(itemFeatureList) {
  var listOfli = '';
  for (var i = 0; i <= itemFeatureList.length - 1; i++) {
    listOfli += '<li class="feature feature--' + itemFeatureList[i] + '"></li>';
  }
  return listOfli;
}

function generateCard(postNumber) {

  var offerNumber = postNumber;

  var template = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

  template.querySelector('.popup__avatar').src = offerNumber.author;
  template.querySelector('h3').innerHTML = offerNumber.offer.title;
  template.querySelector('p small').textContent = offerNumber.offer.address;
  template.querySelector('p.popup__price').innerHTML = offerNumber.offer.price + ' &#x20bd;/ночь';
  template.querySelector('h4').textContent = offerNumber.offer.type;
  template.querySelector('p:nth-of-type(3)').textContent = offerNumber.offer.rooms + ' комнаты для ' + offerNumber.offer.guests + ' гостей';
  template.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + offerNumber.offer.checkin + ', выезд до ' + offerNumber.offer.checkout;
  template.querySelector('ul.popup__features').innerHTML = generateFeatures(offerNumber.offer.features);
  template.querySelector('p:nth-of-type(5)').textContent = offerNumber.offer.description;
  template.querySelector('ul.popup__pictures li img').src = offerNumber.author;

  return template;
}

function addCartToMap(postNumber) {
  var cart = generateCard(postNumber);
  var mapPin = document.querySelector('.map__pins');
  return mapPin.appendChild(cart);
}

/* ОБРАБОТКА СОБЫТИЙ */

// проверка на нажатие ENTER
function isKeyboardEnterKey(e) {
  return KEYBOARD_KEY_ENTER === e.keyCode;
}

// проверка на нажатие ESC
function isKeyboardEscKey(e) {
  return KEYBOARD_KEY_ESC === e.keyCode;
}

function initInterface() {
  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var fieldset = document.querySelectorAll('fieldset');
  var pinMain = map.querySelector('.map__pin--main');
  var pins = map.querySelector('.map__pins');

  var postData = [];

  // Карта затемнена (добавлен класс map--faded)
  mapIsFaded(map);
  // Форма неактивна (добавлен класс notice__form--disabled, все поля формы недоступны)
  fieldsetsStatus(fieldset, 'disabled');
  // Активация формы и карты

  function handler() { // НУЖНО ЗАДАТЬ НОРМАЛЬНОЕ НАЗВАНИЕ
    // Карта активна
    mapIsActive(map);
    // добавляем новые и удаляем старые пины
    pinsAdd();
    // Активация формы
    formActive(form);
    fieldsetsStatus(fieldset, 'anable');
    // удаляем обработчик событий
    pinMain.removeEventListener('mouseup', handler);
  }
  pinMain.addEventListener('mouseup', handler);

  function mapIsFaded(element) {
    element.classList.add('map--faded');
  }

  function mapIsActive(element) {
    element.classList.remove('map--faded');
  }


  // для элемента добавлен/убран класс map--faded
  function formActive(element) {
    element.classList.remove('notice__form--disabled');
  }

  // добавляем пины на карту
  function showPins(amount) {
    postData = getOffers(amount);
    var posts = getGeneratedPins(postData);
    addPinsToMap(posts);
  }

  function pinsAdd() {
    showPins(8);
  }

  // у элемента убирается/добавляется аттрибут disabled
  function fieldsetsStatus(element, flag) {
    for (var i = 0; i < element.length; i++) {
      if (flag === 'disabled') {
        element[i].setAttribute('disabled', 'disabled');
      } else if (flag === 'anable') {
        element[i].removeAttribute('disabled', 'disabled');
      }
    }
  }

  // ДОБАВЛЯЕМ Показ/скрытие карточки объявления по нажатию на пин

  pins.addEventListener('click', function (e) {
    var target = e.target;
    if (target.parentNode.classList.contains('map__pin--main')) {
      return;
    }
    if (target.parentNode.classList.contains('map__pin')) {
      target = target.parentNode;
    } else {
      return;
    }

    processPin(target);
  });

  // Открытие карточки пина по ENTER
  pins.addEventListener('keydown', function (e) {
    if (isKeyboardEnterKey(e)) {
      pinClickHandler(e);
    }
  });

  // Handler для взаимодействия пина с ENTER
  function pinClickHandler(e) {
    var pinNode = e.target;
    if (!pinNode.classList.contains('map__pin')) {
      return;
    }

    processPin(pinNode);
  }

  function processPin(pin) {
    // удаляем классы со старых пинов
    deactivatePins();
    // удаляем дубликаты объявлений слева (popups)
    removePopups();
    // добавляем класс map__pin--active выбранному пину
    activatePin(pin);
    // выводим объявление слева
    addCartToMap(postData[getPostNumber(pin)]);
    // добавить взаимодействие по ESC
    removePopupEscListener();
  }

  // Закрытие попапа по ESC
  function removePopupEscListener() {
    document.addEventListener('keydown', closePopupEscHandler);
  }

  // удаление handler закрытия попапа по ESC
  function deactivateRemovePopupEscListener() {
    document.removeEventListener('keydown', closePopupEscHandler);
  }

  // Закрыть попап по ESC
  function closePopupEscHandler(e) {
    if (isKeyboardEscKey(e)) {
      removePopups();
      deactivatePins();
    }
  }

  function activatePin(target) {
    target.classList.add('map__pin--active');
  }

  function deactivatePins() {
    Array.prototype.slice.call(pins.children).forEach(function (pin) {
      deactivatePin(pin);
    });
  }

  function deactivatePin(pin) {
    if (pin.classList.contains('map__pin')) {
      pin.classList.remove('map__pin--active');
    } else {
      return;
    }
  }

  function getPostNumber(target) {
    var postNumber = target.getAttribute('data-id');
    if (postNumber.includes('pin')) {
      postNumber = postNumber.match(/\d+/g).map(Number)[0];
      return postNumber;
    }
    return null;
  }

  function removePopups() {
    Array.prototype.slice.call(pins.children).forEach(function (item) {
      if (item.classList.contains('popup')) {
        item.remove();
      }
    });
  }

  deactivateRemovePopupEscListener();

  // Закрытие попапа

  pins.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('popup__close')) {
      removePopups();
      deactivatePins();
    }
  });

}

initInterface();
