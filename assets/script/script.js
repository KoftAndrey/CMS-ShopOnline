import {
  openModal,
  checkboxControl,
  getFormData,
  checkModalTotalPrice,
  setModalId,
} from './modules/modalControl.js';

import delListItem from './modules/tableControl.js';
import {renderGoods} from './modules/tableAppearance.js';
import {goods} from './modules/goods.js';

const init = () => {
  renderGoods(goods);
  openModal();
  delListItem();
  checkboxControl();
  getFormData();
  checkModalTotalPrice();
  setModalId();
};

window.cms = init;
