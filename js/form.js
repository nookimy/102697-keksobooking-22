const adForm = document.querySelector('.ad-form'); // форма объявления
const adFormElement = document.querySelectorAll('fieldset'); // все элементы формы объявлений

// неактивное состояние формы
const inactiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElement.forEach((formElement) => {
    formElement.disabled = true;
  });
};

// активное состояние формы
const activeForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElement.forEach((formElement) => {
    formElement.disabled = false;
  });
};

// поля для заполнения
const elementsForm = {
  title: adForm.querySelector('#title'),
  type: adForm.querySelector('#type'),
  price: adForm.querySelector('#price'),
  checkin: adForm.querySelector('#timein'),
  checkout: adForm.querySelector('#timeout'),
  address: adForm.querySelector('#address'),
  roomNumber: adForm.querySelector('#room_number'),
  guestNumber: adForm.querySelector('#capacity'),
};

// Валидация заголовка
const minTitleLenght = 30;
const maxTitleLenght = 100;

elementsForm.title.addEventListener('input', () => {
  const titleLength = elementsForm.title.value.length;
  if (titleLength < minTitleLenght) {
    elementsForm.title.setCustomValidity('Ещё ' + (minTitleLenght - titleLength) +' симв.');
  } else if (titleLength > maxTitleLenght) {
    elementsForm.title.setCustomValidity('Удалите лишние ' + (maxTitleLenght - titleLength) +' симв.');
  } else {
    elementsForm.title.setCustomValidity('');
  }

  elementsForm.title.reportValidity();
});

const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

// Валидация цены
elementsForm.price.min = minPrices[elementsForm.type.value];
elementsForm.price.setAttribute('min', elementsForm.price.min);
elementsForm.price.setAttribute('max', 1000000);

elementsForm.price.addEventListener('input', () => {
  elementsForm.price.reportValidity();
});

// Тип жилья
elementsForm.type.addEventListener('change', () => {
  elementsForm.price.placeholder = minPrices[elementsForm.type.value];
  elementsForm.price.min = minPrices[elementsForm.type.value];
});

elementsForm.checkin.addEventListener('change', () => {
  elementsForm.checkout.value = elementsForm.checkin.value;
});

elementsForm.checkout.addEventListener('change', () => {
  elementsForm.checkin.value = elementsForm.checkout.value;
});

// Количество комнат и количество мест
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
  2: [oneGuests, twoGuests],
  3: [oneGuests, twoGuests, threeGuests],
};

const getOptions = function (guests) {
  for (let i = 0; i < guests.length; i++) {
    const option = document.createElement('option');
    option.value = guests[i].value;
    option.innerHTML = guests[i].text;
    elementsForm.guestNumber.appendChild(option);
  }
};

// Зависимость количества комнат от количества мест
elementsForm.roomNumber.addEventListener('change', function () {
  const roomNumberValue = elementsForm.roomNumber.value;
  elementsForm.guestNumber.value = (roomNumberValue === '100') ? '0' : roomNumberValue;

  while (elementsForm.guestNumber.firstChild) {
    elementsForm.guestNumber.removeChild(elementsForm.guestNumber.firstChild);
  }

  getOptions(options[roomNumberValue]);
});

inactiveForm();

export {elementsForm, activeForm}
