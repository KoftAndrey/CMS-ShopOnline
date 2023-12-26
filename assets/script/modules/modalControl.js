import {tableBody} from './domElements.js';
import showFormMessage from './formMessage.js';
import {fetchRequest} from './fetchRequest.js';
import {
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
const createImageElem = (fileInput) => {
  const imgBlock = document.createElement('div');
  imgBlock.classList.add('form__block-image');

  const imgElem = document.createElement('img');
  imgElem.classList.add('form__image');

  const delBtn = document.createElement('button');
  delBtn.classList.add('form__image-delete');
  delBtn.type = 'button';
  delBtn.insertAdjacentHTML('beforeend', `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.03125 3.59375H6.875C6.96094 3.59375 7.03125 3.52344 7.03125 3.4375V3.59375H12.9688V3.4375C12.9688 3.52344 13.0391 3.59375 13.125 3.59375H12.9688V5H14.375V3.4375C14.375 2.74805 13.8145 2.1875 13.125 2.1875H6.875C6.18555 2.1875 5.625 2.74805 5.625 3.4375V5H7.03125V3.59375ZM16.875 5H3.125C2.7793 5 2.5 5.2793 2.5 5.625V6.25C2.5 6.33594 2.57031 6.40625 2.65625 6.40625H3.83594L4.31836 16.6211C4.34961 17.2871 4.90039 17.8125 5.56641 17.8125H14.4336C15.1016 17.8125 15.6504 17.2891 15.6816 16.6211L16.1641 6.40625H17.3438C17.4297 6.40625 17.5 6.33594 17.5 6.25V5.625C17.5 5.2793 17.2207 5 16.875 5ZM14.2832 16.4062H5.7168L5.24414 6.40625H14.7559L14.2832 16.4062Z"/>
    </svg>
  `);

  delBtn.addEventListener('click', () => {
    if (fileInput.hasAttribute('data-src')) {
      fileInput.removeAttribute('data-src');
    }

    if (fileInput.value) fileInput.value = '';
    imgBlock.remove();
  });

  imgBlock.append(imgElem, delBtn);
  document.querySelector('.modal').append(imgBlock);

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

// Отображение изображения
const displayImage = (src, fileInput) => {
  if (src === './cms-backend/image/notimage.jpg') return;

  if (
    !src.includes('jpg') &&
    !src.includes('jpeg') &&
    !src.includes('blob')
  ) return;

  const imgElem = createImageElem(fileInput);
  imgElem.src = src;
};

// Отображение файла в форме
const showImagePreview = (form, fileInput) => {
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      if (fileInput.files[0].size > 1048576) {
        showImageError(form);
      } else {
        const errorMessage = document.querySelector('.form__block-error');
        const imageBlock = document.querySelector('.form__block-image');

        if (errorMessage) errorMessage.remove();
        if (imageBlock) imageBlock.remove();

        const src = URL.createObjectURL(fileInput.files[0]);
        displayImage(src, fileInput);
      }
    }
  });
};

// Действия после закрытия окна сообщения
const afterMessageActions = (edit, overlay, status, data) => {
  overlay.remove();
  if (status < 400) {
    if (!edit) tableBody.prepend(createTableRow(data));  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    calculateMainTotalPrice();
  }
};

// Отправить данные о товаре из модального окна
const sendData = (edit, id = null, method, overlay, productData) => {
  fetchRequest(`http://localhost:3000/api/goods${id ? ('/' + id) : ''}`, {
    method,
    callback(err, data) {
      if (err) {
        const status = +err.message.slice(6, 10);
        showFormMessage(edit, overlay, status, () => {
          afterMessageActions(edit, overlay, status, data);
        });
        return;
      }

      showFormMessage(edit, overlay, 200, () => {
        afterMessageActions(edit, overlay, 200, data);
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
    id,
) => {
  const [edit, method] = id ? [true, 'PATCH'] : [false, 'POST'];

  checkboxControl(checkbox, input);
  checkModalTotalPrice(input, count, price, cost);
  showImagePreview(form, file);

  if (file.hasAttribute('data-src') &&
      id && file.files.length === 0) {
    console.log('img block: ', document.querySelector('.form__block-image'));
  }

  overlay.addEventListener('click', ({target}) => {
    if (target === overlay || target.classList.contains('modal__close')) {
      overlay.remove();
    }
  });

  close.addEventListener('click', () => {
    overlay.remove();
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    productData.discount = productData.discount ? productData.discount : '0';

    if (productData.image) {
      productData.image = await toBase64(productData.image);
    }

    if (file.hasAttribute('data-src') &&
    id && file.files.length === 0) {
      productData.image = file.dataset.src;
    }

    sendData(edit, id, method, overlay, productData);
  });
};

export {modalControl, setModalTotalPrice, displayImage};
