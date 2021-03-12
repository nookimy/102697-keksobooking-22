import {getRandomInt, getRandomFloat, getRandomArrayElement, getArrayRandomLength} from './util.js';

const minAvatarNumber = 1;
const maxAvatarNumber = 8;
const offerTitle = 'Заголовок';
const minLatitude = 35.65000;
const maxLatitude = 35.70000;
const minLongtitude = 139.70000;
const maxLongtitude = 139.80000;
const LOCATION_PRECISION = 5;
const minPrice = 1;
const maxPrice = 1000000;
const offerTypes = ['palace', 'flat', 'house', 'bungalow'];
const offerCheckins = ['12:00', '13:00', '14:00'];
const offerCkouts = ['12:00', '13:00', '14:00'];
const offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const minRoomsNumber = 1;
const maxRoomsNumber = 4;
const minGuestsNumber = 1;
const maxGuestsNumber = 8;
const offerDescription = 'Описание';
const offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const MIN_ADDS = 0;
const ADDS_COUNT = 10;

// Минимальная цена для разных типов жилья
const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};


const getOffer = () => {
  const coorX = getRandomFloat(minLatitude, maxLatitude, LOCATION_PRECISION);
  const coorY = getRandomFloat(minLongtitude, maxLongtitude, LOCATION_PRECISION);

  const advertisement = {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(minAvatarNumber, maxAvatarNumber) + '.png',
    },
    offer: {
      title: offerTitle,
      address: coorX + ', ' + coorY,
      price: getRandomInt(minPrice, maxPrice),
      type: getRandomArrayElement(offerTypes),
      rooms: getRandomInt(minRoomsNumber, maxRoomsNumber),
      guests: getRandomInt(minGuestsNumber, maxGuestsNumber),
      checkin: getRandomArrayElement(offerCheckins),
      checkout: getRandomArrayElement(offerCkouts),
      features: getArrayRandomLength(offerFeatures),
      description: offerDescription,
      photos: getArrayRandomLength(offerPhotos),
    },
    location: {
      lat: coorX,
      lng: coorY,
    },
  }

  return advertisement;
}

const getOffers = () => {
  const offers = [];
  for (let i = 0; i < ADDS_COUNT; i++) {
    offers.push(getOffer());
  }
  return offers;
}

getOffers();

console.log(getOffers());

export {
  getOffers,
  LOCATION_PRECISION,
  minPrices,
  MIN_ADDS,
  ADDS_COUNT
};
