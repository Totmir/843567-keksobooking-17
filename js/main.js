'use strict';

var ADS_NUMBER = 8;
var AVATAR_IMAGE_SOURCE = 'img/avatars/user{{xx}}.png';
var LOCATION_X_MIN = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var USERS_SORT_THRESHOLD = 0.5;
var USER_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAP_PINS_ELEMENT = document.querySelector('.map__pins');
var MAP_ELEMENT = document.querySelector('.map');
var PIN_TEMPLATE_ELEMENT = document.querySelector('#pin').content.querySelector('.map__pin');
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

// Task #1

var getRandomElementFromArray = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var generateRandomNumberFromRange = function (min, max) {
  return min + Math.floor(Math.random() * (max - min));
};

var generateMockData = function (containerWidth) {

  // make randomly sorted copy of USER_NUMBERS
  var userRadomNumbers = USER_NUMBERS.slice(0).sort(function () {
    return Math.random() > USERS_SORT_THRESHOLD ? 1 : -1;
  });

  var ads = [];

  // popular ads
  for (var i = 0; i < ADS_NUMBER; i++) {
    ads.push({
      author: {
        avatar: AVATAR_IMAGE_SOURCE.replace('{{xx}}', userRadomNumbers[i])
      },
      offer: {
        type: getRandomElementFromArray(OFFER_TYPES)
      },
      location: {
        x: generateRandomNumberFromRange(LOCATION_X_MIN, containerWidth),
        y: generateRandomNumberFromRange(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    });
  }

  return ads;
};

var createPinElement = function (pinTemplate, ad) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImageElement = pinElement.querySelector('img');

  pinElement.style.left = (ad.location.x - MAP_PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (ad.location.y - MAP_PIN_HEIGHT) + 'px';
  pinImageElement.src = ad.author.avatar;
  pinImageElement.alt = ad.offer.type;

  return pinElement;
};

var renderMapPins = function (ads) {
  var fragment = document.createDocumentFragment();

  ads.forEach(function (ad) {
    fragment.appendChild(createPinElement(PIN_TEMPLATE_ELEMENT, ad));
  });

  MAP_PINS_ELEMENT.appendChild(fragment);
};

renderMapPins(generateMockData(MAP_PINS_ELEMENT.offsetWidth));
// Task #2
MAP_ELEMENT.classList.remove('map--faded');
