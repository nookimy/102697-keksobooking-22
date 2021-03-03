import {getRandomInt, getRandomFloat, getRandomArrayElement, getArrayRandomLength} from './util.js';

const offerTypes = ['palace', 'flat', 'house', 'bungalow'];
const offerCheckins = ['12:00', '13:00', '14:00'];
const offerCkouts = ['12:00', '13:00', '14:00'];
const offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const similarAdsCount = 10;

const createAd = () => {
  const coorX = getRandomFloat(35.65000, 35.70000, 5);
  const coorY = getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png',
    },
    offer: {
      title: 'Заголовок предложения',
      address: coorX + ', ' + coorY,
      price: getRandomInt(1, 10000),
      type: getRandomArrayElement(offerTypes),
      rooms: getRandomInt(1, 4),
      guests: getRandomInt(1, 8),
      checkin: getRandomArrayElement(offerCheckins),
      checkout: getRandomArrayElement(offerCkouts),
      features: getArrayRandomLength(offerFeatures),
      description: 'Описание помещения',
      photos: getArrayRandomLength(offerPhotos),
    },
    location: {
      x: coorX,
      y: coorY,
    },
  }
};


const createAds = () => new Array(similarAdsCount).fill(null).map(() => createAd());

export {createAds};
