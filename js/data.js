import {getRandomInt, getRandomFloat, getRandomArrayElement, getArrayRandomLength} from './util.js';

const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 8;
const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const LOCATION_DECIMAL = 5;
const MIN_PRICE = 1;
const MAX_PRICE = 1000000;
const MIN_ROOMS_NUMBER = 1;
const MAX_ROOMS_NUMBER = 4;
const MIN_GUESTS_NUMBER = 1;
const MAX_GUESTS_NUMBER = 8;
const MIN_ADS_COUNT = 0;
const MAX_ADS_COUNT = 10;

const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const createAd = () => {
  const coorX = getRandomFloat(MIN_LATITUDE, MAX_LATITUDE, LOCATION_DECIMAL);
  const coorY = getRandomFloat(MIN_LONGITUDE, MAX_LONGITUDE, LOCATION_DECIMAL);

  const advertisement = {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.png',
    },
    offer: {
      title: 'Заголовок',
      address: coorX + ', ' + coorY,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomInt(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
      guests: getRandomInt(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
      checkin: getRandomArrayElement(OFFER_CHECKINS),
      checkout: getRandomArrayElement(OFFER_CHECKOUTS),
      features: getArrayRandomLength(OFFER_FEATURES),
      description: 'Описание',
      photos: getArrayRandomLength(OFFER_PHOTOS),
    },
    location: {
      lat: coorX,
      lng: coorY,
    },
  }

  return advertisement;
}

const createAds = () => {
  const offers = [];
  for (let i = 0; i < MAX_ADS_COUNT; i++) {
    offers.push(createAd());
  }
  return offers;
}

createAds();

// console.log(createAds());

export {
  createAds,
  LOCATION_DECIMAL,
  MIN_PRICES,
  MIN_ADS_COUNT,
  MAX_ADS_COUNT
};
