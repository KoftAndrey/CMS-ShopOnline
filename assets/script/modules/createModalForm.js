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
    <input class="form__input" type="text" name="title" id="name" required>
  `);

  return formBlockName;
};

// Category
const createCategoryBlock = () => {
  const formBlockCategory = document.createElement('div');
  formBlockCategory.classList.add('form__block-category');
  formBlockCategory.insertAdjacentHTML('beforeend', `
    <label class="form__label" for="category">Категория</label>
    <input class="form__input" type="text" name="category" id="category" required>
  `);

  return formBlockCategory;
};

// Units
const createUnitsBlock = () => {
  const formBlockUnits = document.createElement('div');
  formBlockUnits.classList.add('form__block-units');
  formBlockUnits.insertAdjacentHTML('beforeend', `
    <label class="form__label" for="units">Единицы измерения</label>
    <input class="form__input" type="text" name="units" id="units" required>
  `);

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
  discontInput.name = 'discont';
  discontInput.id = 'discount';
  discontInput.setAttribute('min', '0');
  discontInput.setAttribute('max', '99');
  discontInput.setAttribute('required', '');
  discontInput.setAttribute('disabled', '');

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
    <textarea class="form__input form__input_type_textarea" name="description" id="description" rows="5" required></textarea>
  `);

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

  formBlockPrice.append(formPrice);

  formBlockPrice.price = formPrice;

  return formBlockPrice;
};

// File
const createFileBlock = () => {
  const formBlockFile = document.createElement('div');
  formBlockFile.classList.add('form__block-file');
  formBlockFile.insertAdjacentHTML('beforeend', `
    <input class="form__input form__input_type_file" type="file" name="image-file" accept=".jpg, .jpeg">
  `);

  return formBlockFile;
};

// Bottom block
const createBottomBlock = () => {
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
    <button class="form__button" type="submit">Добавить товар</button>
  `);

  modalBlockBottom.priceValue = modalTotalPriceValue;

  return modalBlockBottom;
};

const createModalForm = () => {
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
  const modalBlockBottom = createBottomBlock();

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

  return {
    modalForm,
    checkbox: formBlockDiscount.checkbox,
    input: formBlockDiscount.input,
    count: formBlockCount.count,
    price: formBlockPrice.price,
    priceValue: modalBlockBottom.priceValue,
  };
};

export {createCloseBtn, createModalForm};
