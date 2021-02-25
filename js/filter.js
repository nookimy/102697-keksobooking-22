const mapFilters = document.querySelector('.map__filters'); // форма фильтрации объявлений
const mapFilter = document.querySelectorAll('.map__filter'); // выпадающие списки в форме фильтрации
const mapFeatures = document.querySelector('.map__features'); // выбор удобств в форме фильтрации

//неактивное состояние фильтров
const inactiveFilter = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach((filterElement) => {
    filterElement.disabled = true;
  });
  mapFeatures.disabled = true;
};
