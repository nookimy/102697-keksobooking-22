import { getNumeralDeclension } from './util.js';

const PROPERTY_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const ROOMS_DECLENSION = [
  'комната',
  'комнаты',
  'комнат',
];

const GUESTS_DECLENSION = [
  'гостя',
  'гостей',
  'гостей',
];

const PhotoPreviewSize = {
  WIDTH: 45,
  HEIGHT: 40,
};

const AvatarSize = {
  WIDTH: 70,
  HEIGHT: 70,
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderCard = (({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__type').textContent = PROPERTY_TYPES[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getNumeralDeclension(offer.rooms, ROOMS_DECLENSION)} для ${offer.guests} ${getNumeralDeclension(offer.guests, GUESTS_DECLENSION)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;

  // Удобства
  const featuresList = cardElement.querySelector('.popup__features');
  const renderFeaturesList = () => {
    featuresList.textContent = '';
    offer.features.forEach((item, i) => {
      let feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${offer.features[i]}`);
      featuresList.append(feature);
    });
  };
  if (offer.features.length > 0) {
    renderFeaturesList();
  } else {
    featuresList.remove();
  }

  // Фото
  const photosList = cardElement.querySelector('.popup__photos');
  const renderPhotosList = () => {
    photosList.textContent = '';
    offer.photos.forEach((item, i) => {
      let photo = document.createElement('img');
      photo.src = offer.photos[i];
      photo.classList.add('popup__photo');
      photo.style.width = `${PhotoPreviewSize.WIDTH}px`;
      photo.style.height = `${PhotoPreviewSize.HEIGHT}px`;
      photo.alt = 'Фотография жилья';
      photosList.appendChild(photo);
    });
  };
  if (offer.photos.length > 0) {
    renderPhotosList();
  } else {
    photosList.remove();
  }

  // Прайс
  const renderPrice = () => {
    const priceContent = cardElement.querySelector('.popup__text--price'); // селектор для вставки цены
    const priceParam = priceContent.querySelector('span'); // блок ₽/ночь
    priceContent.textContent = `${offer.price} `; // в селектор добавляем цену
    priceContent.appendChild(priceParam); // в конец селектора добавляем блок ₽/ночь
    return priceContent;
  }
  renderPrice();

  // Аватар
  const renderAvatar = (src) => {
    const avatar = cardElement.querySelector('.popup__avatar');
    avatar.src = src;
    avatar.style.width = `${AvatarSize.WIDTH}px`;
    avatar.style.height = `${AvatarSize.HEIGHT}px`;
    return avatar;
  }
  renderAvatar(author.avatar);

  return cardElement;
})

export {renderCard};
