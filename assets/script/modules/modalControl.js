import {
  modalCheckboxInput,
  modalForm,
  modalCost,
  modalOverlay,
  modalCheckboxButton,
  btnAdd,
  modalClose,
  tableBody,
  messageOverlay,
  formMessage,
  formMessageClose,
  formMessageIcon,
  formMessageText,
} from './domElements.js';

import {
  fetchRequest,
  calculateMainTotalPrice,
  createTableRow,
} from './tableAppearance.js';

// Функционал checkbox
const checkboxControl = () => {
  modalCheckboxButton.addEventListener('click', () => {
    if (modalCheckboxInput.disabled) {
      modalCheckboxInput.disabled = false;
      modalCheckboxInput.focus();
    } else {
      modalCheckboxInput.value = null;
      modalCheckboxInput.focus();
      modalCheckboxInput.disabled = true;
    }
  });
};

// Обновить checkbox
const resetCheckbox = () => {
  modalCheckboxInput.value = null;
  modalCheckboxInput.disabled = true;
};

// Вычислить общую стоимость товара
const calculateItemTotalPrice = () => {
  if (modalForm.count.value && modalForm.price.value) {
    let totalPrice;
    if (modalForm.discount.value && modalForm.discount.value < 100 && modalForm.discount.value > 0) {
      totalPrice = (modalForm.count.value * modalForm.price.value * (1 - modalForm.discount.value * 0.01)).toFixed(2);
    } else {
      totalPrice = (modalForm.count.value * modalForm.price.value).toFixed(2);
    }
    return totalPrice;
  } else {
    return (0).toFixed(2);
  }
};

// Отобразить общую стоимость товара
const setModalTotalPrice = () => {
  modalCost.textContent = `₽  ${calculateItemTotalPrice()}`;
};

// Обновить общую стоимость товара
const resetModalTotalPrice = () => {
  modalCost.textContent = '₽ 0.00';
};

// Проверить общую стоимость товара
const checkModalTotalPrice = () => {
  modalCheckboxInput.addEventListener('input', () => {
    setTimeout(setModalTotalPrice, 400);
  });
  modalCheckboxInput.addEventListener('blur', () => {
    setModalTotalPrice();
  });

  modalForm.count.addEventListener('input', () => {
    setTimeout(setModalTotalPrice, 400);
  });

  modalForm.price.addEventListener('input', () => {
    setTimeout(setModalTotalPrice, 400);
  });
};

// Создать сообщение об успешной отправке
const createSuccessMessage = () => {
  const text = 'Товар успешно добавлен';
  const icon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
    </svg>
  `;

  formMessageIcon.style.color = 'var(--purple-text, #6e6893)';
  formMessageIcon.style.borderColor = 'var(--purple-text, #6e6893)';

  return {text, icon};
};

// Создать сообщение об ошибке
const createErrorMessage = (status) => {
  const text = `Ошибка ${status}`;
  const icon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" fill="currentColor" class="bi bi-exclamation" viewBox="0 0 16 16">
      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
    </svg>
  `;

  formMessageIcon.style.color = 'var(--alert-red, #d80101)';
  formMessageIcon.style.borderColor = 'var(--alert-red, #d80101)';

  return {text, icon};
};

// Создать сообщение "Что-то пошло не так"
const createWrongMessage = () => {
  const text = 'Что-то пошло не так';
  const icon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `;

  formMessageIcon.style.color = 'var(--alert-red, #d80101)';
  formMessageIcon.style.borderColor = 'var(--alert-red, #d80101)';

  return {text, icon};
};

// Выбрать тип сообщения
const setMessageType = (status) => {
  switch (true) {
    case status >= 500:
      return createWrongMessage();
    case status >= 400:
      return createErrorMessage(status);
    default:
      return createSuccessMessage();
  }
};

// Действия после закрытия окна сообщения
const afterMessageActions = (status, form, data) => {
  form.reset();
  resetModalTotalPrice();
  resetCheckbox();
  modalOverlay.classList.remove('overlay_visible');
  if (status < 400) {
    tableBody.prepend(createTableRow(data));
    calculateMainTotalPrice();
  }
};

// Управление окном сообщения
const messageModalControl = (status, form, data) => {
  messageOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === messageOverlay) {
      formMessage.classList.remove('form-message_active');
      messageOverlay.classList.remove('message-overlay_visible');

      afterMessageActions(status, form, data);
    }
  });

  formMessageClose.addEventListener('click', () => {
    formMessage.classList.remove('form-message_active');
    messageOverlay.classList.remove('message-overlay_visible');

    afterMessageActions(status, form, data);
  });
};

// Рендер окна сообщения
const renderMessageModal = (status, form, data) => {
  const {text, icon} = setMessageType(status);

  messageOverlay.classList.add('message-overlay_visible');
  formMessage.classList.add('form-message_active');
  formMessageIcon.innerHTML = icon;
  formMessageText.textContent = text;

  messageModalControl(status, form, data);
};

// Отправить данные на сервер
const sendData = (form, productData) => {
  fetchRequest('https://lapis-swift-curtain.glitch.me/api/goods', {
    method: 'post',
    callback(err, data) {
      if (err) {
        const status = +err.message.slice(6, 10);
        renderMessageModal(status, form, null);
        return;
      }

      renderMessageModal(200, form, data);
    },
    body: productData,
    headers: {
      'Content-Type': 'applicatoin/json',
    },
  });
};


// Управление модальным окном
const openModal = () => {
  btnAdd.addEventListener('click', () => {
    modalOverlay.classList.add('overlay_visible');
  });

  modalOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === modalOverlay || target.classList.contains('modal__close')) {
      modalOverlay.classList.remove('overlay_visible');
      modalForm.reset();
      resetModalTotalPrice();
      resetCheckbox();
    }
  });

  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('overlay_visible');
    modalForm.reset();
    resetModalTotalPrice();
    resetCheckbox();
  });
};

// Добавить товар и закрыть модальное окно
const getFormData = () => {
  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData);

    sendData(modalForm, productData);
  });
};

export {
  openModal,
  checkboxControl,
  getFormData,
  checkModalTotalPrice,
};
