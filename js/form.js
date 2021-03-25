import { LOCATION_DECIMAL, MIN_PRICES } from './data.js';
import { sendData } from './data-api.js';

const TITLE_LENGTH_MIN = 30;
const TITLE_LENGTH_MAX = 100;
const MAX_PRICE = 1000000;
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';
const adForm = document.querySelector('.ad-form');
const adFormElement = document.querySelectorAll('fieldset');
const address = adForm.querySelector('#address');
const title = adForm.querySelector('#title');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const checkin = adForm.querySelector('#timein');
const checkout = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const adFormResetButton = adForm.querySelector('.ad-form__reset');

// Неактивное состояние формы
const deactivateAdForm = () => {
  adForm.classList.add('ad-form--disabled');

  adFormElement.forEach((adFormElement) => {
    adFormElement.disabled = true;
  });
}

// Активное состояние формы
const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');

  adFormElement.forEach((adFormElement) => {
    adFormElement.disabled = false;
  });
}

//Заголовок
const onTitleInput = () => {
  const titleLength = title.value.length;
  if (titleLength < TITLE_LENGTH_MIN) {
    title.setCustomValidity('Ещё ' + (TITLE_LENGTH_MIN - titleLength) +' симв.');
  } else if (titleLength > TITLE_LENGTH_MAX) {
    title.setCustomValidity('Удалите лишние ' + (TITLE_LENGTH_MAX - titleLength) +' симв.');
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
}

const fillAddress = (lat, long) => {
  const latitude = lat.toFixed(LOCATION_DECIMAL);
  const longitude = long.toFixed(LOCATION_DECIMAL);
  address.value = `${latitude} ${longitude}`;
}

// Зависимость минимальной цены от типа жилья
price.min = MIN_PRICES[type.value];
price.setAttribute('min', price.min);
price.setAttribute('max', MAX_PRICE);

const onPriceInput = () => {
  price.reportValidity();
}

// Тип жилья
const onTypeChange = () => {
  price.placeholder = MIN_PRICES[type.value];
  price.min = MIN_PRICES[type.value];
}

// Зависимость времени заезда и выезда
const onCheckInChange = () => {
  checkout.value = checkin.value;
}

const onCheckOutChange = () => {
  checkin.value = checkout.value;
}

// Количество комнат и количество мест
const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

// Зависимость количества комнат от количества мест
const onRoomsNumber = () => {
  const seatingCapacityOptions = capacity.querySelectorAll('option');
  const roomsNumber =  Number(roomNumber.value);

  seatingCapacityOptions.forEach((option) => {
    option.disabled = true;
  });

  roomValues[roomsNumber].forEach((seatsAmount) => {
    seatingCapacityOptions.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
      }
    });
    if (!roomValues[roomsNumber].includes(Number(capacity.value))) {
      const maxCapacity = roomValues[roomsNumber][roomValues[roomsNumber].length - 1];
      capacity.value = maxCapacity;
    }
  });
};

type.addEventListener('change', onTypeChange);
checkin.addEventListener('change', onCheckInChange);
checkout.addEventListener('change', onCheckOutChange);
title.addEventListener('input', onTitleInput);
price.addEventListener('input', onPriceInput);
roomNumber.addEventListener('change', onRoomsNumber);

const onResetAdForm = () => {
  onTypeChange();
  onRoomsNumber();
  onCheckInChange();
  onCheckOutChange();
}

const submitAdForm = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      POST_URL,
      onSuccess,
      onError,
      new FormData(evt.target),
    );
  });
};

export {
  deactivateAdForm,
  activateAdForm,
  fillAddress,
  submitAdForm,
  adFormResetButton,
  onResetAdForm,
  adForm
};
