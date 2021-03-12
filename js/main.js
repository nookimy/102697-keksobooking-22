import './util.js';
import './data.js';
import './card.js';
import './form.js';
import './filter.js';
import './map.js';
import './data-api.js';
import './avatar.js';
import './photo.js';

import {
  renderCards,
  resetMainPinMarker,
  setUpMap,
  STARTING_LATITUDE,
  STARTING_LONGITUDE
} from './map.js';

import { getData } from './data-api.js';

import { ADDS_COUNT, MIN_ADDS } from './data.js';

import {
  adForm,
  adFormResetButton,
  advertisementFormSubmit,
  inactiveAdForm,
  fillAddress,
  onResetAdForm
} from './form.js';

import { showErrorModal, showSuccessModal } from './modal.js';
import { inactiveFilter, mapFilters, setFilterChange } from './filter.js';
import { clearOutAvatar } from './avatar.js';
import { clearOutPhoto } from './photo.js';

const showAlert = (message='Не удалось загрузить данные') => {
  return () => {
    const alertContainer = document.createElement('div');
    alertContainer.style.display = 'block';
    alertContainer.style.zIndex = '100';
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '0';
    alertContainer.style.top = '0';
    alertContainer.style.right = '0';
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '30px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';
    alertContainer.textContent = message;

    document.body.append(alertContainer);

    setTimeout(() => {
      alertContainer.remove();
    }, 5000);
  }
}

const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
let advertisementsToRender = [];

const setDefaults = () => {
  mapFilters.reset();
  adForm.reset();
  clearOutAvatar();
  clearOutPhoto();
  resetMainPinMarker();
  onResetAdForm();
  renderCards(advertisementsToRender);
  fillAddress(STARTING_LATITUDE, STARTING_LONGITUDE);
}

inactiveAdForm();
inactiveFilter();

getData(GET_URL, (advertisements) => {
  advertisementsToRender = advertisements.slice(MIN_ADDS, ADDS_COUNT);
  setUpMap(advertisementsToRender);
  setFilterChange(advertisementsToRender);
  adFormResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setDefaults();
  });
}, showAlert('Не удалось загрузить данные об объектах'))

advertisementFormSubmit(() => {
  showSuccessModal();
  setDefaults();
}, showErrorModal);
