import {tableBody} from './domElements.js';
// import {goods} from './goods.js';
import {calculateMainTotalPrice} from './tableAppearance.js';

const delListItem = () => {
  tableBody.addEventListener('click', e => {
    if (e.target.closest('.cms__table-button_type_delete')) {
      // const id = e.target.closest('.cms__table-row').cells[0].textContent;
      e.target.closest('.cms__table-row').remove();
      // goods.forEach((v, i) => {
      //  if ((v.id + '') === id) goods.splice(i, 1);
      // });
      calculateMainTotalPrice();
      // console.log('Список товаров:\n', goods);
    }
  });
};

export default delListItem;
