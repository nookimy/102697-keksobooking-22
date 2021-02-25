import {elementsForm, activeForm} from './form.js';
import {activeFilter} from './filter.js';
import {createAds} from './data.js';

const mapCenter = {
  lat: 35.6895000,
  lng: 139.6917100,
}

const map = L.map('map-canvas')
.on('load', () => { // Инициализация карты
  activeForm();
  activeFilter();
  })
  .setView({
    lat: mapCenter.lat,
    lng: mapCenter.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

//создаем маркер
const mainPinMarker = L.marker(
  {
    lat: mapCenter.lat,
    lng: mapCenter.lng,
  },
  {
    draggable: true, // маркер можно передвигать
    icon: mainPinIcon, // добавление своей иконки на карту
  },
);

// добавляем маркер на карту
mainPinMarker.addTo(map);

// пользователь закончил передвигать маркер
mainPinMarker.on('move', (evt) => {
  // всё сложно...
});

// массив точек на карте
const points = [
  {
    title: 'Футура',
    lat: 59.96925,
    lng: 30.31730,
  },
  {
    title: 'Шаверма',
    lat: 59.96783,
    lng: 30.31258,
  },
  {
    title: 'Франк',
    lat: 59.95958,
    lng: 30.30228,
  },
  {
    title: 'Ginza',
    lat: 59.97292,
    lng: 30.31982,
  },
];

// по циклу насоздаём маркеров и понадобавляем их на карту
points.forEach(({lat, lng, title}) => {
  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(title);
});
