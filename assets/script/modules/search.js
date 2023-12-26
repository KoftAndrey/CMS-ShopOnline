import {
  startLoader,
  stopLoader,
} from './loader.js';

import {
  calculateMainTotalPrice,
  createTableRow,
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
  fetchRequest(`http://localhost:3000/api/goods?search=${searchValue}`, {
    method: 'GET',
    callback(err, data) {
      if (err) {
        console.warn(err);
        stopLoader();
      }
      console.log('search-data: ', data);

      const tableBody = document.querySelector('.cms__table-body');
      tableBody.innerHTML = '';

      if (data.goods.length > 0) {
        const tableRowArr = data.goods.map(createTableRow);

        tableBody.append(...tableRowArr);

        stopLoader();
        calculateMainTotalPrice();
      } else {
        const nothingFoundBlock = createNothingFound();
        tableBody.append(nothingFoundBlock);

        stopLoader();
        calculateMainTotalPrice();
      }
    },
    body: null,
    headers: null,
  });
};
/*
const serchControls = (searchInput) => {
  searchInput.addEventListener('input', debounce(searchRequest(searchInput.value), 300));
};
*/
export {searchRequest};
