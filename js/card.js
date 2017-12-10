'use strict';

window.card = (function () {

  var POPUP_CLASS = 'popup';

  var generateFeatures = function (itemFeatureList) { // CARD +
    var listOfli = '';
    for (var i = 0; i <= itemFeatureList.length - 1; i++) {
      listOfli += '<li class="feature feature--' + itemFeatureList[i] + '"></li>';
    }
    return listOfli;
  };

  var generateCard = function (postNumber) {

    var offerNumber = postNumber;

    var template = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

    template.querySelector('.popup__avatar').src = offerNumber.author;
    template.querySelector('h3').innerHTML = offerNumber.offer.title;
    template.querySelector('p small').textContent = offerNumber.offer.address;
    template.querySelector('p.popup__price').innerHTML = offerNumber.offer.price + ' &#x20bd;/ночь';
    template.querySelector('h4').textContent = offerNumber.offer.type;
    template.querySelector('p:nth-of-type(3)').textContent = offerNumber.offer.rooms + ' комнаты для ' + offerNumber.offer.guests + ' гостей';
    template.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + offerNumber.offer.checkin + ', выезд до ' + offerNumber.offer.checkout;
    template.querySelector('ul.popup__features').innerHTML = generateFeatures(offerNumber.offer.features);
    template.querySelector('p:nth-of-type(5)').textContent = offerNumber.offer.description;
    template.querySelector('ul.popup__pictures li img').src = offerNumber.author;

    return template;
  };

  var addCartToMap = function (postNumber, target) { // CARD +
    var cart = generateCard(postNumber);
    var mapTarget = document.querySelector(target);
    return mapTarget.appendChild(cart);
  };

  var removePopups = function (target) { // CARD +
    Array.prototype.slice.call(target.children).forEach(function (item) {
      if (item.classList.contains(POPUP_CLASS)) {
        target.removeChild(item);
      }
    });
  };

  return {
    generateCard: generateCard,
    addCartToMap: addCartToMap,
    removePopups: removePopups
  };

})();
