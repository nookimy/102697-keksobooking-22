// Функция, возвращающая случайное целое число из переданного диапазона включительно. Ссылка на источник https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomInt = function (min, max) {
  if (min < 0) {
    alert('Диапазон чисел должен быть положительным');
  } if (max < min || max == min) {
    alert('Значение «от» должно быть больше значению «до»');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

alert(getRandomInt(100.46, 200.46));



// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloat = function (min, max, decimal = 2) {
  if (min < 0) {
    alert('Диапазон чисел должен быть положительным');
  } if (max < min || max == min) {
    alert('Значение «от» должно быть больше значению «до»');
  }
  return +((Math.random() * (max - min) + min).toFixed(decimal));
}

alert(getRandomFloat(100.46, 200.46));
