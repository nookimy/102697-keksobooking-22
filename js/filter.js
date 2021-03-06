import { isEscEvent, isInPage } from './util.js';
import { removeMapMarkers, renderCards } from './map.js';

const RENDER_DELAY = 500;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const leafletPane = document.querySelector('.leaflet-pane');
const leafletAllMarkers = document.querySelector('.leaflet-marker-pane');

const mapFilters = document.querySelector('.map__filters'); // форма фильтрации объявлений
const mapFilter = document.querySelectorAll('.map__filter'); // выпадающие списки в форме фильтрации
const mapFeatures = document.querySelector('.map__features'); // выбор удобств в форме фильтрации
const housingTypeSelect = mapFilters.querySelector('#housing-type');
const housingPriceSelect = mapFilters.querySelector('#housing-price');
const housingRoomsSelect = mapFilters.querySelector('#housing-rooms');
const housingGuestsSelect = mapFilters.querySelector('#housing-guests');

//неактивное состояние фильтров
const deactivateFilter = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach((filterElement) => {
    filterElement.disabled = true;
  });
  mapFeatures.disabled = true;
};

//активное состояние фильтров
const activateFilter = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilter.forEach((filterElement) => {
    filterElement.disabled = false;
  });
  mapFeatures.disabled = false;
};

const debounce = (fn, wait) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, arguments), wait);
  }
};

const checkType = (advertisement, element) => {
  return element.value === 'any' || advertisement.offer.type === element.value;
};

const checkPrice = (advertisement, element) => {
  switch (element.value) {
    case 'any':
      return true;
    case 'low':
      return advertisement.offer.price < LOW_PRICE;
    case 'middle':
      return advertisement.offer.price >= LOW_PRICE && advertisement.offer.price < HIGH_PRICE;
    case 'high':
      return advertisement.offer.price >= HIGH_PRICE;
    default:
      return false;
  }
};

const checkRooms = (advertisement, element) => {
  return element.value === 'any' || Number(element.value) === advertisement.offer.rooms;
};

const checkGuests = (advertisement, element) => {
  if (element.value === 'any') {
    return true;
  }
  return parseInt(element.value, 10) <= advertisement.offer.guests;
};

const checkFeatures = (advertisement) => {
  const checkedFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
  let count = 0;

  checkedFeatures.forEach((feature) => {
    if (advertisement.offer.features.includes(feature.value)) {
      count++;
    }
  })

  return count === checkedFeatures.length;
};

const getFilteredAds = (advertisements) => {
  const filteredAdvertisements = advertisements.filter((advertisement) => {
    return (
      checkType(advertisement, housingTypeSelect) &&
      checkPrice(advertisement, housingPriceSelect) &&
      checkRooms(advertisement, housingRoomsSelect) &&
      checkGuests(advertisement, housingGuestsSelect) &&
      checkFeatures(advertisement)
    )
  })
  return filteredAdvertisements;
}

const onFilterChange = (advertisements) => {
  return debounce((evt) => {
    evt.preventDefault();
    const filteredAdds = getFilteredAds(advertisements);
    removeMapMarkers();
    renderCards(filteredAdds);
  }, RENDER_DELAY);
}

const setFilterChange = (advertisements) => {
  mapFilters.addEventListener('change', onFilterChange(advertisements));
};

const closeBalun = () => {
  if (isInPage(leafletPane.querySelector('.leaflet-popup'))) {
    document.querySelector('.leaflet-popup-close-button').click();
  }
};

leafletAllMarkers.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBalun();
  }
});

export {
  deactivateFilter,
  activateFilter,
  mapFilters,
  setFilterChange,
  closeBalun
};
