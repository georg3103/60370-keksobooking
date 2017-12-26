'use strict';

window.map = (function () {
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

  var PIN_SIZES = {
    width: 62,
    height: 42
  };

  var MAP_PINS_CLASS = '.map__pins';
  var MAP_PIN_CLASS = 'map__pin';
  var MAP_PIN_MAIN_CLASS = 'map__pin--main';

  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var fieldset = document.querySelectorAll('fieldset');
  var pinMain = map.querySelector('.map__pin--main');
  var pins = map.querySelector('.map__pins');
  var pinFilters = document.querySelector('.map__filters');
  var address = document.querySelector('#address');

  var getData = function (data) {
    window.data.setOffers(data);
    window.data.setFilteredOffers(data);

    var posts = window.pin.getGeneratedPins(window.data.getOffers());

    window.pin.addPinsToMap(posts, MAP_PINS_CLASS);
  };

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

  function mouseupHandler() {
    mapIsActive(map);

    window.backend.load(getData, window.backend.error);

    formActive(form);

    fieldsetsStatus(fieldset, 'anable');

    pinMain.removeEventListener('mouseup', mouseupHandler);
  }

  var mapIsActive = function (element) {
    element.classList.remove('map--faded');
  };

  var formActive = function (element) {
    element.classList.remove('notice__form--disabled');
  };

  var reRenderPins = function (event) {
    return function () {
      var filteredPosts = window.pin.getFilteredPosts(event);
      var newPins = window.pin.getGeneratedPins(filteredPosts);

      window.pin.removePins(pins);
      window.pin.addPinsToMap(newPins, MAP_PINS_CLASS);
      window.data.setFilteredOffers(filteredPosts);
    };
  };

  var dragPinLimits = {
    minX: LOCATION.X.MIN,
    minY: LOCATION.Y.MIN - PIN_SIZES.height,
    maxX: LOCATION.X.MAX,
    maxY: LOCATION.Y.MAX - PIN_SIZES.height
  };

  var syncFieldWithPin = function (target, x, y) {
    target.value = 'x: ' + parseInt(x, 10) + ', y: ' + parseInt(y, 10);
  };

  var checkLimit = function (number, limitMin, limitMax) {
    return Math.min(Math.max(number, limitMin), limitMax);
  };

  var setMainPinCoordinates = function (x, y) {
    pinMain.style.left = x + 'px';
    pinMain.style.top = y + 'px';
    pinMain.style.zIndex = '10';
  };

  var processPin = function (pin) {
    window.pin.deactivatePins(pins);
    window.card.removePopups(pins);
    window.pin.activatePin(pin);
    window.showCard.addCartToMap(window.data.findPinById(pin), MAP_PINS_CLASS);
  };

  var pinClickHandler = function (e) {
    var pinNode = e.target;
    if (pinNode.classList.contains(MAP_PIN_CLASS)) {
      processPin(pinNode);
    }
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

      var newX = checkLimit(mainPinCoords.x - shift.x, dragPinLimits.minX, dragPinLimits.maxX);
      var newY = checkLimit(mainPinCoords.y - shift.y, dragPinLimits.minY, dragPinLimits.maxY);

      setMainPinCoordinates(newX, newY);
      syncFieldWithPin(address, newX, newY + PIN_SIZES.height);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  pins.addEventListener('keydown', function (e) {
    if (window.util.isKeyboardEnterKey(e)) {
      pinClickHandler(e);
    }
  });

  pins.addEventListener('click', function (e) {
    var target = e.target;

    if (target.tagName.toLowerCase() === 'img') {
      target = target.parentNode;
    }
    if (!target.classList.contains(MAP_PIN_CLASS)
      || target.classList.contains(MAP_PIN_MAIN_CLASS)) {
      return;
    }

    processPin(target);
  });

  mapIsFaded(map);
  fieldsetsStatus(fieldset, 'disabled');
  pinMain.addEventListener('mouseup', mouseupHandler);
  pinFilters.addEventListener('change', function (ev) {
    window.util.debounce(reRenderPins(ev), 10);
  });

  return {
    mapContainer: map,
    pinsContainer: pins
  };

})();
