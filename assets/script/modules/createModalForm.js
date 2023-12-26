import {fetchRequest} from './fetchRequest.js';

// Проверка ввода текста
const checkTextInput = input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^а-яА-ЯёЁ ]/g, '');
  });
};

// Проверка ввода цифр
const checkIntegerInput = input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9]/g, '');
  });
};

// Close btn
const createCloseBtn = () => {
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.classList.add('modal__close');
  closeBtn.insertAdjacentHTML('beforeend', `
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
      <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `);

  return closeBtn;
};

// Form
const createForm = () => {
  const modalForm = document.createElement('form');
  modalForm.classList.add('modal__form', 'form');
  modalForm.setAttribute('action', 'https://jsonplaceholder.typicode.com/posts');
  modalForm.setAttribute('method', 'POST');

  return modalForm;
};

// Name
const createNameBlock = () => {
  const formBlockName = document.createElement('div');
  formBlockName.classList.add('form__block-name');
  formBlockName.insertAdjacentHTML('beforeend', `
    <label class="form__label" for="name">Наименование</label>
  `);

  const input = document.createElement('input');
  input.classList.add('form__input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'title');
  input.setAttribute('id', 'name');
  input.setAttribute('required', '');
  checkTextInput(input);

  formBlockName.append(input);

  return formBlockName;
};

// Category
const createCategorieslist = (datalist) => {
  const categories = fetchRequest('http://localhost:3000/api/categories', {
    method: 'GET',
    callback(err, data) {
      if (err) console.warn(err);

      const categoriesOptions = data.map(category => {
        const categoryNode = document.createElement('option');
        categoryNode.value = category;
        return categoryNode;
      });

      datalist.append(...categoriesOptions);
    },
    body: null,
    headers: null,
  });
};

const createCategoryBlock = () => {
  const formBlockCategory = document.createElement('div');
  formBlockCategory.classList.add('form__block-category');
  formBlockCategory.insertAdjacentHTML('beforeend', `
    <label class="form__label" for="category">Категория</label>
  `);

  const input = document.createElement('input');
  input.classList.add('form__input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'category');
  input.setAttribute('id', 'category');
  input.setAttribute('list', 'category-list');
  input.setAttribute('required', '');
  checkTextInput(input);

  const datalistWrapper = document.createElement('div');
  datalistWrapper.classList.add('form__datalist-wrapper');

  const datalist = document.createElement('datalist');
  datalist.setAttribute('id', 'category-list');

  datalistWrapper.append(datalist);
  formBlockCategory.append(input, datalistWrapper);

  formBlockCategory.datalist = datalist;

  return formBlockCategory;
};

// Units
const createUnitsBlock = () => {
  const formBlockUnits = document.createElement('div');
  formBlockUnits.classList.add('form__block-units');
  formBlockUnits.insertAdjacentHTML('beforeend', `
    <label class="form__label" for="units">Единицы измерения</label>
  `);

  const input = document.createElement('input');
  input.classList.add('form__input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'units');
  input.setAttribute('id', 'units');
  input.setAttribute('required', '');
  input.addEventListener('input', () => {
    input.value = input.value.replace(/^[А-Я]Ё/gi, '');
  });

  formBlockUnits.append(input);

  return formBlockUnits;
};

// Discount
const createDiscountBlock = () => {
  const formBlockDiscount = document.createElement('div');
  formBlockDiscount.classList.add('form__block-discount');
  formBlockDiscount.insertAdjacentHTML('beforeend', `
    <label class="form__label">Дисконт</label>
  `);

  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('form__checkbox-container');

  const formCheckbox = document.createElement('input');
  formCheckbox.classList.add('form__checkbox');
  formCheckbox.type = 'checkbox';
  formCheckbox.id = 'checkbox';

  const discontInput = document.createElement('input');
  discontInput.classList.add('form__input');
  discontInput.type = 'number';
  discontInput.name = 'discount';
  discontInput.id = 'discount';
  discontInput.setAttribute('min', '0');
  discontInput.setAttribute('max', '99');
  discontInput.setAttribute('required', '');
  discontInput.setAttribute('disabled', '');
  checkIntegerInput(discontInput);

  checkboxContainer.append(formCheckbox, discontInput);
  formBlockDiscount.append(checkboxContainer);

  formBlockDiscount.checkbox = formCheckbox;
  formBlockDiscount.input = discontInput;

  return formBlockDiscount;
};

// Description
const createDescriptionBlock = () => {
  const formBlockDescription = document.createElement('div');
  formBlockDescription.classList.add('form__block-description');
  formBlockDescription.insertAdjacentHTML('beforeend', `
    <label class="form__label" for="description">Описание</label>
  `);

  const textarea = document.createElement('textarea');
  textarea.classList.add('form__input', 'form__input_type_textarea');
  textarea.setAttribute('name', 'description');
  textarea.setAttribute('id', 'description');
  textarea.setAttribute('rows', '5');
  textarea.setAttribute('minlength', '80');
  textarea.setAttribute('required', '');
  checkTextInput(textarea);

  formBlockDescription.append(textarea);

  return formBlockDescription;
};

// Count
const createCountBlock = () => {
  const formBlockCount = document.createElement('div');
  formBlockCount.classList.add('form__block-count');
  formBlockCount.insertAdjacentHTML('beforeend', `
    <label class="form__label" for="count">Количество</label>
  `);
  const formCount = document.createElement('input');
  formCount.classList.add('form__input');
  formCount.type = 'number';
  formCount.name = 'count';
  formCount.id = 'count';
  formCount.setAttribute('min', '0');
  formCount.setAttribute('required', '');
  checkIntegerInput(formCount);

  formBlockCount.append(formCount);

  formBlockCount.count = formCount;

  return formBlockCount;
};

// Price
const createPriceBlock = () => {
  const formBlockPrice = document.createElement('div');
  formBlockPrice.classList.add('form__block-price');
  formBlockPrice.insertAdjacentHTML('beforeend', '<label class="form__label" for="price">Цена</label>');
  const formPrice = document.createElement('input');
  formPrice.classList.add('form__input');
  formPrice.type = 'number';
  formPrice.name = 'price';
  formPrice.id = 'price';
  formPrice.setAttribute('min', '0');
  formPrice.setAttribute('required', '');
  checkIntegerInput(formPrice);

  formBlockPrice.append(formPrice);

  formBlockPrice.price = formPrice;

  return formBlockPrice;
};

// File
const createFileBlock = () => {
  const formBlockFile = document.createElement('div');
  formBlockFile.classList.add('form__block-file');

  const formFileInput = document.createElement('input');
  formFileInput.classList.add('form__input', 'form__input_type_file');
  formFileInput.type = 'file';
  formFileInput.name = 'image';
  formFileInput.multiple = false;
  formFileInput.setAttribute('accept', '.jpg, .jpeg');

  formBlockFile.append(formFileInput);

  formBlockFile.file = formFileInput;

  return formBlockFile;
};

// Bottom block
const createBottomBlock = (id) => {
  const modalBlockBottom = document.createElement('div');
  modalBlockBottom.classList.add('modal__block-bottom');

  const modalTotalPrice = document.createElement('p');
  modalTotalPrice.classList.add('modal__total-price');
  modalTotalPrice.textContent = 'Итоговая стоимость: ';

  const modalTotalPriceValue = document.createElement('span');
  modalTotalPriceValue.classList.add('modal__total-price', 'modal__total-price_content_value');
  modalTotalPriceValue.textContent = '₽ 0.00';

  modalTotalPrice.append(modalTotalPriceValue);

  modalBlockBottom.append(modalTotalPrice);
  modalBlockBottom.insertAdjacentHTML('beforeend', `
    <button class="form__button" type="submit">${id ? 'Изменить товар' : 'Добавить товар'}</button>
  `);

  modalBlockBottom.priceValue = modalTotalPriceValue;

  return modalBlockBottom;
};

const createModalForm = (id) => {
  // Form
  const modalForm = createForm();
  // Fieldset
  const formFieldset = document.createElement('fieldset');
  formFieldset.classList.add('form__fieldset');
  // Name
  const formBlockName = createNameBlock();
  // Category
  const formBlockCategory = createCategoryBlock();
  // Units
  const formBlockUnits = createUnitsBlock();
  // Discount
  const formBlockDiscount = createDiscountBlock();
  // Description
  const formBlockDescription = createDescriptionBlock();
  // Count
  const formBlockCount = createCountBlock();
  // Price
  const formBlockPrice = createPriceBlock();
  // File
  const formBlockFile = createFileBlock();
  // Bottom block
  const modalBlockBottom = createBottomBlock(id);

  formFieldset.append(
      formBlockName,
      formBlockCategory,
      formBlockUnits,
      formBlockDiscount,
      formBlockDescription,
      formBlockCount,
      formBlockPrice,
      formBlockFile,
  );

  modalForm.append(formFieldset, modalBlockBottom);

  modalForm.blockDiscount = formBlockDiscount;

  return {
    modalForm,
    datalist: formBlockCategory.datalist,
    checkbox: formBlockDiscount.checkbox,
    input: formBlockDiscount.input,
    count: formBlockCount.count,
    price: formBlockPrice.price,
    priceValue: modalBlockBottom.priceValue,
    file: formBlockFile.file,
  };
};

export {createCloseBtn, createModalForm, createCategorieslist};
