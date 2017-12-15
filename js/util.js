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

  var selectOptionValue = function (select) {
    var selectOptions = select.querySelectorAll('option');
    var optionValue = null;
    var optionValues = [];

    for (var i = 0; i < selectOptions.length; i++) {
      optionValue = selectOptions[i].getAttribute('value');
      optionValues[i] = optionValue;
    }
    return optionValues;
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
    selectOptionValue: selectOptionValue
  };

})();
