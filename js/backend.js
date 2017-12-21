'use strict';

window.backend = (function () {

  var load = function (onLoad, onError) {
    var URL = 'https://1510.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          error = 'Все четко!';
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          onError(xhr.status + ': ' + xhr.statusText);
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Неуспешное выполнение запроса. Попробуйте обновить страницу и повторить запрос.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Время ожидания соединения исктекло.');
    });

    xhr.timeout = 5000;
    xhr.open('GET', URL);
    xhr.send();

  };

  var save = function (data, onLoad, onError) {
    var URL = 'https://1510.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad();
          error = 'Форма отправлена!';
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Неуспешное выполнение запроса. Попробуйте обновить страницу и повторить запрос.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Время ожидания соединения исктекло.');
    });

    xhr.timeout = 5000;
    xhr.open('POST', URL);
    xhr.send(data);

  };

  var error = function (message) {
    var errorBlock = document.createElement('div');

    errorBlock.style.width = 50 + '%';
    errorBlock.style.height = 120 + 'px';
    errorBlock.style.position = 'fixed';
    errorBlock.style.top = 2 + '%';
    errorBlock.style.left = 50 + '%';
    errorBlock.style.transform = 'translate(-50%, -50%)';
    errorBlock.style.zIndex = 5;
    errorBlock.style.display = 'flex';
    errorBlock.style.alignItems = 'center';
    errorBlock.style.justifyContent = 'center';
    errorBlock.style.color = 'red';
    errorBlock.style.fontSize = 20 + 'px';
    errorBlock.style.fontWeight = 'bold';
    errorBlock.id = 'serverStatus';
    errorBlock.textContent = message;

    document.body.insertAdjacentElement('afterbegin', errorBlock);

    setTimeout(function () {
      errorBlock.remove(); // remove не используем
    }, 3000);
  };

  return {
    load: load,
    save: save,
    error: error
  };

})(); // ниже одна строчка

