const adForm = document.querySelector('.ad-form'); // форма объявления
const adFormElement = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters'); // форма фильтрации объявлений
const mapFilter = document.querySelectorAll('.map__filter'); //
const mapFeatures = document.querySelector('.map__features'); //

// неактивное состояние формы
const inactiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElement.forEach((formElement) => {
    formElement.disabled = true;
  });
};

//неактивное состояние фильтров
const inactiveFilter = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach((filterElement) => {
    filterElement.disabled = true;
  });
  mapFeatures.disabled = true;
};

// поля для заполнения
const elementsForm = {
  type: adForm.querySelector('#type'),
  price: adForm.querySelector('#price'),
  checkin: adForm.querySelector('#timein'),
  checkout: adForm.querySelector('#timeout'),
};


const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

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

inactiveFilter();
inactiveForm();
