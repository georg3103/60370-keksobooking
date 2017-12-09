'use strict';

window.maper = (function () {

  var NUMBER_OF_ADS = 8;

  var MAP_PINS = '.map__pins';
  var MAP_PIN = 'map__pin';
  var MAP_PIN_MAIN = 'map__pin--main';

  var map = document.querySelector('.map'); // MAPER +
  var form = document.querySelector('.notice__form'); // MAPER +
  var fieldset = document.querySelectorAll('fieldset'); // MAPER +
  var pinMain = map.querySelector('.map__pin--main'); // MAPER +
  var pins = map.querySelector('.map__pins'); // MAPER +

  var postData = []; // MAPER +

  var mapIsFaded = function (element) {
    element.classList.add('map--faded');
  };

  var fieldsetsStatus = function (element, flag) {
    for (var i = 0; i < element.length; i++) {
      if (flag === 'disabled') {
        element[i].setAttribute('disabled', 'disabled');
      } else if (flag === 'anable') {
        element[i].removeAttribute('disabled', 'disabled');
      }
    }
  };

  mapIsFaded(map);

  fieldsetsStatus(fieldset, 'disabled');

  function mouseupHandler() {
    // Карта активна
    mapIsActive(map);
    // добавляем новые и удаляем старые пины
    pinsAdd();
    // Активация формы
    formActive(form);
    fieldsetsStatus(fieldset, 'anable');
    // удаляем обработчик событий
    pinMain.removeEventListener('mouseup', mouseupHandler);
  }

  pinMain.addEventListener('mouseup', mouseupHandler);

  var mapIsActive = function (element) {
    element.classList.remove('map--faded');
  };


  // для элемента добавлен/убран класс map--faded
  var formActive = function (element) {
    element.classList.remove('notice__form--disabled');
  };

  // добавляем пины на карту
  function showPins(amount) {
    postData = window.data.getOffers(amount);
    var posts = window.pin.getGeneratedPins(postData);
    window.pin.addPinsToMap(posts, MAP_PINS);
  }

  var pinsAdd = function () {
    showPins(NUMBER_OF_ADS);
  };

  pins.addEventListener('click', function (e) {
    var target = e.target;
    if (target.parentNode.classList.contains(MAP_PIN_MAIN)) {
      return;
    } else if (target.parentNode.classList.contains(MAP_PIN)) {
      target = target.parentNode;
      processPin(target);
    }
  });

  // Открытие карточки пина по ENTER
  pins.addEventListener('keydown', function (e) {
    if (window.util.isKeyboardEnterKey(e)) {
      pinClickHandler(e);
    }
  });

  // Handler для взаимодействия пина с ENTER
  function pinClickHandler(e) {
    var pinNode = e.target;
    if (pinNode.classList.contains(MAP_PIN)) {
      processPin(pinNode);
    }
  }

  function processPin(pin) {
    // удаляем классы со старых пинов
    window.pin.deactivatePins(pins);
    // удаляем дубликаты объявлений слева (popups)
    window.card.removePopups(pins);
    // добавляем класс map__pin--active выбранному пину
    window.pin.activatePin(pin);
    // выводим объявление слева
    window.card.addCartToMap(postData[getPostNumber(pin)], MAP_PINS);
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
    if (window.util.isKeyboardEscKey(e)) {
      window.card.removePopups(pins);
      window.pin.deactivatePins(pins);
    }
  }
  function getPostNumber(target) {
    var postNumber = target.dataset.pinId;
    postNumber = parseInt(postNumber, 10);
    return postNumber;
  }

  deactivateRemovePopupEscListener();

  // Закрытие попапа

  pins.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('popup__close')) {
      window.card.removePopups(pins);
      window.pin.deactivatePins(pins);
    }
  });

})();
