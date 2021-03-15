/* global L:readonly */

import {activeAdForm, fillAddress, onResetAdForm} from './form.js';
import {activeFilter} from './filter.js';
import {renderCard} from './card.js';

const startLatitude = 35.6804;
const startLongitude = 139.7690;
const mapZoom = 9;
const mainPointerWidth = 52;
const pointerWidth = 40;

const map = L.map('map-canvas');
const markers = [];

const onPinMove = (evt) => {
  const lat = evt.target.getLatLng().lat;
  const long = evt.target.getLatLng().lng;
  fillAddress(lat, long);
}

const renderCards = (advertisements) => {
  advertisements.forEach(({author, location, offer}) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [pointerWidth, pointerWidth],
      iconAnchor: [pointerWidth / 2, pointerWidth],
    });
    const lat = location.lat;
    const lng = location.lng;
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
        renderCard({author, offer}),
        {
          keepInView: true,
        },
      );
    markers.push(marker);
  });
}

const removeMapMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  })
}

const setUpMap = (advertisements) => {
  map
    .on('load', () => {
      activeAdForm();
      fillAddress(startLatitude, startLongitude);
      onResetAdForm();
      activeFilter();
    })
    .setView({
      lat: startLatitude,
      lng: startLongitude,
    }, mapZoom);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  renderCards(advertisements);
}

const initMainPinMarker = () => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [mainPointerWidth, mainPointerWidth],
    iconAnchor: [mainPointerWidth / 2, mainPointerWidth],
  });

  const mainPinMarker = L.marker(
    {
      lat: startLatitude,
      lng: startLongitude,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  return mainPinMarker;
}

const mainPinMarker = initMainPinMarker();

mainPinMarker.addTo(map);
mainPinMarker.on('move', onPinMove);

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng(L.latLng(startLatitude, startLongitude));
}

export {
  setUpMap,
  resetMainPinMarker,
  startLatitude,
  startLongitude,
  renderCards,
  removeMapMarkers
};
