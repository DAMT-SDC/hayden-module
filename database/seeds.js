const { Product } = require('./models');
const { generateProduct } = require('../utils/mockData.js');

const categoriesForMock = [
  { name: 'Shoe', numItemsToGenerate: 1 },
  { name: 'Sandle', numItemsToGenerate: 0 },
  { name: 'Hoodie', numItemsToGenerate: 0 },
  { name: 'Pants', numItemsToGenerate: 0 },
  { name: 'Backpack', numItemsToGenerate: 0 },
  { name: 'Hat', numItemsToGenerate: 0 }
];

// Product.sync({ force: true }).then(() => {
//   categoriesForMock.forEach((category) => {
//     for (let i = 0; i < category.numItemsToGenerate; i += 1) {
//       Product.create(generateProduct(category.name));
//     }
//   })
// });

const obj = generateProduct('Shoe');

new Product(generateProduct(obj)).save((err, prod) => {
  if (err) return console.error(err);
});
