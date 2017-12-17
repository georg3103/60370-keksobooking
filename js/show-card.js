'use strict';

(function () {
  window.showCard = function (pins, postData) {

    var MAP_PINS_CLASS = '.map__pins';
    var MAP_PIN_CLASS = 'map__pin';
    var MAP_PIN_MAIN_CLASS = 'map__pin--main';

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
  };

})();
