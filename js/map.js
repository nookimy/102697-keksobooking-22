/* global L:readonly */

import {activateAdForm, fillAddress, onResetAdForm} from './form.js';
import {activateFilter} from './filter.js';
import {renderCard} from './card.js';

const START_LATITUDE = 35.6804;
const START_LONGITUDE = 139.7690;
const MAP_ZOOM = 9;
const MAIN_POINT_WIDTH = 52;
const POINT_WIDTH = 40;

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
      iconSize: [POINT_WIDTH, POINT_WIDTH],
      iconAnchor: [POINT_WIDTH / 2, POINT_WIDTH],
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
      activateAdForm();
      fillAddress(START_LATITUDE, START_LONGITUDE);
      onResetAdForm();
      activateFilter();
    })
    .setView({
      lat: START_LATITUDE,
      lng: START_LONGITUDE,
    }, MAP_ZOOM);

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
    iconSize: [MAIN_POINT_WIDTH, MAIN_POINT_WIDTH],
    iconAnchor: [MAIN_POINT_WIDTH / 2, MAIN_POINT_WIDTH],
  });

  const mainPinMarker = L.marker(
    {
      lat: START_LATITUDE,
      lng: START_LONGITUDE,
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
  mainPinMarker.setLatLng(L.latLng(START_LATITUDE, START_LONGITUDE));
}

export {
  setUpMap,
  resetMainPinMarker,
  START_LATITUDE,
  START_LONGITUDE,
  renderCards,
  removeMapMarkers
};
