'use strict';

const getRandomInt = function (min, max) {
  if (min < 0 || max < min) {
    return undefined;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomFloat = function (min, max, decimal = 2) {
  if (min < 0 || max < min) {
    return undefined;
  }
  return ((Math.random() * (max - min) + min).toFixed(decimal));
}

const getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
}

const getArrayRandomLength = function (array) {
  const length = getRandomInt(0, array.length); //длина выходного массива
  const outputArray = []; //выходной массив

  for (let i = 0; i < length; i++) { //формируем выходной массив
    const randomElement = getRandomArrayElement(array); //взяли эллемент из копии
    outputArray.push(randomElement);  // вставили его в выходной массив
    array.splice(randomElement, 1); //удаляем элемент из коппии, чтобы на следующей итерации небыло возможности взять дубль.
  }
  return outputArray;
}

const offerTypes = ['palace', 'flat', 'house', 'bungalow'];
const offerCheckins = ['12:00', '13:00', '14:00'];
const offerCkouts = ['12:00', '13:00', '14:00'];
const offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const createAuthor = function () {
  return {
    avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png',
  };
};

const createLocation = function () {
  return {
    x: getRandomFloat(35.65000, 35.70000, 6),
    y: getRandomFloat(139.70000, 139.80000, 6),
  }
}

const createOffer = function () {
  return {
    title: 'Заголовок предложения',
    address: createLocation().x + ', ' + createLocation().y,
    price: getRandomInt(1, 10000),
    type: getRandomArrayElement(offerTypes),
    rooms: getRandomInt(1, 4),
    guests: getRandomInt(1, 8),
    checkin: getRandomArrayElement(offerCheckins),
    checkout: getRandomArrayElement(offerCkouts),
    features: getArrayRandomLength(offerFeatures),
    description: 'Описание помещения',
    photos: getArrayRandomLength(offerPhotos),
  }
}

const createAd = function () {
  return Object.assign({}, createAuthor(), createOffer(), createLocation())
}

const ADS_COUNT = 10;
const arrayAds = new Array(ADS_COUNT).fill(null).map(() => createAd());
