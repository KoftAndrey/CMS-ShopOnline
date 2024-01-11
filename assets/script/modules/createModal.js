import {
  createCloseBtn,
  createModalForm,
  createCategorieslist,
} from './createModalForm.js';

import {tableWrapper} from './domElements.js';
import {
  modalControl,
  setModalTotalPrice,
  displayImage,
} from './modalControl.js';
import loadStyle from './loadStyle.js';
import {fetchRequest} from './fetchRequest.js';

// Заполнение полей формы из свойств объекта
const fillFormFields = (obj, property, form) => {
  if (property !== 'discount' && property !== 'id' && property !== 'image' && obj[property]) {
    form[property].value = obj[property];
  }

  if (property === 'discount' && obj[property] !== 0 && obj[property] !== '0') {
    form.checkbox.checked = true;
    form.discount.disabled = false;
    form.discount.value = obj.discount;
  }
};

// Отобразить модальное окно
const showModal = async (id, page) => {
  // CSS
  await loadStyle('assets/style/modal/modal.css');

  // Overlay
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'overlay_visible');
  // Modal
  const modal = document.createElement('div');
  modal.classList.add('modal');
  // Close btn
  const closeBtn = createCloseBtn();
  // Block top
  const modalBlockTop = document.createElement('div');
  modalBlockTop.classList.add('modal__block-top');
  // Title
  const modalTitle = document.createElement('p');
  modalTitle.classList.add('modal__title');
  modalTitle.textContent = id ? 'Изменить товар' : 'Добавить товар';
  // Form
  const {
    modalForm,
    datalist,
    checkbox,
    error,
    input,
    count,
    price,
    priceValue,
    file,
  } = createModalForm(id);

  createCategorieslist(datalist);

  modalBlockTop.append(modalTitle);

  // ID
  if (id) {
    const modalId = document.createElement('p');
    modalId.classList.add('modal__id');
    modalId.insertAdjacentHTML('beforeend', `
    id: <span class="modal__id_content_value">${id}</span>
  `);
    modalBlockTop.append(modalId);
  }

  // Загрузка данных в форму редактирования
  if (id) {
    fetchRequest(`https://chalk-yellow-sheet.glitch.me/api/goods/${id}`, {
      method: 'GET',
      callback(err, data) {
        if (err) console.warn(err);

        const properties = Object.keys(data);
        properties.forEach(property => {
          fillFormFields(data, property, modalForm);
        });

        if (data.image !== 'image/notimage.jpg') {
          file.setAttribute('data-src', data.image);
        }

        displayImage(`https://chalk-yellow-sheet.glitch.me/${data.image}`, data.title, file, modalForm.fieldset);

        setModalTotalPrice(priceValue, count, price, modalForm.discount);
      },
      body: null,
      headers: null,
    });
  }

  // Управление окном
  modalControl(
      overlay,
      closeBtn,
      modalForm,
      checkbox,
      error,
      input,
      count,
      price,
      priceValue,
      file,
      id,
      page,
  );

  modal.append(modalBlockTop, closeBtn, modalForm);
  overlay.append(modal);
  tableWrapper.append(overlay);
};

// Открыть модальное окно
const openModal = (btn, page) => {
  btn.addEventListener('click', () => {
    showModal(null, page);
  });
};

// Открыть окно редактирования
const openEditModal = (btnEdit, page) => {
  btnEdit.addEventListener('click', ({target}) => {
    const id = target.closest('.cms__table-row').cells[0].textContent;
    showModal(id, page);
  });
};

export {openModal, openEditModal};
