'use strict';
// Task 1
var USERNUM = ['01', '02', '03', '04', '05', '06', '07', '08',]
var OFFERS = [
  // one
  {
    author: {
      avatar: 'img/avatars/user' + USERNUM[1] + '.png',
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '' + location.x + ', ' + location.y + '' ,
      price: 100,
      type: 'flat',
      rooms: 4,
      guests: 4,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: [],
    },

    location: {
      x: 350,
      y: 200,
    }
  },
    // two
  {
    author: {
      avatar: 'img/avatars/user' + USERNUM[2] + '.png',
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '' + location.x + ', ' + location.y + '' ,
      price: 100,
      type: 'flat',
      rooms: 4,
      guests: 4,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: [],
    },

    location: {
      x: 350,
      y: 200,
    }
  },
    // three
  {
    author: {
      avatar: 'img/avatars/user' + USERNUM[3] + '.png',
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '' + location.x + ', ' + location.y + '' ,
      price: 100,
      type: 'flat',
      rooms: 4,
      guests: 4,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: [],
    },

    location: {
      x: 350,
      y: 200,
    }
  },
    // four
  {
    author: {
      avatar: 'img/avatars/user' + USERNUM[4] + '.png',
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '' + location.x + ', ' + location.y + '' ,
      price: 100,
      type: 'flat',
      rooms: 4,
      guests: 4,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: [],
    },

    location: {
      x: 350,
      y: 200,
    }
  },
    // five
  {
    author: {
      avatar: 'img/avatars/user' + USERNUM[5] + '.png',
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '' + location.x + ', ' + location.y + '' ,
      price: 100,
      type: 'flat',
      rooms: 4,
      guests: 4,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: [],
    },

    location: {
      x: 350,
      y: 200,
    }
  },
    // six
  {
    author: {
      avatar: 'img/avatars/user' + USERNUM[6] + '.png',
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '' + location.x + ', ' + location.y + '' ,
      price: 100,
      type: 'flat',
      rooms: 4,
      guests: 4,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: [],
    },

    location: {
      x: 350,
      y: 200,
    }
  },
    // seven
  {
    author: {
      avatar: 'img/avatars/user' + USERNUM[7] + '.png',
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '' + location.x + ', ' + location.y + '' ,
      price: 100,
      type: 'flat',
      rooms: 4,
      guests: 4,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: [],
    },

    location: {
      x: 350,
      y: 200,
    }
  },
    // eight
  {
    author: {
      avatar: 'img/avatars/user' + USERNUM[8] + '.png',
    },

    offer: {
      title: 'Большая уютная квартира',
      address: '' + location.x + ', ' + location.y + '' ,
      price: 100,
      type: 'flat',
      rooms: 4,
      guests: 4,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: '',
      photos: [],
    },

    location: {
      x: 350,
      y: 200,
    }
  }
];

console.log(OFFERS.length);

// Task 2
var MAP = document.querySelector('.map');
MAP.classList.remove('map--faded');

// Task 3

console.log(OFFERS[1].location.x + 'px');

var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

for (var i = 0; i < OFFERS.length - 1; i++) {
  var newButton = document.createElement('button');
  newButton.style.left = OFFERS[i].location.x;
  newButton.style.top = OFFERS[i].location.y;
  newButton.innerHTML = '<img src=' +OFFERS[i].author.avatar + ' width="40" height="40" draggable="false">';
  fragment.appendChild(newButton);
}

mapPin.appendChild(fragment);
