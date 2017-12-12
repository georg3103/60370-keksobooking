'use strict';

window.maper = (function () {

  var LOCATION = {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 100,
      MAX: 500
    }
  };

  var NUMBER_OF_ADS = 8;

  var MAP_PINS_CLASS = '.map__pins';
  var MAP_PIN_CLASS = 'map__pin';
  var MAP_PIN_MAIN_CLASS = 'map__pin--main';

  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var fieldset = document.querySelectorAll('fieldset');
  var pinMain = map.querySelector('.map__pin--main');
  var pins = map.querySelector('.map__pins');

  var address = document.querySelector('#address');

  var postData = [];

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

    mapIsActive(map);

    pinsAdd();

    formActive(form);
    fieldsetsStatus(fieldset, 'anable');

    pinMain.removeEventListener('mouseup', mouseupHandler);
  }

  pinMain.addEventListener('mouseup', mouseupHandler);

  var mapIsActive = function (element) {
    element.classList.remove('map--faded');
  };

  var formActive = function (element) {
    element.classList.remove('notice__form--disabled');
  };

  function showPins(amount) {
    postData = window.data.getOffers(amount);
    var posts = window.pin.getGeneratedPins(postData);
    window.pin.addPinsToMap(posts, MAP_PINS_CLASS);
  }

  var pinsAdd = function () {
    showPins(NUMBER_OF_ADS);
  };

  pins.addEventListener('click', function (e) {
    var target = e.target;
    if (target.parentNode.classList.contains(MAP_PIN_MAIN_CLASS)) {
      return;
    } else if (target.parentNode.classList.contains(MAP_PIN_CLASS)) {
      target = target.parentNode;
      processPin(target);
    }
  });

  pins.addEventListener('keydown', function (e) {
    if (window.util.isKeyboardEnterKey(e)) {
      pinClickHandler(e);
    }
  });

  function pinClickHandler(e) {
    var pinNode = e.target;
    if (pinNode.classList.contains(MAP_PIN_CLASS)) {
      processPin(pinNode);
    }
  }

  function processPin(pin) {

    window.pin.deactivatePins(pins);

    window.card.removePopups(pins);

    window.pin.activatePin(pin);

    window.card.addCartToMap(postData[getPostNumber(pin)], MAP_PINS_CLASS);

    removePopupEscListener();
  }

  function removePopupEscListener() {
    document.addEventListener('keydown', closePopupEscHandler);
  }

  function deactivateRemovePopupEscListener() {
    document.removeEventListener('keydown', closePopupEscHandler);
  }

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

  pins.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('popup__close')) {
      window.card.removePopups(pins);
      window.pin.deactivatePins(pins);
    }
  });

  var syncFieldWithPin = function (x, y) {
    address.value = 'x: ' + parseInt(x, 10) + ', y: ' + parseInt(y, 10);
  };

  var checkLimit = function (number, limitMin, limitMax) {
    return Math.min(Math.max(number, limitMin), limitMax);
  };

  var setMainPinCoordinates = function (x, y) {
    pinMain.style.left = x + 'px';
    pinMain.style.top = y + 'px';
    pinMain.style.zIndex = '10';
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var mainPinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: mainPinCoords.x - pinMain.offsetLeft,
        y: mainPinCoords.y - pinMain.offsetTop,
      };

      mainPinCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newX = checkLimit(mainPinCoords.x - shift.x, LOCATION.X.MIN, LOCATION.X.MAX);
      var newY = checkLimit(mainPinCoords.y - shift.y, LOCATION.Y.MIN, LOCATION.Y.MAX);

      setMainPinCoordinates(newX, newY);
      syncFieldWithPin(newX, newY);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
