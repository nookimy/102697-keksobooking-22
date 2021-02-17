import {createAds} from './data.js';

const propertyTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};


const blockListElement = document.querySelector('.map__canvas'); // контейнер для похожих объявлений
const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); //шаблон карточки объявления

//отрисовка карточки объявления
const renderCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true); // создаем полную копию шаблона объявления

  const photosList = popupElement.querySelector('.popup__photos'); // список фото

  // список с удобствами
  const renderFeaturesList = () => { //
    featuresList.textContent = ''; // очищаем от контента блок списка удобств
    card.offer.features.forEach((item, i) => {
      let feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${popup.offer.features[i]}`);
      featuresList.append(feature);
    });
  };

  const renderPhotosList = () => {
    photosList.textContent = '';
    popup.offer.photos.forEach((item, i) => {
      let photo = document.createElement('img');
      photo.src = popup.offer.photos[i];
      photo.classList.add('popup__photo');
      photo.style.width = `${PhotosPreviewsSizes.WIDTH}px`;
      photo.style.height = `${PhotosPreviewsSizes.HEIGHT}px`;
      photo.alt = 'Фотография жилья';
      photosList.appendChild(photo);
    });
  };


  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = propertyTypes[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  // cardElement.querySelector('.popup__features').textContent = 'надо подумать';
  const featuresList = popupElement.querySelector('.popup__features'); // список удобств
  featuresList.textContent = ''; // очищаем от контента блок списка удобств

  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  // cardElement.querySelector('.popup__photos').textContent = 'надо подумать';
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

blockListElement.appendChild(renderCard(createAds()[0]));


{/* <article class="popup">


  <ul class="popup__features">
    <li class="popup__feature popup__feature--wifi"></li>
    <li class="popup__feature popup__feature--dishwasher"></li>
    <li class="popup__feature popup__feature--parking"></li>
    <li class="popup__feature popup__feature--washer"></li>
    <li class="popup__feature popup__feature--elevator"></li>
    <li class="popup__feature popup__feature--conditioner"></li>
  </ul>

  <div class="popup__photos">
    <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
  </div>
</article> */}
