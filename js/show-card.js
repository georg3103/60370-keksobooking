'use strict';

window.showCard = (function () {

  var addCartToMap = function (postNode) {
    window.map.mapContainer.appendChild(window.card.generateCard(postNode));

    addPopupEscListener();
  };

  var addPopupEscListener = function () {
    document.addEventListener('keydown', closePopupEscHandler);
  };

  var deactivateRemovePopupEscListener = function () {
    document.removeEventListener('keydown', closePopupEscHandler);
  };

  var closePopupEscHandler = function (e) {
    if (window.util.isKeyboardEscKey(e)) {
      window.card.removePopups(window.map.mapContainer);
      window.pin.deactivatePins(window.map.mapContainer);
    }

    deactivateRemovePopupEscListener();
  };

  window.map.mapContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup__close')) {
      window.card.removePopups(window.map.mapContainer);
      window.pin.deactivatePins(window.map.mapContainer);
    }
  });

  return {
    addCartToMap: addCartToMap
  };

})();
