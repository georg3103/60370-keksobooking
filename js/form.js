'use strict';

// Выбор всех необходимых элементов формы
var noticeForm = document.querySelector('.notice__form');
var noticeTitle = noticeForm.querySelector('#title');
var noticePrice = noticeForm.querySelector('#price');
var noticeType = noticeForm.querySelector('#type');

var roomNumber = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');

var timein = noticeForm.querySelector('#timein');
var timeout = document.querySelector('#timeout');

var formSubmit = noticeForm.querySelector('.form__submit');

var options = capacity.querySelectorAll('option'); // added

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
  noticePrice.value = noticePrice.min;
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

roomNumber.addEventListener('change', syncCapacityWithGuests);

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

var changeFieldValue = function (field, value) {
  field.value = value;
};

var timeinChangeHandler = function (evt) {
  changeFieldValue(timeout, evt.currentTarget.value);
};

var timeoutChangeHandler = function (evt) {
  changeFieldValue(timein, evt.currentTarget.value);
};

var formSubmitClickHandler = function () {
  checkNoticeForm();
};

timein.addEventListener('change', timeinChangeHandler);
timeout.addEventListener('change', timeoutChangeHandler);

formSubmit.addEventListener('click', formSubmitClickHandler);
