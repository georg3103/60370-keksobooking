'use strict';

window.util = (function () {
  var KEYBOARD_KEY_ENTER = 13;
  var KEYBOARD_KEY_ESC = 27;

  var isKeyboardEnterKey = function (e) {
    return KEYBOARD_KEY_ENTER === e.keyCode;
  };

  var isKeyboardEscKey = function (e) {
    return KEYBOARD_KEY_ESC === e.keyCode;
  };

  var lastTimeOut;

  var debounce = function (func, interval) {
    interval = interval || 500;
    if (typeof func !== 'function') {
      return;
    }
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }

    lastTimeOut = window.setTimeout(function () {
      func();
    }, interval);
  };

  return {
    isKeyboardEnterKey: isKeyboardEnterKey,
    isKeyboardEscKey: isKeyboardEscKey,
    debounce: debounce
  };

})();
