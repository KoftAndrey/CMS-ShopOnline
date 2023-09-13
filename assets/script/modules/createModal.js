import {createCloseBtn, createModalForm} from './createModalForm.js';

import {tableWrapper, btnAdd} from './domElements.js';
import {modalControl, setModalTotalPrice} from './modalControl.js';
import loadStyle from './loadStyle.js';
import {fetchRequest} from './tableAppearance.js';

const fillFormFields = (obj, property, form) => {
  if (property !== 'id' && property !== 'image' && obj[property]) {
    if (property === 'discount') {
      form.checkbox.checked = true;
      form.discount.disabled = false;
      form.discount.value = obj.discount;
    } else {
      form[property].value = obj[property];
    }
  }
};

// Отобразить модальное окно
const showModal = async (id) => {
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
    checkbox,
    input,
    count,
    price,
    priceValue,
  } = createModalForm(id);
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

  // Управление окном
  modalControl(
      overlay,
      closeBtn,
      modalForm,
      checkbox,
      input,
      count,
      price,
      priceValue,
  );

  modal.append(modalBlockTop, closeBtn, modalForm);
  overlay.append(modal);
  tableWrapper.append(overlay);

  // Загрузка данных в форму редактирования
  if (id) {
    fetchRequest(`https://lapis-swift-curtain.glitch.me/api/goods/${id}`, {
      method: 'get',
      callback(err, data) {
        if (err) console.warn(err);
        const properties = Object.keys(data);
        properties.forEach(property => {
          fillFormFields(data, property, modalForm);
        });
        setModalTotalPrice(priceValue, count, price, modalForm.discount);
      },
      body: null,
      headers: null,
    });
  }
};

// Открыть модальное окно
const openModal = () => {
  btnAdd.addEventListener('click', () => {
    showModal(null);
  });
};

// Открыть окно редактирования
const openEditModal = btnEdit => {
  btnEdit.addEventListener('click', ({target}) => {
    const id = target.closest('.cms__table-row').cells[0].textContent;
    showModal(id);
  });
};

export {openModal, openEditModal};
