'use strict';

window.pin = (function () {
  var MAP_PIN_CLASS = 'map__pin';
  var MAP_PIN_ACTIVE_CLASS = 'map__pin--active';
  var MAP_PIN_MAIN_CLASS = 'map__pin--main';

  var PIN_SIZE = {
    WIDTH: 40,
    HEIGHT: 40
  };

  var MAX_ITEMS_LIMIT = 5;

  var filter = {
    'housing-type': null,
    'housing-price': null,
    'housing-rooms': null,
    'housing-guests': null,
    'filter-wifi': null,
    'filter-dishwasher': null,
    'filter-parking': null,
    'filter-washer': null,
    'filter-elevator': null,
    'filter-conditioner': null
  };

  var getGeneratedPins = function (listOfOffers) {

    var offers = listOfOffers.slice(0, MAX_ITEMS_LIMIT);

    var fragment = document.createDocumentFragment();

    offers.forEach(function (element, index) {
      var newButton = document.createElement('button');
      newButton.style.left = element.location.x + 'px';
      newButton.style.top = element.location.y + 'px';
      newButton.className = MAP_PIN_CLASS;

      newButton.dataset.pinId = index;

      var pinImage = document.createElement('img');
      pinImage.src = element.author.avatar;
      pinImage.style.width = PIN_SIZE.WIDTH + 'px';
      pinImage.style.height = PIN_SIZE.HEIGHT + 'px';
      pinImage.setAttribute('draggable', false);
      newButton.appendChild(pinImage);
      fragment.appendChild(newButton);
    });
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

    return price >= priceRange.min && price <= priceRange.max;
  };

  var isFeatureTurnedOn = function (features, featureToCheck) {
    return features.indexOf(featureToCheck) > -1;
  };

  var getFilteredPins = function (ev) {
    var target = ev.target;
    var value = target.value;

    var posts = window.data.getOffers();

    for (var key in filter) {
      if (!filter.hasOwnProperty(key)) {
        continue;
      }
      if (target.id !== key) {
        continue;
      }

      if (target.type === 'select-one') {
        filter[key] = value === 'any' ? null : value;
      }

      if (target.type === 'checkbox') {
        filter[key] = target.checked ? value : null;
      }
    }

    return posts.filter(function (post) {
      for (var filterName in filter) {
        if (!filter.hasOwnProperty(filterName)) {
          continue;
        }
        var filterValue = filter[filterName];
        if (!filterValue) {
          continue;
        }
        if (filterName.indexOf('filter-') > -1 && !isFeatureTurnedOn(post.offer.features, filterValue)) {
          return false;
        }
        if (filterName.indexOf('housing-') > -1) {
          if (filterName === 'housing-type' && post.offer.type !== filterValue) {
            return false;
          }
          if (filterName === 'housing-rooms' && post.offer.rooms !== parseInt(filterValue, 10)) {
            return false;
          }
          if (filterName === 'housing-guests' && post.offer.guests !== parseInt(filterValue, 10)) {
            return false;
          }
          if (filterName === 'housing-price' && !isHousingPriceWithingRange(filterValue, post.offer.price)) {
            return false;
          }
        }
      }

      return true;
    });
  };

  return {
    getGeneratedPins: getGeneratedPins,
    addPinsToMap: addPinsToMap,
    activatePin: activatePin,
    deactivatePins: deactivatePins,
    removePins: removePins,
    getFilteredPosts: getFilteredPins
  };

})();
