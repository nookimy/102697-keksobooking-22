import { isEnterEvent, isEscEvent} from './util.js';

const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const tryAgainButton = errorModal.querySelector('.error__button');

successModal.classList.add('hidden');
errorModal.classList.add('hidden');
document.body.append(successModal);
document.body.append(errorModal);

const closeModal = (modal) => {
  removeHandlers(modal);
  modal.classList.add('hidden');
};

const removeHandlers = (modal) => {
  document.removeEventListener('keydown', keyDownHandler(modal));
  modal.removeEventListener('click', onClickHandler(modal));
  if (modal === errorModal) {
    tryAgainButton.removeEventListener('click', onClickHandler(errorModal));
  }
};

const keyDownHandler = (modal) => {
  return (evt) => {
    if (isEscEvent(evt) || isEnterEvent(evt)) {
      evt.preventDefault();
      closeModal(modal);
    }
  }
};

const onClickHandler = (modal) => {
  return (evt) => {
    evt.preventDefault();
    closeModal(modal);
  }
};

const showModal = (modal) => {
  modal.classList.remove('hidden');
  modal.style.zIndex = '10000';
  document.addEventListener('keydown', keyDownHandler(modal));
  modal.addEventListener('click', onClickHandler(modal));
};

const showSuccessModal = () => {
  showModal(successModal);
};

const showErrorModal = () => {
  showModal(errorModal);
  tryAgainButton.addEventListener('click', onClickHandler(errorModal));
};

export { showSuccessModal, showErrorModal };
