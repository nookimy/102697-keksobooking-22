import { isEnterEvent, isEscEvent} from './util.js';

const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const tryAgainButton = errorModal.querySelector('.error__button');

successModal.classList.add('hidden');
errorModal.classList.add('hidden');
document.body.append(successModal);
document.body.append(errorModal);

const closeModal = (modal) => {
  modal.classList.add('hidden');
};

const onModalEscKeydown = (modal) => {
  return (evt) => {
    if (isEscEvent(evt) || isEnterEvent(evt)) {
      evt.preventDefault();
      modal.removeEventListener('keydown', onModalEscKeydown(modal));
      modal.removeEventListener('click', onClick(modal));
      closeModal(modal);
    }
    if (modal === errorModal) {
      tryAgainButton.removeEventListener('click', onClick(errorModal));
    }
  }
};

const onClick = (modal) => {
  return (evt) => {
    evt.preventDefault();
    closeModal(modal);
  }
};

const showModal = (modal) => {
  modal.classList.remove('hidden');
  modal.style.zIndex = '10000';
  document.addEventListener('keydown', onModalEscKeydown(successModal));
  modal.addEventListener('click', onClick(successModal));
};

const showSuccessModal = () => {
  showModal(successModal);
};

const showErrorModal = () => {
  showModal(errorModal);
  tryAgainButton.addEventListener('click', onClick(errorModal));
};

export { showSuccessModal, closeModal, showErrorModal };
