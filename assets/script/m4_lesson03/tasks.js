'use strict';

//Задача #2
{
  const rain = Math.round(Math.random());

  if (rain === 1) console.log('Пошёл дождь. Возьмите зонт!');

  if (rain === 0) console.log('Дождя нет!');
}



//Задача #3
{
  const mathExamScore = prompt(
    'Введите кол-во баллов по математике'
  );
  const russianLanguageExamScore = prompt(
    'Введите кол-во баллов по русскому языку'
  );
  const computerScienceExamScore = prompt(
    'Введите кол-во баллов по информатике'
  );

  if (
    isNaN(+mathExamScore) === true ||
    isNaN(+russianLanguageExamScore) === true ||
    isNaN(+computerScienceExamScore) === true
  ) {
    console.log('Вы ввели некорректные данные');
  } else if (
    +mathExamScore < 0 ||
    +russianLanguageExamScore < 0 ||
    +computerScienceExamScore < 0
  ) {
    console.log('Вы ввели некорректные данные');
  } else if (
    +mathExamScore + +russianLanguageExamScore + +computerScienceExamScore >=
    625
  ) {
    console.log('Поздравляю, вы поступили на бюджет!');
  } else {
    console.log('Вы не прошли экзамены.');
  }
}

//Задача #4
{
  const cashThatUserNeeds = prompt('Введите сумму для снятия со счета.');

  if (isNaN(+cashThatUserNeeds) === false) {
    if (+cashThatUserNeeds < 100) {
      console.log('Банкомат выдаёт только купюры от 100₽ и крупнее.');
    } else if (+cashThatUserNeeds % 100 != 0) {
      console.log(
        `Банкомат выдает только суммы, кратные 100. Сумма ${
          Math.round(+cashThatUserNeeds / 100) * 100
        }₽ наиболее близка к указанной вами. Желаете снять?`
      );
    } else {
      console.log(
        `Вы запросили сумму в ${cashThatUserNeeds}₽. Заберите купюры из приемника.`
      );
    }
  } else {
    console.log('Вы ввели некорректные данные.');
  }
}