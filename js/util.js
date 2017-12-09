'use strict';

window.util = (function () {
  var KEYBOARD_KEY_ENTER = 13;
  var KEYBOARD_KEY_ESC = 27;

  var getRandomArbitrary = function (min, max) { // util.js
    return Math.floor(Math.random() * (max - min) + min);
  };

  var isKeyboardEnterKey = function (e) { // util.js
    return KEYBOARD_KEY_ENTER === e.keyCode;
  };

  var isKeyboardEscKey = function (e) { // util.js
    return KEYBOARD_KEY_ESC === e.keyCode;
  };

  return {
    getRandomArbitrary: getRandomArbitrary,
    isKeyboardEnterKey: isKeyboardEnterKey,
    isKeyboardEscKey: isKeyboardEscKey
  };

})();
