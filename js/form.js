'use strict';

(function () {

  var noticeForm = document.querySelector('.notice__form');
  var title = document.querySelector('#title');

  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var flatType = ['flat', 'bungalo', 'house', 'palace'];
  var priceValues = ['1000', '0', '5000', '10000'];

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeInOptions = ['12:00', '13:00', '14:00'];
  var timeOutOptions = ['12:00', '13:00', '14:00'];

  var CAPACITY_NUMBER_VALIDATION = {
    rooms: [1, 2, 3, 100],
    guests: [1, [1, 2], [1, 2, 3], 0]
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncPrices = function (element, value) {
    element.placeholder = value;
    element.min = value;
  };

  window.synchronizeField(timeIn, timeOut, timeInOptions, timeOutOptions, syncValues);
  window.synchronizeField(timeOut, timeIn, timeOutOptions, timeInOptions, syncValues);
  window.synchronizeField(type, price, flatType, priceValues, syncPrices);
  window.synchronizeField(roomNumber, capacity, CAPACITY_NUMBER_VALIDATION.rooms, CAPACITY_NUMBER_VALIDATION.guests, window.synchronizeDisabledValues, true);

  var initValidators = function () {

    noticeForm.addEventListener('invalid', function (evt) {
      var fieldName = evt.target.name;

      switch (fieldName) {
        case 'price': {
          validatePrice();
          break;
        }
        case 'title': {
          validateTitle();
          break;
        }
      }
    }, true);

    var validatePrice = function () {
      errorShow(price);
      price.setCustomValidity('');

      if (price.validity.typeMismatch) {
        price.setCustomValidity('Цена должна быть числом!');
      }
      if (price.validity.valueMissing) {
        price.setCustomValidity('Обязательное поле');
      }
      if (price.validity.rangeUnderflow) {
        price.setCustomValidity('Минимальная цена - ' + price.min);
      }
      if (price.validity.rangeOverflow) {
        price.setCustomValidity('Максимальная цена - ' + price.max);
      }

      if (price.validity.valid) {
        errorHide(price);
      }
    };

    var validateTitle = function () {
      title.addEventListener('invalid', function () {
        errorShow(title);
        title.setCustomValidity('');

        if (title.validity.valueMissing) {
          title.setCustomValidity('Обязательное поле');
        }
        if (title.validity.tooShort) {
          title.setCustomValidity('Минимальное количество символов - ' + title.minLength);
        }
        if (title.validity.tooLong) {
          title.setCustomValidity('Максимальное количество символов - ' + title.maxLength);
        }

        if (title.validity.valid) {
          errorHide(title);
        }
      });
    };

    var errorHide = function (element) {
      return errorShow(element, true);
    };

    var errorShow = function (element, revertChanges) {
      revertChanges = revertChanges || false;
      if (revertChanges) {
        element.style.border = '';
        return;
      }
      element.style.border = '1px solid red';
    };

  };

  initValidators();

})();
