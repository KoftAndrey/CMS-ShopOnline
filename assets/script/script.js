import {openModal} from './modules/createModal.js';

import delListItem from './modules/tableControl.js';
import {renderGoods} from './modules/tableAppearance.js';
// import {goods} from './modules/goods.js';

const init = () => {
  renderGoods();
  openModal();
  delListItem();
};

window.cms = init;
