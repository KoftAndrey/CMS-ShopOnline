import {fetchRequest} from './fetchRequest.js';
import {
  calculateMainTotalPrice,
  crerateDeleteAlert,
} from './tableAppearance.js';

// Удаление товара
const delItem = (row, id) => {
  fetchRequest(`http://localhost:3000/api/goods/${id}`, {
    method: 'DELETE',
    callback(err, data) {
      if (err) console.warn(err);

      row.remove();
      calculateMainTotalPrice();
    },
    body: null,
    headers: null,
  });
};

// Добавление обработчика событий для удаления
const delListItem = (table) => {
  table.addEventListener('click', e => {
    if (e.target.closest('.cms__table-button_type_delete')) {
      const row = e.target.closest('.cms__table-row');
      crerateDeleteAlert(row);
    }
  });
};

export {delItem, delListItem};
