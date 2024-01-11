import {fetchRequest} from './fetchRequest.js';
import {renderGoods} from './tableAppearance.js';
import {crerateDeleteAlert} from './tableAppearance.js';

// Удаление товара
const delItem = (id, page) => {
  fetchRequest(`https://chalk-yellow-sheet.glitch.me/api/goods/${id}`, {
    method: 'DELETE',
    callback(err, data) {
      if (err) console.warn(err);

      renderGoods(page);
    },
    body: null,
    headers: null,
  });
};

// Добавление обработчика событий для удаления
const delListItem = (table, page) => {
  table.addEventListener('click', e => {
    if (e.target.closest('.cms__table-button_type_delete')) {
      const row = e.target.closest('.cms__table-row');
      crerateDeleteAlert(row, page);
    }
  });
};

export {delItem, delListItem};
