import {openModal} from './createModal.js';
import {delListItem} from './tableControl.js';
import {debounce} from './debounce.js';
import {searchRequest} from './search.js';
import {renderGoods} from './tableAppearance.js';

// cоздать кнопку фильтрации
const createFilterBtn = () => {
  const filterBtn = document.createElement('button');
  filterBtn.type = 'button';
  filterBtn.classList.add('cms__table-filter');
  filterBtn.insertAdjacentHTML('beforeend', `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1_62)">
        <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#8b83ba"/>
      </g>
      <defs>
        <clipPath id="clip0_1_62">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>

    Фильтр
  `);

  return filterBtn;
};

// создать поисковую строку
const createSearchForm = () => {
  const searchForm = document.createElement('form');
  searchForm.classList.add('cms__search-form');
  searchForm.method = 'get';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.classList.add('cms__search-button');
  submitBtn.insertAdjacentHTML('beforeend', `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.4097 14.8822C11.7399 16.1799 9.63851 16.7922 7.53338 16.5942C5.42824 16.3963 3.47766 15.403 2.07881 13.8166C0.679961 12.2303 -0.0619809 10.1701 0.00405863 8.05565C0.0700982 5.94118 0.939153 3.9314 2.43427 2.43552C3.92939 0.939633 5.93814 0.0701341 8.05152 0.00406071C10.1649 -0.0620127 12.224 0.680308 13.8096 2.07987C15.3951 3.47944 16.3879 5.43102 16.5857 7.53723C16.7836 9.64345 16.1717 11.7459 14.8745 13.4166L19.6936 18.2201C20.1016 18.6267 20.1022 19.2872 19.695 19.6946C19.2878 20.1021 18.6273 20.1017 18.2204 19.6939L13.4201 14.8822H13.4097ZM8.31916 14.5495C9.13773 14.5495 9.94829 14.3882 10.7045 14.0748C11.4608 13.7614 12.148 13.302 12.7268 12.7229C13.3056 12.1438 13.7647 11.4563 14.078 10.6996C14.3913 9.94298 14.5525 9.13201 14.5525 8.31302C14.5525 7.49403 14.3913 6.68306 14.078 5.92641C13.7647 5.16976 13.3056 4.48225 12.7268 3.90314C12.148 3.32402 11.4608 2.86465 10.7045 2.55123C9.94829 2.23782 9.13773 2.07651 8.31916 2.07651C6.66598 2.07651 5.08051 2.73356 3.91153 3.90314C2.74256 5.07271 2.08583 6.659 2.08583 8.31302C2.08583 9.96705 2.74256 11.5533 3.91153 12.7229C5.08051 13.8925 6.66598 14.5495 8.31916 14.5495Z"/>
    </svg>
  `);

  const searchInput = document.createElement('input');
  searchInput.classList.add('cms__search-input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Поиск по наименованию и категории';

  const inputHandler = debounce(searchRequest, 300);
  searchInput.addEventListener('input', () => inputHandler(searchInput.value));

  searchForm.append(submitBtn, searchInput);

  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchRequest(searchInput.value);
  });

  return searchForm;
};

// создать верхний блок с действиями
const createActionsBlock = (actions, page) => {
  const filterBtn = createFilterBtn();
  const searchForm = createSearchForm();

  const addProductBtn = document.createElement('button');
  addProductBtn.type = 'button';
  addProductBtn.classList.add('cms__product-button');
  addProductBtn.textContent = 'Добавить товар';
  openModal(addProductBtn, page);

  actions.append(filterBtn, searchForm, addProductBtn);
};

// создать разметку таблицы
const createTableBox = (thead, tbody, page) => {
  thead.innerHTML = `
    <tr>
      <th class="cms__table-th cms__table-th_type_id">Id</th>
      <th class="cms__table-th cms__table-th_type_name">Наименование</th>
      <th class="cms__table-th cms__table-th_type_category">Категория</th>
      <th class="cms__table-th cms__table-th_type_unit">ед/изм</th>
      <th class="cms__table-th cms__table-th_type_count">Количество</th>
      <th class="cms__table-th cms__table-th_type_price">Цена</th>
      <th class="cms__table-th cms__table-th_type_total">Итог</th>
    </tr>
  `;

  delListItem(tbody, page);
};

