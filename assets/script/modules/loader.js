import {
  mainCost,
  costDescription,
  loaderBar,
} from './domElements.js';

// создать actions preload
const createActionsTemplate = (actionsBlock) => {
  actionsBlock.innerHTML = `
  <div class="cms__actions-template cms__actions-template_type_filter"></div>
  <div class="cms__actions-template cms__actions-template_type_search"></div>
  <div class="cms__actions-template cms__actions-template_type_btn"></div>
  `;
};

// создать thead preload
const createTheadTemplate = (theadBlock) => {
  theadBlock.classList.add('cms__table-head_type_preload');
  theadBlock.innerHTML = `
    <tr>
      <th class="cms__th-template cms__table-th_type_id"></th>
      <th class="cms__th-template cms__table-th_type_name"></th>
      <th class="cms__th-template cms__table-th_type_category"></th>
      <th class="cms__th-template cms__table-th_type_unit"></th>
      <th class="cms__th-template cms__table-th_type_count"></th>
      <th class="cms__th-template cms__table-th_type_price"></th>
      <th class="cms__th-template cms__table-th_type_total"></th>
    </tr>
  `;
};

// создать footer preload
const createFooterPreload = (tableFooter) => {
  tableFooter.innerHTML = `
    <div class="cms__template-footer"></div>
    <div class="cms__template-footer"></div>
    <div class="cms__template-footer"></div>
  `;
};

// создать preload товара
const createTemplateRow = () => {
  const templateRow = document.createElement('tr');
  templateRow.classList.add('cms__table-row', 'cms__table-row_type_template');
  templateRow.innerHTML =
    `<td class="cms__template-td cms__table-data_type_id"></td>
    <td class="cms__template-td cms__table-data_type_name"></td>
    <td class="cms__template-td cms__table-data_type_category"></td>
    <td class="cms__template-td cms__table-data_type_unit"></td>
    <td class="cms__template-td cms__table-data_type_count"></td>
    <td class="cms__template-td cms__table-data_type_price"></td>
    <td class="cms__template-td cms__table-data_type_total"></td>
    <td class="cms__template-td cms__table-data_type_actions"></td>
    `;

  return templateRow;
};

// создать preload таблицы
const createTableTemplate = (
    actionsBlock,
    theadBlock,
    tableBody,
    tableFooter,
    goodsQuantity,
) => {
  // actions preload
  createActionsTemplate(actionsBlock);

  // thead preload
  createTheadTemplate(theadBlock);

  // goods preload
  const templateRowsArr = [];
  for (let i = 0; i < goodsQuantity; i++) {
    const row = createTemplateRow();
    templateRowsArr.push(row);
  }
  tableBody.append(...templateRowsArr);

  // footer preloaad
  createFooterPreload(tableFooter);
};

// убрать preload
const removeTemplates = (
    actionsBlock,
    theadBlock,
    tableBody,
    tableFooter,
) => {
  actionsBlock.innerHTML = '';
  theadBlock.classList.remove('cms__table-head_type_preload');
  theadBlock.innerHTML = '';
  tableBody.innerHTML = '';
  tableFooter.innerHTML = '';
};

// запустить loader
const startLoader = () => {
  mainCost.textContent = '';
  costDescription.textContent = 'Идет загрузка…';
  loaderBar.classList.add('bar-active');
};

// убрать loader
const stopLoader = () => {
  loaderBar.classList.remove('bar-active');
};

export {createTableTemplate, removeTemplates, startLoader, stopLoader};
