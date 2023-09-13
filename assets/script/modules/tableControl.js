import {tableBody} from './domElements.js';
import {calculateMainTotalPrice} from './tableAppearance.js';

const delListItem = () => {
  tableBody.addEventListener('click', e => {
    if (e.target.closest('.cms__table-button_type_delete')) {
      e.target.closest('.cms__table-row').remove();
      calculateMainTotalPrice();
    }
  });
};

export default delListItem;
