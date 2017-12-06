'use strict';

var valueList = {
  PRICE_MIN: 1000,
  PRICE_MAX: 1000000,
  TITLE_LENGTH_MIN: 30,
  TITLE_LENGTH_MAX: 100
};

// Выбор всех необходимых элементов формы
var noticeForm = document.querySelector('.notice__form');
var noticeTitle = noticeForm.querySelector('#title');
var noticePrice = noticeForm.querySelector('#price');
var noticeAddress = noticeForm.querySelector('#address');
var noticeType = noticeForm.querySelector('#type');

var roomNumber = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');

var timein = noticeForm.querySelector('#timein');
var timeout = document.querySelector('#timeout');

var formSubmit = noticeForm.querySelector('.form__submit');

// Установка требований к вводу данных в форме
noticeTitle.required = true;
noticeTitle.minLength = valueList.TITLE_LENGTH_MIN;
noticeTitle.maxLength = valueList.TITLE_LENGTH_MAX;
noticePrice.required = true;
noticePrice.min = valueList.PRICE_MIN;
noticePrice.max = valueList.PRICE_MAX;
noticeAddress.required = true;
noticeAddress.readOnly = true;

var changeFieldValue = function (field, value) {
  field.value = value;
};

var changeFieldPrice = function (field, value) {
  var minPrice = 0;

  switch (value) {
    case 'flat':
      minPrice = 1000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
      break;
    case 'bungalo':
      minPrice = 0;
      break;
  }

  field.min = minPrice;
  field.value = minPrice;
};

function changeFieldCapacity(currentRoomNumber) {
  // debugger;
  roomNumber.options[0].removeAttribute('selected');
  capacity.options[0].removeAttribute('selected');

  switch (currentRoomNumber) {
    case '1':
      capacity.options[2].selected = true;

      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[2].disabled = false;
      capacity.options[3].disabled = true;
      break;
    case '2':
      capacity.options[1].selected = true;

      capacity.options[0].disabled = true;
      capacity.options[1].disabled = false;
      capacity.options[2].disabled = false;
      capacity.options[3].disabled = true;
      break;
    case '3':
      capacity.options[0].selected = true;

      capacity.options[0].disabled = false;
      capacity.options[1].disabled = false;
      capacity.options[2].disabled = false;
      capacity.options[3].disabled = true;
      break;
    case '100':
      capacity.options[3].selected = true;

      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[2].disabled = true;
      capacity.options[3].disabled = false;
      break;
  }
}

var checkValidField = function (field) {
  field.style.borderColor = '';

  if (!field.validity.valid) {
    field.style.borderColor = '#ff0000';
  }
};

var checkNoticeForm = function () {
  checkValidField(noticeTitle);
  checkValidField(noticePrice);
};

var timeinChangeHandler = function (evt) {
  changeFieldValue(timeout, evt.currentTarget.value);
};

var timeoutChangeHandler = function (evt) {
  changeFieldValue(timein, evt.currentTarget.value);
};

var typeChangeHandler = function (evt) {
  var currentValue = evt.currentTarget.value;

  changeFieldPrice(noticePrice, currentValue);
};

var roomNumberChangeHandler = function (evt) {
  var currentRoomNumber = evt.target.value;
  changeFieldCapacity(currentRoomNumber);
};

var formSubmitClickHandler = function () {
  checkNoticeForm();
};

timein.addEventListener('change', timeinChangeHandler);
timeout.addEventListener('change', timeoutChangeHandler);

noticeType.addEventListener('change', typeChangeHandler);
roomNumber.addEventListener('change', roomNumberChangeHandler);

formSubmit.addEventListener('click', formSubmitClickHandler);
