import {tableBody} from './domElements.js';

import showFormMessage from './formMessage.js';

import {
  fetchRequest,
  calculateMainTotalPrice,
  createTableRow,
} from './tableAppearance.js';

// Конвертация в формат Base64
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', () => {
    console.warn('Ошибка при загрузке изображения');
    reject(reader.error);
  });

  reader.readAsDataURL(file);
});

// Функционал checkbox
const checkboxControl = (checkbox, input) => {
  checkbox.addEventListener('click', () => {
    if (input.disabled) {
      input.disabled = false;
      input.focus();
    } else {
      input.value = null;
      input.focus();
      input.disabled = true;
    }
  });
};

// Вычислить общую стоимость товара
const calculateItemTotalPrice = (count, price, discount) => {
  if (count.value && price.value) {
    let totalPrice;
    if (discount.value && discount.value < 100 && discount.value > 0) {
      totalPrice = (count.value * price.value * (1 - discount.value * 0.01)).toFixed(2);
    } else {
      totalPrice = (count.value * price.value).toFixed(2);
    }
    return totalPrice;
  } else {
    return (0).toFixed(2);
  }
};

// Отобразить общую стоимость товара
const setModalTotalPrice = (cost, count, price, discount) => {
  cost.textContent = `₽  ${calculateItemTotalPrice(count, price, discount)}`;
};

// Проверить общую стоимость товара
const checkModalTotalPrice = (input, count, price, cost) => {
  input.addEventListener('input', () => {
    setTimeout(setModalTotalPrice(cost, count, price, input), 400);
  });
  input.addEventListener('blur', () => {
    setModalTotalPrice(cost, count, price, input);
  });

  count.addEventListener('input', () => {
    setTimeout(setModalTotalPrice(cost, count, price, input), 400);
  });

  price.addEventListener('input', () => {
    setTimeout(setModalTotalPrice(cost, count, price, input), 400);
  });
};

// Отобразить картинку
const createImageElem = form => {
  const imgElem = document.createElement('img');
  imgElem.classList.add('form__block-image');

  form.append(imgElem);

  return imgElem;
};

// Отобразить ошибку размера файла
const showImageError = form => {
  const imageErrorBlock = document.createElement('div');
  imageErrorBlock.classList.add('form__block-error');

  const imageErrorElem = document.createElement('div');
  imageErrorElem.classList.add('form__file-error');
  imageErrorElem.textContent = 'Изображение не должно превышать размер 1 Мб';

  imageErrorBlock.append(imageErrorElem);

  form.blockDiscount.after(imageErrorBlock);
};

// Отображение файла в форме
const showImagePreview = (form, fileInput) => {
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      if (fileInput.files[0].size > 1048576) {
        showImageError(form);
      } else {
        const src = URL.createObjectURL(fileInput.files[0]);

        const imgElem = createImageElem(form);
        imgElem.style.display = 'block';
        imgElem.src = src;
      }
    }
  });
};

// Действия после закрытия окна сообщения
const afterMessageActions = (overlay, status, data) => {
  overlay.remove();
  if (status < 400) {
    tableBody.prepend(createTableRow(data));
    calculateMainTotalPrice();
  }
};

// Отправить данные на сервер
const sendData = (overlay, productData) => {
  fetchRequest('https://lapis-swift-curtain.glitch.me/api/goods', {
    method: 'post',
    callback(err, data) {
      if (err) {
        const status = +err.message.slice(6, 10);
        showFormMessage(overlay, status, () => {
          afterMessageActions(overlay, status, data);
        });
        return;
      }

      showFormMessage(overlay, 200, () => {
        afterMessageActions(overlay, 200, data);
      });
    },
    body: productData,
    headers: {
      'Content-Type': 'applicatoin/json',
    },
  });
};

// Управление модальным окном
const modalControl = (
    overlay,
    close,
    form,
    checkbox,
    input,
    count,
    price,
    cost,
    file,
) => {
  checkboxControl(checkbox, input);
  checkModalTotalPrice(input, count, price, cost);
  showImagePreview(form, file);

  overlay.addEventListener('click', ({target}) => {
    if (target === overlay || target.classList.contains('modal__close')) {
      overlay.remove();
    }
  });

  close.addEventListener('click', () => {
    overlay.remove();
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = Object.fromEntries(formData);

    if (productData.image) {
      productData.image = await toBase64(productData.image);
    }

    sendData(overlay, productData);
  });
};

export {modalControl, setModalTotalPrice};
