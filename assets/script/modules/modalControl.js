import {
  modalId,
  modalCheckboxInput,
  modalForm,
  modalCost,
  modalOverlay,
  modalCheckboxButton,
  btnAdd,
  modalClose,
  tableBody,
} from './domElements.js';

import {calculateMainTotalPrice, createTableRow} from './tableAppearance.js';
import {goods, generateUniqueId} from './goods.js';

const setModalId = () => {
  modalId.textContent = generateUniqueId();
};

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

const resetCheckbox = () => {
  modalCheckboxInput.value = null;
  modalCheckboxInput.disabled = true;
};

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

const setModalTotalPrice = () => {
  modalCost.textContent = `₽  ${calculateItemTotalPrice()}`;
};

const resetModalTotalPrice = () => {
  modalCost.textContent = '₽ 0.00';
};

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

const getFormData = () => {
  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData);
    if (!productData.discont) productData.discont = false;
    productData.id = +modalId.textContent;
    goods.unshift(productData);

    modalForm.reset();
    resetModalTotalPrice();
    resetCheckbox();
    setModalId();
    modalOverlay.classList.remove('overlay_visible');
    tableBody.prepend(createTableRow(productData));
    calculateMainTotalPrice();
  });
};

export {
  openModal,
  checkboxControl,
  getFormData,
  checkModalTotalPrice,
  setModalId,
};
