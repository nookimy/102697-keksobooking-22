import { removeMapMarkers, renderCards } from './map.js';

const renderDelay = 500;

const mapFilters = document.querySelector('.map__filters'); // форма фильтрации объявлений
const mapFilter = document.querySelectorAll('.map__filter'); // выпадающие списки в форме фильтрации
const mapFeatures = document.querySelector('.map__features'); // выбор удобств в форме фильтрации

const housingTypeSelect = mapFilters.querySelector('#housing-type');
const housingPriceSelect = mapFilters.querySelector('#housing-price');
const housingRoomsSelect = mapFilters.querySelector('#housing-rooms');
const housingGuestsSelect = mapFilters.querySelector('#housing-guests');

//неактивное состояние фильтров
const inactiveFilter = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach((filterElement) => {
    filterElement.disabled = true;
  });
  mapFeatures.disabled = true;
};

//активное состояние фильтров
const activeFilter = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilter.forEach((filterElement) => {
    filterElement.disabled = false;
  });
  mapFeatures.disabled = false;
};

function debounce (fn, wait) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, arguments), wait);
  }
}

const checkType = (advertisement, element) => {
  return element.value === 'any' || advertisement.offer.type === element.value;
};

const checkPrice = (advertisement, element) => {
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;
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
}

const checkRooms = (advertisement, element) => {
  return element.value === 'any' || Number(element.value) === advertisement.offer.rooms;
}

const checkGuests = (advertisement, element) => {
  if (element.value === 'any') {
    return true;
  }
  return parseInt(element.value, 10) <= advertisement.offer.guests;
}

const checkFeatures = (advertisement) => {
  const checkedFeatures = mapFilters.querySelectorAll('.map__checkbox:checked');
  let count = 0;

  checkedFeatures.forEach((feature) => {
    if (advertisement.offer.features.includes(feature.value))
      count++;
  })

  return count === checkedFeatures.length;
}

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
  }, renderDelay);
}

const setFilterChange = (advertisements) => {
  mapFilters.addEventListener('change', onFilterChange(advertisements));
};

export {
  inactiveFilter,
  activeFilter,
  mapFilters,
  setFilterChange
};
