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
  START_LATITUDE,
  START_LONGITUDE
} from './map.js';

import { getData } from './data-api.js';

import { MAX_ADS_COUNT, MIN_ADS_COUNT } from './data.js';

import {
  adForm,
  adFormResetButton,
  submitAdForm,
  deactivateAdForm,
  fillAddress,
  onResetAdForm
} from './form.js';

import { showErrorModal, showSuccessModal } from './modal.js';
import { deactivateFilter, mapFilters, setFilterChange, closeBalun } from './filter.js';
import { clearOutAvatar } from './avatar.js';
import { clearOutPhoto } from './photo.js';

const ALERT_SHOW_TIME = 5000;

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
    }, ALERT_SHOW_TIME);
  }
}

const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
let advertisementsToRender = [];

const setDefaults = () => {
  mapFilters.reset();
  adForm.reset();
  closeBalun();
  clearOutAvatar();
  clearOutPhoto();
  resetMainPinMarker();
  onResetAdForm();
  renderCards(advertisementsToRender);
  fillAddress(START_LATITUDE, START_LONGITUDE);
}

deactivateAdForm();
deactivateFilter();

getData(GET_URL, (advertisements) => {
  advertisementsToRender = advertisements.slice(MIN_ADS_COUNT, MAX_ADS_COUNT);
  setUpMap(advertisementsToRender);
  setFilterChange(advertisementsToRender);
  adFormResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setDefaults();
  });
}, showAlert('Не удалось загрузить данные об объектах'))

submitAdForm(() => {
  showSuccessModal();
  setDefaults();
}, showErrorModal);
