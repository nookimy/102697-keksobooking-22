import { onFileUpload, fileTypes } from './util.js';

const fileChooser = document.querySelector('.ad-form__field input[type=file]');
const preview = document.querySelector('.ad-form-header__preview img');

const clearOutAvatar = () => {
  preview.src = 'img/muffin-grey.svg';
}

fileChooser.addEventListener('change', onFileUpload(fileChooser, preview, fileTypes));

export { clearOutAvatar }
