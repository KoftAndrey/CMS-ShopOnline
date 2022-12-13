'use strict';

{
    let productName = 'Сорочка мужская';
    let productCount = 1;
    const productCategory =  'Одежда';
    let productPrice = 10000;

    console.log ('Наименование товара: "' + productName + '".');
    console.log ('Общая сумма: ' + productCount * productPrice + '.');
}

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