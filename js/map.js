/* global L:readonly */

import {elementsForm, activeForm} from './form.js';
import {activeFilter} from './filter.js';
import {createAds} from './data.js';
import {renderCard} from './card.js';

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

// пользователь передвигает маркер
mainPinMarker.on('move', (evt) => {
  elementsForm.address.value = `
  ${evt.target.getLatLng().lat.toFixed(5)},
  ${evt.target.getLatLng().lng.toFixed(5)}`;
});

// массив точек на карте

const points = createAds();


// по циклу насоздаём маркеров и понадобавляем их на карту
points.forEach((ads) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const lat = ads.location.x;
  const lng = ads.location.y;

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
    .bindPopup(
      renderCard(ads),
      {
        keepInView: true,
      },
    );
});
