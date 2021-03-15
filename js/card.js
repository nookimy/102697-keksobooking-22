import {createAds} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const propertyTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const getGuestsNumber = (guests) => {
  return (guests % 10 === 1 && guests !== 11) ? `${guests} гостя` : `${guests} гостей`;
}

const getRoomsNumber = (rooms) => {
  const reminder = rooms % 10;
  if (rooms >= 5 && rooms <= 20 || rooms === 0) {
    return `${rooms} комнат`;
  }
  if (reminder === 1) {
    return `${rooms} комната`;
  }
  if (reminder > 1 && reminder < 5) {
    return `${rooms} комнаты`;
  }
  return `${rooms} комнат`;
}

const renderCard = (({author, offer}) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__type').textContent = propertyTypes[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${getRoomsNumber(offer.rooms)} для ${getGuestsNumber(offer.guests)}`;
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
  const renderPhotosList = (width, height) => {
    photosList.textContent = '';
    offer.photos.forEach((item, i) => {
      let photo = document.createElement('img');
      photo.src = offer.photos[i];
      photo.classList.add('popup__photo');
      photo.style.width = `${width}px`;
      photo.style.height = `${height}px`;
      photo.alt = 'Фотография жилья';
      photosList.appendChild(photo);
    });
  };
  if (offer.photos.length > 0) {
    renderPhotosList(45, 40);
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
  const renderAvatar = (src, width, height) => {
    const avatar = cardElement.querySelector('.popup__avatar');
    avatar.src = src;
    avatar.style.width = `${width}px`;
    avatar.style.height = `${height}px`;
    return avatar;
  }
  renderAvatar(author.avatar, 70, 70);

  return cardElement;
})


// Блок для отрисовки карточки
const blockListElement = document.querySelector('.map__canvas');
blockListElement.appendChild(renderCard(createAds()[0]));

export {renderCard};
