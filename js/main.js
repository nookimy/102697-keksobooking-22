'use strict';

const getRandomInt = function (min, max) {
  if (min < 0 || max < min) {
    return undefined;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = function (min, max, decimal = 2) {
  if (min < 0 || max < min) {
    return undefined;
  }
  return ((Math.random() * (max - min) + min).toFixed(decimal));
};

const getRandomArrayElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

const getArrayRandomLength = function (inputArray) {
  const length = getRandomInt(0, inputArray.length); //длина выходного массива
  const copyArray = inputArray.slice(0); //копия массива из которой будем убирать уже использованные элементы
  const outputArray = []; //выходной массив

  for (let i = 0; i < length; i++) { //формируем выходной массив
    const randomIndex = getRandomInt(0, copyArray.length - 1);
    const randomElement = copyArray[randomIndex]; //взяли эллемент из копии
    // console.log(randomElement);
    outputArray.push(randomElement);  // вставили его в выходной массив
    copyArray.splice(randomIndex, 1); //удаляем элемент из коппии, чтобы на следующей итерации небыло возможности взять дубль.
  }
  return outputArray;
};

const offerTypes = ['palace', 'flat', 'house', 'bungalow'];
const offerCheckins = ['12:00', '13:00', '14:00'];
const offerCkouts = ['12:00', '13:00', '14:00'];
const offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const createAd = function () {
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

const ADS_COUNT = 10;
const arrayAds = new Array(ADS_COUNT).fill(null).map(() => createAd());

arrayAds;
