const getRandomInt = (min, max) => {
  if (min < 0 || max < min) {
    return undefined;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomFloat = (min, max, decimal = 2) => {
  if (min < 0 || max < min) {
    return undefined;
  }
  return ((Math.random() * (max - min) + min).toFixed(decimal));
};

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const getArrayRandomLength = (inputArray)  => {
  const length = getRandomInt(0, inputArray.length); //длина выходного массива
  const copyArray = inputArray.slice(0); //копия массива из которой будем убирать уже использованные элементы
  const outputArray = []; //выходной массив

  for (let i = 0; i < length; i++) { //формируем выходной массив
    const randomIndex = getRandomInt(0, copyArray.length - 1);
    const randomElement = copyArray[randomIndex]; //взяли эллемент из копии
    outputArray.push(randomElement);  // вставили его в выходной массив
    copyArray.splice(randomIndex, 1); //удаляем элемент из коппии, чтобы на следующей итерации небыло возможности взять дубль.
  }
  return outputArray;
};

// склонение окончания существительных
const getNumeralDeclension = (number, words) => {
  number = Math.abs(number) % 100;
  const number2 = number % 10;
  if (number > 10 && number < 20) {
    return words[2];
  }
  if (number2 > 1 && number2 < 5) {
    return words[1];
  }
  if (number2 === 1) {
    return words[0];
  }
  return words[2];
}

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onFileUpload = (fileChooser, preview, FILE_TYPES) => {
  return (evt) => {
    evt.preventDefault();
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }
}

const isEnterEvent = (evt) => evt.key === 'Enter';

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isInPage = (node) => {
  return (node === document.body) ? false : document.body.contains(node);
};

export {
  getRandomInt,
  getRandomFloat,
  getRandomArrayElement,
  getArrayRandomLength,
  getNumeralDeclension,
  onFileUpload,
  FILE_TYPES,
  isEnterEvent,
  isEscEvent,
  isInPage
};
