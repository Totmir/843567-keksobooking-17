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
var MAP_PIN_MAIN_ELEMENT = MAP_PINS_ELEMENT.querySelector(".map__pin--main");
var ADD_NOTICE_FORM = document.querySelector('.ad-form');
var ADD_NOTICE_FORM_FIELDS = ADD_NOTICE_FORM.querySelectorAll('fieldset');
var MAP_FILTERS_FORM = MAP_ELEMENT.querySelector('.map__filters');
var MAP_FILTERS_FORM_FIELDS = MAP_FILTERS_FORM.querySelectorAll('fieldset, select');

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
  // initialize ads data array
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
MAP_ELEMENT.classList.remove('map--faded');

// Disables Add notice form and fields

var disableAddNoticeForm = function () {
  ADD_NOTICE_FORM.classList.add('ad-form--disabled');
  ADD_NOTICE_FORM_FIELDS.forEach(function (element) {
    element.disabled = true;
  });
};


// Enable Add notice form and fields

var enableAddNoticeForm = function () {
  ADD_NOTICE_FORM.classList.remove('ad-form--disabled');
  ADD_NOTICE_FORM_FIELDS.forEach(function (element) {
    element.disabled = false;
  });
};

// Disables Map filters form

var disableMapFiltersForm = function () {
  MAP_FILTERS_FORM_FIELDS.forEach(function (element) {
    element.disabled = true;
  });
};

// Enables Map filters form

var enableMapFiltersForm = function () {
  MAP_FILTERS_FORM_FIELDS.forEach(function (element) {
    element.disabled = false;
  });
};

// Activates booking page

var activateBookingPage = function () {
  renderMapPins(generateMockData(MAP_PINS_ELEMENT.offsetWidth));
  MAP_ELEMENT.classList.remove('map--faded');
  enableAddNoticeForm();
  enableMapFiltersForm();
};

// Deactivates booking page

var deactivateBookingPage = function () {
  MAP_ELEMENT.classList.add('map--faded');
  disableAddNoticeForm();
  disableMapFiltersForm();
};

deactivateBookingPage();
MAP_PIN_MAIN_ELEMENT.addEventListener('click', function () {
  activateBookingPage();
});
