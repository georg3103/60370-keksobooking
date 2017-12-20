'use strict';

(function () {
  window.showCard = function (pins, postData) {

    var MAP_PINS_CLASS = '.map__pins';
    var MAP_PIN_CLASS = 'map__pin';
    var MAP_PIN_MAIN_CLASS = 'map__pin--main';

    pins.addEventListener('click', function (e) {
      var target = e.target;

      if (target.tagName.toLowerCase() === 'img') {
        target = target.parentNode;
      }
      if (!target.classList.contains(MAP_PIN_CLASS)
      || target.classList.contains(MAP_PIN_MAIN_CLASS)) {
        return;
      }
      processPin(target, postData);
    });

    pins.addEventListener('keydown', function (e) {
      if (window.util.isKeyboardEnterKey(e)) {
        pinClickHandler(e);
      }
    });

    var pinClickHandler = function (e) {
      var pinNode = e.target;
      if (pinNode.classList.contains(MAP_PIN_CLASS)) {
        processPin(pinNode, postData);
      }
    };

    var processPin = function (targetNode, data) {

      window.pin.deactivatePins(pins);

      window.card.removePopups(pins);

      window.pin.activatePin(targetNode);

      window.card.addCartToMap(data[getPostNumber(targetNode)], MAP_PINS_CLASS);

      removePopupEscListener();
    };

    var removePopupEscListener = function () {
      document.addEventListener('keydown', closePopupEscHandler);
    };

    var deactivateRemovePopupEscListener = function () {
      document.removeEventListener('keydown', closePopupEscHandler);
    };

    var closePopupEscHandler = function (e) {
      if (window.util.isKeyboardEscKey(e)) {
        window.card.removePopups(pins);
        window.pin.deactivatePins(pins);
      }
    };

    var getPostNumber = function (target) {
      var postNumber = target.dataset.pinId;
      postNumber = parseInt(postNumber, 10);
      return postNumber;
    };

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