// создать нижний блок с действиями
const createFooterActions = (page, totalPages) => {
  const footerActions = document.createElement('div');
  footerActions.classList.add('cms__footer-actions');

  const buttonPrev = document.createElement('button');
  buttonPrev.classList.add('cms__button-prev');
  buttonPrev.insertAdjacentHTML('beforeend', `
    <svg width="6" height="10" viewBox="0 0 6 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.79971 1.10636C6.42812 0.51287 5.43313 -0.426818 4.80472 0.216126L0.196378 4.51891C-0.0654595 4.7662 -0.0654595 5.21131 0.196378 5.4586L4.80472 9.81084C5.43313 10.4043 6.42812 9.46464 5.79971 8.87115L1.71504 5.01348L5.79971 1.10636Z"/>
    </svg> 
  `);

  const buttonNext = document.createElement('button');
  buttonNext.classList.add('cms__button-next');
  buttonNext.insertAdjacentHTML('beforeend', `
    <svg width="6" height="10" viewBox="0 0 6 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.200293 1.10636C-0.428118 0.51287 0.566865 -0.426818 1.19528 0.216126L5.80362 4.51891C6.06546 4.7662 6.06546 5.21131 5.80362 5.4586L1.19528 9.81084C0.566865 10.4043 -0.428118 9.46464 0.200293 8.87115L4.28496 5.01348L0.200293 1.10636Z"/>
    </svg>
  `);

  footerActions.append(buttonPrev, buttonNext);

  if (page === 1) {
    buttonPrev.setAttribute('disabled', '');
    buttonPrev.classList.add('cms__button-prev_state_disabled');
  } else {
    buttonPrev.addEventListener('click', () => {
      renderGoods(page - 1);
    });
  }

  if (page === totalPages) {
    buttonNext.setAttribute('disabled', '');
    buttonNext.classList.add('cms__button-next_state_disabled');
  } else {
    buttonNext.addEventListener('click', () => {
      renderGoods(page + 1);
    });
  }

  return footerActions;
};

// создать footer
const fillTableFooter = (footer, totalCount, page, totalPages) => {
  footer.insertAdjacentHTML('beforeend', `
    <div class="cms__shown-controller">
      <label class="cms__shown-label" for="shown-select">Показывать на странице:</label>
      <select class="cms__shown-list" name="items-to-show" id="shown-select">
        <option class="cms__shown-option" value="10">10</option>
        <option class="cms__shown-option" value="30">30</option>
        <option class="cms__shown-option" value="50">50</option>
      </select>
    </div>

    <p class="cms__shown-counter">
      <span class="cms__shown-number">1-10</span> of <span class="cms__shown-total">${totalCount}</span>
    </p>
  `);

  const footerActions = createFooterActions(page, totalPages);

  footer.append(footerActions);
};

// каркас таблицы
const crerateTableFrame = () => {
  // main
  const tableMain = document.createElement('div');
  tableMain.classList.add('cms__main');

  // actions
  const actionsBlock = document.createElement('div');
  actionsBlock.classList.add('cms__actions');

  // table
  const tableBox = document.createElement('div');
  tableBox.classList.add('cms__table-box');

  const table = document.createElement('table');
  table.classList.add('cms__table');

  const tableHead = document.createElement('thead');
  tableHead.classList.add('cms__table-head');

  const tableBody = document.createElement('tbody');
  tableBody.classList.add('cms__table-body');

  table.append(tableHead, tableBody);
  tableBox.append(table);

  // footer
  const tableFooter = document.createElement('div');
  tableFooter.classList.add('cms__table-footer');

  tableMain.append(actionsBlock, tableBox, tableFooter);

  return {
    main: tableMain,
    actions: actionsBlock,
    thead: tableHead,
    tbody: tableBody,
    footer: tableFooter,
  };
};

// заполнение таблицы
const fillTable = (
    thead,
    tbody,
    actions,
    footer,
    totalCount,
    page,
    totalPages,
) => {
  // actions
  createActionsBlock(actions, page);

  // table
  createTableBox(thead, tbody, page);

  // footer
  fillTableFooter(footer, totalCount, page, totalPages);
};


export {crerateTableFrame, fillTable};
