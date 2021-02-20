const adForm = document.querySelector('.ad-form');

// поля для заполнения
const elementsForm = {
  type: adForm.querySelector('#type'),
  price: adForm.querySelector('#price'),
  checkin: adForm.querySelector('#timein'),
  checkout: adForm.querySelector('#timeout'),
}


const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

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
