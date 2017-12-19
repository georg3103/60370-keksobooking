'use strict';

window.util = (function () {
  var KEYBOARD_KEY_ENTER = 13;
  var KEYBOARD_KEY_ESC = 27;

  var getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomArray = function (arr) {
    arr.sort(function () {
      return 0.5 - Math.random();
    });
  };

  var isKeyboardEnterKey = function (e) {
    return KEYBOARD_KEY_ENTER === e.keyCode;
  };

  var isKeyboardEscKey = function (e) {
    return KEYBOARD_KEY_ESC === e.keyCode;
  };

  return {
    getRandomArbitrary: getRandomArbitrary,
    isKeyboardEnterKey: isKeyboardEnterKey,
    isKeyboardEscKey: isKeyboardEscKey,
    getRandomArray: getRandomArray,
  };

})();
