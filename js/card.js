'use strict';

window.card = (function () {
  var APARTMENT_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var POPUP_CLASS = 'popup';

  var generateFeatures = function (itemFeatureList) {
    var listOfli = '';
    for (var i = 0; i <= itemFeatureList.length - 1; i++) { // давай здесь использовать forEach
      listOfli += '<li class="feature feature--' + itemFeatureList[i] + '"></li>';
    }
    return listOfli;
  };

  var generateCard = function (data) {
    var template = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
    var typeName = APARTMENT_TYPE[data.offer.type] || 'Тип жилья неизвестен';

    template.querySelector('.popup__avatar').src = data.author.avatar;
    template.querySelector('h3').innerHTML = data.offer.title;
    template.querySelector('p small').textContent = data.offer.address;
    template.querySelector('p.popup__price').innerHTML = data.offer.price + ' &#x20bd;/ночь';
    template.querySelector('h4').textContent = typeName;
    template.querySelector('p:nth-of-type(3)').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    template.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    template.querySelector('ul.popup__features').innerHTML = generateFeatures(data.offer.features);
    template.querySelector('p:nth-of-type(5)').textContent = data.offer.description;
    template.querySelector('ul.popup__pictures').textContent = null; // вряд ли оптимальное решение, но удалось убрать ненужную картинку

    return template;
  };

  var removePopups = function (target) {
    Array.prototype.slice.call(target.children).forEach(function (item) {
      if (item.classList.contains(POPUP_CLASS)) {
        target.removeChild(item);
      }
    });
  };

  return {
    generateCard: generateCard,
    removePopups: removePopups
  };

})();
