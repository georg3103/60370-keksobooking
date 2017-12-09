'use strict';

window.pin = (function () {

  var MAP_PIN_CLASS = 'map__pin';
  var MAP_PIN_ACTIVE_CLASS = 'map__pin--active';
  var PIN_SIZE = {
    WIDTH: 40,
    HEIGHT: 40
  };

  var getGeneratedPins = function (listOfOffers) { // pin.js

    var offers = listOfOffers;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var newButton = document.createElement('button');
      newButton.style.left = offers[i].location.x + 'px';
      newButton.style.top = offers[i].location.y + 'px';
      newButton.className = MAP_PIN_CLASS;

      // добавляем уникальный ID
      newButton.dataset.pinId = offers[i].id;

      // Добавляет аватар пользователя, устанавливает стили
      var pinImage = document.createElement('img');
      pinImage.src = offers[i].author;
      pinImage.style.width = PIN_SIZE.WIDTH + 'px';
      pinImage.style.height = PIN_SIZE.HEIGHT + 'px';
      pinImage.setAttribute('draggable', false);
      newButton.appendChild(pinImage);
      fragment.appendChild(newButton);
    }
    return fragment;
  };

  var addPinsToMap = function (listOfOffers, target) { // PIN +
    var mapTarget = document.querySelector(target);
    mapTarget.appendChild(listOfOffers); // на вход принимает document-fragment
  };

  var activatePin = function (target) { // PIN +
    target.classList.add(MAP_PIN_ACTIVE_CLASS);
  };

  var deactivatePin = function (pin) { // PIN +
    if (pin.classList.contains(MAP_PIN_CLASS)) {
      pin.classList.remove(MAP_PIN_ACTIVE_CLASS);
    }
  };

  var deactivatePins = function (target) { // PIN +
    Array.prototype.slice.call(target.children).forEach(function (pin) {
      deactivatePin(pin);
    });
  };

  return {
    getGeneratedPins: getGeneratedPins,
    addPinsToMap: addPinsToMap,
    activatePin: activatePin,
    deactivatePins: deactivatePins
  };

})();
