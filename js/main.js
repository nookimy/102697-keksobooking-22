'use strict';

// Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloat = function (min, max) {
  return ((Math.random() * (max - min) + min));
}

// Возврат случайного значения из массива
const getRandomElement = function (element) {
  return element[getRandomInt(0, element.length)];
}

// Возврат массива случайной длины из значений
const getRandomLength = function (array) {
  let newArray = [];
  let length = getRandomInt(0, array.length);
}

const createAd = function () {
  const AD_TITLES = [
    'Заголовок 1',
    'Заголовок 2',
    'Заголовок 3'
  ];

  let location = {
    x: getRandomFloat(35.65000, 35.70000),
    y: getRandomFloat(139.70000, 139.80000)
  };

  const AD_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalow'
  ];

  const AD_CHECKINS = [
    '12:00',
    '13:00',
    '14:00'
  ];

  const AD_CHECKOUTS = [
    '12:00',
    '13:00',
    '14:00'
  ];


  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png'
    },
    offer: {
      title: getRandomElement(AD_TITLES),
      address: location.x.toFixed(5) + ', ' + location.y.toFixed(5),
      price: getRandomInt(1, 10000),
      type: getRandomElement(AD_TYPES),
      rooms: getRandomInt(1, 4),
      guests: getRandomInt(1, 8),
      checkin: getRandomElement(AD_CHECKINS),
      checkout: getRandomElement(AD_CHECKOUTS),
      features: '',
      description: 'Описание',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
    },
    location: {
      x: 35.65000,
      y: 139.70000
    }
  };
};
const SIMILAR_AD_COUNT = 10;
const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());
console.log(similarAds);
