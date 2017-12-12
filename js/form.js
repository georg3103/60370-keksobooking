'use strict';

(function () {

  var noticeForm = document.querySelector('.notice__form');
  var noticeTitle = noticeForm.querySelector('#title');
  var noticePrice = noticeForm.querySelector('#price');
  var noticeType = noticeForm.querySelector('#type');

  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  var timein = noticeForm.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  var options = capacity.querySelectorAll('option');

  var PRICE = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  var CAPACITY_NUMBER = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var syncFlatWithPrice = function () {
    noticePrice.min = PRICE[noticeType.value];
    noticePrice.placeholder = PRICE[noticeType.value];
  };

  noticeType.addEventListener('change', syncFlatWithPrice);

  var syncCapacityWithGuests = function () {
    for (var i = 0; i < options.length; i++) {
      options[i].disabled = !CAPACITY_NUMBER[roomNumber.value].includes(options[i].value);
      if (!options[i].disabled) {
        capacity.value = options[i].value;
      }
    }
  };

  syncCapacityWithGuests();

  roomNumber.addEventListener('change', syncCapacityWithGuests);

  var changeFieldValue = function (field, value) {
    field.value = value;
  };

  var timeinChangeHandler = function (evt) {
    changeFieldValue(timeout, evt.currentTarget.value);
  };

  var timeoutChangeHandler = function (evt) {
    changeFieldValue(timein, evt.currentTarget.value);
  };

  timein.addEventListener('change', timeinChangeHandler);
  timeout.addEventListener('change', timeoutChangeHandler);

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
      errorShow(noticePrice);
      noticePrice.setCustomValidity('');

      if (noticePrice.validity.typeMismatch) {
        noticePrice.setCustomValidity('Цена должна быть числом!');
      }
      if (noticePrice.validity.valueMissing) {
        noticePrice.setCustomValidity('Обязательное поле');
      }
      if (noticePrice.validity.rangeUnderflow) {
        noticePrice.setCustomValidity('Минимальная цена - ' + noticePrice.min);
      }
      if (noticePrice.validity.rangeOverflow) {
        noticePrice.setCustomValidity('Максимальная цена - ' + noticePrice.max);
      }

      if (noticePrice.validity.valid) {
        errorHide(noticePrice);
      }
    };

    var validateTitle = function () {
      noticeTitle.addEventListener('invalid', function () {
        errorShow(noticeTitle);
        noticeTitle.setCustomValidity('');

        if (noticeTitle.validity.valueMissing) {
          noticeTitle.setCustomValidity('Обязательное поле');
        }
        if (noticeTitle.validity.tooShort) {
          noticeTitle.setCustomValidity('Минимальное количество символов - ' + noticeTitle.minLength);
        }
        if (noticeTitle.validity.tooLong) {
          noticeTitle.setCustomValidity('Максимальное количество символов - ' + noticeTitle.maxLength);
        }

        if (noticeTitle.validity.valid) {
          errorHide(noticeTitle);
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
