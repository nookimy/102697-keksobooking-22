'use strict';

const getRandomInt = function (min, max) {
  if (min < 0 || max < min) {
    return undefined;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomFloat = function (min, max, decimal = 2) {
  if (min < 0 || max < min || max == min) {
    alert('Диапазон чисел должен быть положительным');
    return undefined;
  }
  return ((Math.random() * (max - min) + min).toFixed(decimal));
}

// Массив случайной длины
const getArrayRandomLength = function (array) {
  const inputLength = array.length; // длинна входного массива
  let inputCopyList = array.slice(0); //коппируем массив; в цикле будем брать из него рандомные элементы, взятое будем удалять , чтобы не взять снова

  const outputArray = []; //выходной массив
  const outputLength = getRandomInt(0, inputLength); //длинна выходного массива
  for (let i = 0; i < outputLength; i++) { //формируем выходной массив
    let idx = getRandomInt(0, inputCopyList.length - 1); // нужен рандомный индекс, чтобы взять какое-то значение
    let item = inputCopyList[idx]; //взяли эллемент из копии
    outputArray.push(item);  // вставили его в выходной массив
    inputCopyList.splice(idx, 1); //удаляем эллмент из коппии, чтобы на следующей итерации небыло возможности взять дубль.
  }
  return outputArray;
}

const createAuthor = function () {
  return {
    avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png'
  };
};

const createLocation = function () {
  return {
    x: getRandomFloat(35.65000, 35.70000, 6),
    y: getRandomFloat(139.70000, 139.80000, 6)
  }
}

const createOffer = function () {
  const offerTypes = ['palace', 'flat', 'house', 'bungalow'];
  const offerCheckins = ['12:00', '13:00', '14:00'];
  const offerCkouts = ['12:00', '13:00', '14:00'];
  const offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  return {
    title: 'Заголовок предложения',
    address: createLocation().x + ', ' + createLocation().y,
    price: getRandomInt(1, 10000),
    type: offerTypes[getRandomInt(0, offerTypes.length - 1)],
    rooms: getRandomInt(1, 4),
    guests: getRandomInt(1, 8),
    checkin: offerCheckins[getRandomInt(0, offerCheckins.length - 1)],
    checkout: offerCkouts[getRandomInt(0, offerCkouts.length - 1)],
    features: getArrayRandomLength(offerFeatures),
    description: 'Описание помещения',
    photos: ''
  }
}

const createAd = function () {
  return Object.assign({}, createAuthor(), createOffer(), createLocation())
}

const ADS_COUNT = 10;
const arrayAds = new Array(ADS_COUNT).fill(null).map(() => createAd());
console.log(arrayAds);
