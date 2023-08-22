const goods = [
];

const generateId = goods => {
  const idArr = [];
  for (const product of goods) {
    if (!idArr.includes(product.id)) idArr.push(product.id);
  }
  const generateUniqueId = () => {
    const randomId = +(Math.random().toString(10).slice(10));
    if (!idArr.includes(randomId)) {
      idArr.push(randomId);
    } else {
      generateUniqueId();
    }
    return randomId;
  };
  return generateUniqueId;
};

const generateUniqueId = generateId(goods);

export {goods, generateUniqueId};
