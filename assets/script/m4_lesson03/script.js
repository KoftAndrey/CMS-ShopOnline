'use strict';

{
  const productNameFromUser = prompt('Введите наименование товара');
  const productCountFromUser = prompt('Введите количество товара');
  const productCategoryFromUser = prompt('Введите категорию товара');
  const productPriceFromUser = prompt('Введите стоимость товара');

  if (
    isNaN(+productCountFromUser) === false &&
    +productCountFromUser >= 0 &&
    isNaN(+productPriceFromUser) === false &&
    +productPriceFromUser > 0
  ) {
    console.log(
      `На складе ${productCountFromUser} единиц товара "${productNameFromUser}" категории "${productCategoryFromUser}" на сумму ${
        productPriceFromUser * productCountFromUser
      } кредитов.`
    );
  } else {
    console.log('Вы ввели некорректные данные');
  }
}