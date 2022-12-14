'use strict';

{
    const productNameFromUser = prompt('Введите наименование товара') + '';
    console.log(typeof productNameFromUser);
  
    const productCountFromUser = +prompt('Введите количество товара');
    console.log(typeof productCountFromUser);
  
    const productCategoryFromUser = prompt('Введите категорию товара') + '';
    console.log(typeof productCategoryFromUser);
  
    const productPriceFromUser = +prompt('Введите стоимость товара');
    console.log(typeof productPriceFromUser);
  
    console.log(
      `На складе ${productCountFromUser} единиц товара "${productNameFromUser}" категории "${productCategoryFromUser}" на сумму ${
        productPriceFromUser * productCountFromUser} кредитов.`
    );
  }