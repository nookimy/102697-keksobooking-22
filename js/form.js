const form = document.querySelector('.ad-form');
const formElement = document.querySelectorAll('fieldset');
const address = form.querySelector('#address');
const title = form.querySelector('#title');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');



// неактивное состояние формы

const inactiveForm = () => {
  form.classList.add('ad-form--disabled');
  formElement.forEach((formElement) => {
    formElement.disabled = true;
  });
};

// активное состояние формы

const activeForm = () => {
  form.classList.remove('ad-form--disabled');
  formElement.forEach((formElement) => {
    formElement.disabled = false;
  });
};

//Заголовок


const titleLenghtMin = 30;
const titleLenghtMax = 100;

title.addEventListener('input', () => {
  const titleLength = title.value.length;
  if (titleLength < titleLenghtMin) {
    title.setCustomValidity('Ещё ' + (titleLenghtMin - titleLength) +' симв.');
  } else if (titleLength > titleLenghtMax) {
    title.setCustomValidity('Удалите лишние ' + (titleLenghtMax - titleLength) +' симв.');
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

// Минимальная цена для разных типов жилья

const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

// Зависимость минимальной цены от типа жилья

price.min = minPrices[type.value];
price.setAttribute('min', price.min);
price.setAttribute('max', 1000000);

price.addEventListener('input', () => {
  price.reportValidity();
});

type.addEventListener('change', () => {
  price.placeholder = minPrices[type.value];
  price.min = minPrices[type.value];
});

// Зависимость времени заезда и выезда

checkin.addEventListener('change', () => {
  checkout.value = checkin.value;
});

checkout.addEventListener('change', () => {
  checkin.value = checkout.value;
});

// Количество комнат и количество мест
const roomNumber = form.querySelector('#room_number');
const guestNumber = form.querySelector('#capacity');
const noGuests = {
  value: 100,
  text: 'не для гостей',
};

const oneGuests = {
  value: 1,
  text: 'для 1 гостя',
};

const twoGuests = {
  value: 2,
  text: 'для 2 гостей',
};

const threeGuests = {
  value: 3,
  text: 'для 3 гостей',
};

const options = {
  100: [noGuests],
  1: [oneGuests],
  2: [twoGuests, oneGuests],
  3: [threeGuests, twoGuests, oneGuests],
};

const getOptions = function (guests) {
  for (let i = 0; i < guests.length; i++) {
    const option = document.createElement('option');
    option.value = guests[i].value;
    option.innerHTML = guests[i].text;
    guestNumber.appendChild(option);
  }
};

// Зависимость количества комнат от количества мест
roomNumber.addEventListener('change', function () {
  const roomNumberValue = roomNumber.value;
  guestNumber.value = (roomNumberValue === '100') ? '0' : roomNumberValue;

  while (guestNumber.firstChild) {
    guestNumber.removeChild(guestNumber.firstChild);
  }

  getOptions(options[roomNumberValue]);
});

inactiveForm();

export {address, activeForm}
