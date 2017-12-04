'use strict';
var KEYBOARD_KEY_ENTER = 13;
var KEYBOARD_KEY_ESC = 27;
// массив с фразами
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
// массив с временем
var LIST_CHECK_IN = ['12:00', '13:00', '14:00'];
var LIST_CHECK_OUT = ['12:00', '13:00', '14:00'];
// массив с типом жилья
var LIST_APARTMENTS_TYPES = ['flat', 'house', 'bungalo'];
// массив с услугами
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

// console.log('getOffers(8)');
// console.log(getOffers(8));

// массив с предложениями жилья
// var OFFERS = getOffers(8);

// Task 2
function toggleElement(selector, className) {
  var map = document.querySelector(selector); // принимает на вход селекторы типа '.className' (string)
  map.classList.remove(className); // принимает на вход класс типа 'className' (string)
}

toggleElement('.map', 'map--faded');


// var LIST_OFFERS = [];

// Task 3
function getGeneratedPins(listOfOffers) {
  // var offers = getOffers(amount);
  // LIST_OFFERS = offers;

  var offers = listOfOffers;
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

// var GeneratedPins = getGeneratedPins(OFFERS);

// Task 4
function addPinsToMap(listOfOffers) { // было (pinsAmount)
  var mapPin = document.querySelector('.map__pins');
  // var pins = getGeneratedPins(listOfOffers); // было (pinsAmount)
  mapPin.appendChild(listOfOffers); // на вход принимает document-fragment
}

// addPinsToMap(8);

// Task 5
function generateFeatures(itemFeatureList) {
  var listOfli = '';
  for (var i = 0; i <= itemFeatureList.length - 1; i++) {
    listOfli += '<li class="feature feature--' + itemFeatureList[i] + '"></li>';
  }
  return listOfli;
}

function generateCard(postData, cartNumber) {

  var offerNumber = postData[cartNumber];

  var template = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

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

// var firstCart = generateCard(0);

function addCartToMap(listOfOffers, cartNumber) {
  var cart = generateCard(listOfOffers, cartNumber);
  var mapPin = document.querySelector('.map__pins');
  return mapPin.appendChild(cart);
}

// addCartToMap(2);

/* ОБРАБОТКА СОБЫТИЙ */

function initInterface() {
  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var fieldset = document.getElementsByTagName('fieldset');
  var pinMain = map.querySelector('.map__pin--main');
  var pins = map.querySelector('.map__pins');

  var postData = [];

  // Карта затемнена (добавлен класс map--faded)
  mapToggle(map);
  // Форма неактивна (добавлен класс notice__form--disabled, все поля формы недоступны)
  fieldsetsToggle(fieldset, 'disabled');
  // Активация формы и карты
  pinMain.addEventListener('mouseup', function () {
    // debugger;
    // Карта активна
    mapToggle(map);
    // добавляем новые и удаляем старые пины
    pinsToggle();
    // Активация формы
    formToggle(form);
    fieldsetsToggle(fieldset, 'able');
    // добавляем карточку слева по умолчанию, чтобы проверить, что все работает

  });

  // для элемента добавлен/убран класс map--faded
  function mapToggle(element) {
    element.classList.toggle('map--faded');
  }

  // для элемента добавлен/убран класс map--faded
  function formToggle(element) {
    element.classList.toggle('notice__form--disabled');
  }

  function removeChildNodes(node, startPosition) {
    if (!node) {
      return;
    }
    while (node.children[startPosition]) {
      node.removeChild(node.children[startPosition]);
    }
  }

  // убираем сгенерированные пины
  function removePins(pinNodes) {
    removeChildNodes(pinNodes, 2);
  }

  function showPins(amount) {
    postData = getOffers(amount);
    var posts = getGeneratedPins(postData);
    console.log(postData);
    addPinsToMap(posts);
  }

  function pinsToggle() {
    if (map.classList.contains('map--faded')) {
      removePins(pins);
    } else {
      // addPinsToMap(8);
      showPins(8);
    }
  }

  // у элемента убирается/добавляется аттрибут disabled
  function fieldsetsToggle(element, flag) {
    if (flag === 'disabled') {
      for (var i = 0; i < element.length; i++) {
        element[i].setAttribute('disabled', 'disabled');
      }
    }
    if (flag === 'able') {
      for (var j = 0; j < element.length; j++) {
        element[j].removeAttribute('disabled', 'disabled');
      }
    }
  }

  // ДОБАВЛЯЕМ Показ/скрытие карточки объявления по нажатию на пин

  // function chooseCart() {

  // }

  pins.addEventListener('click', function (e) {
    var target = e.target;
    if (target.parentNode.classList.contains('map__pin--main')) {
      return;
    }
    if (target.parentNode.classList.contains('map__pin')) {
      target = target.parentNode;
    }
    else {
      return;
    }
    console.log(target.tagName);
    processPin(target);
  });

  function processPin(pin) {
    // удаляем классы со старых пинов
    deactivatePins();
    // удаляем дубликаты объявлений слева (popups)
    removePopups();
    // добавляем класс map__pin--active выбранному пину
    activatePin(pin);
    // находим номер порядковый номер пина в массиве postData
    getPostNumber(pin);
    // выводим объявление слева
    addCartToMap(postData, getPostNumber(pin));
  }

  function activatePin(target) {
    if (target.classList.contains('map__pin--main')) { // присваивать класс map__pin--active главному пользователю не надо
      return;
    } else {
      target.classList.add('map__pin--active');
    }
  }

  function deactivatePins() {
    Array.from(pins.children).forEach(function (pin) {
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
    var coordinateX = parseInt(target.style.left, 10);
    var coordinateY = parseInt(target.style.top, 10);

    console.log('Парсим переданную ноду');
    console.log(coordinateX);
    console.log(coordinateY);

    // Находим данные для шаблона в массиве Pin'ов по коордиинатам х и у
    var postInfo = getPostBylocation(coordinateX, coordinateY);
    console.log(postInfo);

    return postInfo;
  }

  function getPostBylocation(x, y) {
    for (var i = 0; i < postData.length; i++) {
      if (postData[i].location.x === x && postData[i].location.y === y) {
        return i;
      }
    }

    return null;
  }

  function removePopups() {
    Array.from(pins.children).forEach(function (item) {
      if (item.classList.contains('popup')) {
        item.remove();
      }
    });
  }

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
