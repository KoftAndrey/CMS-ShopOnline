import {
  mainCost,
  costDescription,
  loaderBar,
} from './domElements.js';

const startLoader = () => {
  mainCost.textContent = '';
  costDescription.textContent = 'Идет загрузка…';
  loaderBar.classList.add('bar-active');
};

const stopLoader = () => {
  costDescription.textContent = 'Итоговая стоимость: ';
  loaderBar.classList.remove('bar-active');
};

export {startLoader, stopLoader};
