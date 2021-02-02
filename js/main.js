// Функция, возвращающая случайное целое число из переданного диапазона включительно. Ссылка на источник https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInt = function (min, max) {
  if (min > max && min <= 0) {
    alert('Значение «от» должно быть больше или равно значению «до» и положительным');
  } if (min > max && min > 0) {
    alert('Значение «от» должно быть больше или равно значению «до»');
  } if (min <= 0) {
    alert('Диапазон может быть только положительный')
  } if ((max - min) < 1 && !Number.isInteger(min)) {
    alert('В данном диапазоне нет целых чисел')
  } if (min == max && Number.isInteger(min)) {
    return min;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt();

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloat = function (min, max, decimal = 2) {
  if (min > max && min <= 0) {
    alert('Значение «от» должно быть больше или равно значению «до» и положительным');
  } if (min > max && min > 0) {
    alert('Значение «от» должно быть больше или равно значению «до»');
  } if (min <= 0) {
    alert('Диапазон может быть только положительный')
  } if (min == max) {
    return (min).toFixed(decimal);
  }
  return +((Math.random() * (max - min) + min).toFixed(decimal));
}

getRandomFloat();
