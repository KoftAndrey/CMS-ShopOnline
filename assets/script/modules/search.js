import {
  mainCost,
  costDescription,
} from './domElements.js';

import {
  startLoader,
  stopLoader,
} from './loader.js';

import {
  createTableRow,
  showGoodsErrBlock,
} from './tableAppearance.js';

import {fetchRequest} from './fetchRequest.js';


const createNothingFound = () => {
  const nothingFoundBlock = document.createElement('div');
  nothingFoundBlock.classList.add('nothing-found');
  nothingFoundBlock.textContent = 'Ничего не найдено';

  return nothingFoundBlock;
};

const searchRequest = (searchValue) => {
  startLoader();
  Promise.all([
    fetchRequest(`https://chalk-yellow-sheet.glitch.me/api/goods?search=${searchValue}`, {
      method: 'GET',
      callback(err, data) {
        if (err) {
          console.warn(err);
          stopLoader();
        }

        return data;
      },
      body: null,
      headers: null,
    }),
    fetchRequest(`https://chalk-yellow-sheet.glitch.me/api/total`, {
      method: 'GET',
      callback(err, data) {
        if (err) {
          console.warn(err);
          return null;
        }

        return data;
      },
      body: null,
      headers: null,
    }),
  ])
      .then(([searchData, total]) => {
        const tableBody = document.querySelector('.cms__table-body');
        tableBody.innerHTML = '';

        if (searchData.goods.length > 0) {
          const tableRowArr = searchData.goods.map(createTableRow);

          tableBody.append(...tableRowArr);

          stopLoader();
          costDescription.textContent = 'Итоговая стоимость: ';
          mainCost.textContent = `₽ ${total.toFixed(2)}`;
        } else {
          const nothingFoundBlock = createNothingFound();
          tableBody.append(nothingFoundBlock);

          stopLoader();
          mainCost.textContent = '';
          costDescription.textContent = '';
        }
      })
      .catch(err => {
        console.error(err);

        costDescription.textContent = '';
        const tableBody = document.querySelector('.cms__table-body');
        tableBody.innerHTML = '';

        showGoodsErrBlock(tableBody);
      });
};

export {searchRequest};
