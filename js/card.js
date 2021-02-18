import {createAds} from './data.js';

const propertyTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const blockListElement = document.querySelector('.map__canvas'); // контейнер для похожих объявлений
const cardTemplate = document.querySelector('#card').content.querySelector('.popup'); //шаблон карточки объявления

const renderCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true); // создаем полную копию шаблона объявления
  const featuresList = cardElement.querySelector('.popup__features');
  const photosList = cardElement.querySelector('.popup__photos');

  // Удобства
  const renderFeaturesList = () => {
    featuresList.textContent = '';
    card.offer.features.forEach((item, i) => {
      let feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${card.offer.features[i]}`);
      featuresList.append(feature);
    });
  };

  // Фото
  const renderPhotosList = (width, height) => {
    photosList.textContent = '';
    card.offer.photos.forEach((item, i) => {
      let photo = document.createElement('img');
      photo.src = card.offer.photos[i];
      photo.classList.add('popup__photo');
      photo.style.width = `${width}px`;
      photo.style.height = `${height}px`;
      photo.alt = 'Фотография жилья';
      photosList.appendChild(photo);
    });
  };

  // Прайс
  const renderPrice = () => {
    const priceContent = cardElement.querySelector('.popup__text--price'); // селектор для вставки цены
    const priceParam = priceContent.querySelector('span'); // блок ₽/ночь
    priceContent.textContent = `${card.offer.price} `; // в селектор добавляем цену
    priceContent.appendChild(priceParam); // в конец селектора добавляем блок ₽/ночь
    return priceContent;
  }

  // Аватар
  const renderAvatar = (src, width, height) => {
    const avatar = cardElement.querySelector('.popup__avatar');
    avatar.src = src;
    avatar.style.width = `${width}px`;
    avatar.style.height = `${height}px`;
    return avatar;
  }

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  renderPrice();
  cardElement.querySelector('.popup__type').textContent = propertyTypes[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  if (card.offer.features.length > 0) {
    renderFeaturesList();
  } else {
    featuresList.remove();
  };

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  if (card.offer.photos.length > 0) {
    renderPhotosList(45, 40);
  } else {
    photosList.remove();
  };

  renderAvatar(card.author.avatar, 70, 70);

  return cardElement;
};

blockListElement.appendChild(renderCard(createAds()[0]));
