'use strict';

window.pin = (function () {

  var MAP_PIN_CLASS = 'map__pin';
  var MAP_PIN_ACTIVE_CLASS = 'map__pin--active';
  var MAP_PIN_MAIN_CLASS = 'map__pin--main';

  var PIN_SIZE = {
    WIDTH: 40,
    HEIGHT: 40
  };

  var filter = {
    housingType: null,
    housingPrice: null,
    housingRooms: null,
    housingGuests: null,
    featureWifi: null,
    featureDishwasher: null,
    featureParking: null,
    featureWasher: null,
    featureElevator: null,
    featureConditioner: null
  };

  var FILTER_CASES = [
    'housing-type',
    'housing-price',
    'housing-rooms',
    'housing-guests',
    'filter-wifi',
    'filter-dishwasher',
    'filter-parking',
    'filter-washer',
    'filter-elevator',
    'filter-conditioner',
  ];


  var getGeneratedPins = function (listOfOffers) {

    var offers = listOfOffers;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var newButton = document.createElement('button');
      newButton.style.left = offers[i].location.x + 'px';
      newButton.style.top = offers[i].location.y + 'px';
      newButton.className = MAP_PIN_CLASS;

      newButton.dataset.pinId = i;


      var pinImage = document.createElement('img');
      pinImage.src = offers[i].author.avatar;
      pinImage.style.width = PIN_SIZE.WIDTH + 'px';
      pinImage.style.height = PIN_SIZE.HEIGHT + 'px';
      pinImage.setAttribute('draggable', false);
      newButton.appendChild(pinImage);
      fragment.appendChild(newButton);
    }
    return fragment;
  };

  var addPinsToMap = function (listOfOfferNode, target) {
    var mapTarget = document.querySelector(target);
    mapTarget.appendChild(listOfOfferNode);
  };

  var activatePin = function (target) {
    target.classList.add(MAP_PIN_ACTIVE_CLASS);
  };

  var deactivatePin = function (pin) {
    if (pin.classList.contains(MAP_PIN_CLASS)) {
      pin.classList.remove(MAP_PIN_ACTIVE_CLASS);
    }
  };

  var deactivatePins = function (target) {
    Array.prototype.slice.call(target.children).forEach(function (pin) {
      deactivatePin(pin);
    });
  };

  var removePin = function (pin) {
    if (pin.classList.contains(MAP_PIN_CLASS)) {
      if (pin.classList.contains(MAP_PIN_MAIN_CLASS)) {
        return;
      } else {
        pin.remove();
      }
    }
  };

  var removePins = function (target) {
    Array.prototype.slice.call(target.children).forEach(function (pin) {
      removePin(pin);
    });
  };

  var getPriceRangeByName = function (name) {
    var min = 0;
    var max = 0;
    switch (name) {
      case 'middle':
        min = 10000;
        max = 50000;
        break;
      case 'low':
        min = 0;
        max = 10000;
        break;
      case 'high':
        min = 50000;
        max = -1;
        break;
      default:
        min = -1;
        max = -1;
    }

    return {
      min: min,
      max: max
    };
  };

  var isHousingPriceWithingRange = function (value, price) {
    var priceRange = getPriceRangeByName(value);
    if (priceRange.min < 0 && priceRange.max < 0) {
      return true;
    }
    if (price >= priceRange.min && priceRange.max < 0) {
      return true;
    }

    return (price >= priceRange.min && price <= priceRange.max);
  };

  var isFeatureTurnedOn = function (features, featureToCheck) {
    return features.indexOf(featureToCheck) > -1;
  };

  var getFilteredPins = function (ev) {
    var target = ev.target;
    var value = target.value;

    var posts = window.data.getOffersList();

    var propNumber = 0;

    for (var key in filter) {
      if ((target.id === FILTER_CASES[propNumber]) && key.search('feature') >= 0) {
        filter[key] = target.checked ? value : null;
      }
      if ((target.id === FILTER_CASES[propNumber])) {
        filter[key] = value === 'any' ? null : value;
      }
      propNumber++;
    }

    posts = posts.filter(function (post) {
      if (filter.housingType && post.offer.type !== filter.housingType) {
        return false;
      }
      if (filter.housingRooms && post.offer.rooms !== parseInt(filter.housingRooms, 10)) {
        return false;
      }
      if (filter.housingPrice && !isHousingPriceWithingRange(filter.housingPrice, post.offer.price)) {
        return false;
      }
      if (filter.housingGuests && post.offer.guests !== parseInt(filter.housingGuests, 10)) {
        return false;
      }
      if (filter.featureWifi && !isFeatureTurnedOn(post.offer.features, filter.featureWifi)) {
        return false;
      }
      if (filter.featureDishwasher && !isFeatureTurnedOn(post.offer.features, filter.featureDishwasher)) {
        return false;
      }
      if (filter.featureParking && !isFeatureTurnedOn(post.offer.features, filter.featureParking)) {
        return false;
      }
      if (filter.featureWasher && !isFeatureTurnedOn(post.offer.features, filter.featureWasher)) {
        return false;
      }
      if (filter.featureElevator && !isFeatureTurnedOn(post.offer.features, filter.featureElevator)) {
        return false;
      }
      if (filter.featureConditioner && !isFeatureTurnedOn(post.offer.features, filter.featureConditioner)) {
        return false;
      }

      return true;
    });
    return posts;
  };

  return {
    getGeneratedPins: getGeneratedPins,
    addPinsToMap: addPinsToMap,
    activatePin: activatePin,
    deactivatePins: deactivatePins,
    removePins: removePins,
    getFilteredPins: getFilteredPins
  };

})();
