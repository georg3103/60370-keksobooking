'use strict';

(function () {

  var noticeForm = document.querySelector('.notice__form');
  var submitButton = document.querySelector('.form__submit');
  var title = document.querySelector('#title');

  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var FLAT_TIPES = ['flat', 'bungalo', 'house', 'palace'];
  var PRICE_VALUES = ['1000', '0', '5000', '10000'];

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var TIME_IN_OPTIONS = ['12:00', '13:00', '14:00'];
  var TIME_OUT_OPTIONS = ['12:00', '13:00', '14:00'];

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

  window.synchronizeField(timeIn, timeOut, TIME_IN_OPTIONS, TIME_OUT_OPTIONS, syncValues);
  window.synchronizeField(timeOut, timeIn, TIME_OUT_OPTIONS, TIME_IN_OPTIONS, syncValues);
  window.synchronizeField(type, price, FLAT_TIPES, PRICE_VALUES, syncPrices);
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
      var errorStyle = revertChanges ? element.style.border = '' : element.style.border = '1px solid red';
      return errorStyle;
    };

  };

  initValidators();

  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (!formValidator()) {
      addInvalid(noticeForm.elements);
    }
  });

  noticeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    window.backend.save(new FormData(noticeForm), function () {
      noticeForm.reset();
    }, window.util.error);
  });

  noticeForm.addEventListener('change', function (event) {
    if (event.target.checkValidity()) {
      event.target.style.border = null;
    }
  });

  var isValid = function (element) {
    return element.checkValidity();
  };

  var formValidator = function () {
    Array.from(noticeForm).some(isValid);
  };

  var addBorder = function (element) {
    if (!element.validity.valid) {
      element.style.border = '3px solid red';
    }
  };

  var addInvalid = function (array) {
    Array.from(array).forEach(addBorder);
  };

})();
