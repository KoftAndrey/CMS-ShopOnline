import {
  openModal,
  checkboxControl,
  getFormData,
  checkModalTotalPrice,
} from './modules/modalControl.js';

import delListItem from './modules/tableControl.js';
import {renderGoods} from './modules/tableAppearance.js';
// import {goods} from './modules/goods.js';

const init = () => {
  renderGoods();
  openModal();
  delListItem();
  checkboxControl();
  getFormData();
  checkModalTotalPrice();
};

window.cms = init;
