'use strict';

{
  let totalIncome = prompt('Укажите ваш доход');
  let taxRate;
  
  if (isNaN(+totalIncome) === false && +totalIncome >= 0) {
    if (+totalIncome < 15000) {
      taxRate = 0.13;
    } else if (+totalIncome > 50000) {
      taxRate = 0.3;
    } else {
      taxRate = 0.2;
    }

    console.log(`Ваш доход: ${+totalIncome}`);
    console.log(`Ваша налоговая ставка: ${taxRate * 100}%`);
    console.log(`Ваш налог: ${+totalIncome * taxRate}`);

  } else {
    console.log('Вы ввели некорректные данные');
  }
}
