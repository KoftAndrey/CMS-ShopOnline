'use strict';

{
  let totalIncome = prompt('Укажите ваш доход');
  let taxRate;
  let moneyToBeTaxed;

  if (isNaN(+totalIncome) === false && +totalIncome >= 0) {
    if (+totalIncome < 15000) {
      moneyToBeTaxed = +totalIncome;
      taxRate = 0.13;
    } else if (+totalIncome > 50000) {
      taxRate = 0.3;
      moneyToBeTaxed = +totalIncome - 50000;
    } else {
      taxRate = 0.2;
      moneyToBeTaxed = +totalIncome - 15000;
    }

    console.log(`Ваш доход: ${+totalIncome}`);
    console.log(`Сумма, подлежащая налогобложению: ${moneyToBeTaxed}`);
    console.log(`Ваша налоговая ставка: ${taxRate * 100}%`);
    console.log(`Ваш налог: ${moneyToBeTaxed * taxRate}`);
    
  } else {
    console.log('Вы ввели некорректные данные');
  }
}
