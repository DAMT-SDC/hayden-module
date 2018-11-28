const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { Product } = require('./models');
const { Suggestions } = require('./models');
const { generateProduct } = require('../utils/mockData.js');

let id = 1;

const csvWriter = createCsvWriter({
  path: './database/seeds.csv',
  append: true,
  header: [
    { id: 'id', title: 'ID' },
    { id: 'name', title: 'NAME' },
    { id: 'price', title: 'PRICE' },
    { id: 'salePrice', title: 'SALEPRICE' },
    { id: 'sport', title: 'SPORT' },
    { id: 'color', title: 'COLOR' },
    { id: 'team', title: 'TEAM' },
    { id: 'rating', title: 'RATING' },
    { id: 'num_ratings', title: 'NUM_RATINGS' },
    { id: 'imageUrl', title: 'IMAGEURL' },
    { id: 'gender', title: 'GENDER' },
    { id: 'category', title: 'CATEGORY' }
  ]
});

const categoriesForMock = [
  { name: 'Shoe', numItemsToGenerate: 50000 },
  { name: 'Sandle', numItemsToGenerate: 10000 },
  { name: 'Hoodie', numItemsToGenerate: 10000 },
  { name: 'Pants', numItemsToGenerate: 10000 },
  { name: 'Backpack', numItemsToGenerate: 10000 },
  { name: 'Hat', numItemsToGenerate: 10000 }
];


const generateResultsArray = () => {
  const results = [];
  categoriesForMock.forEach(category => {
    for (let i = 0; i < category.numItemsToGenerate; i += 1) {
      const obj = generateProduct(category.name);
      obj.id = id;
      results.push(obj);
      id += 1;
    }
  });
  return results;
};

for (let i = 0; i < 100; i++) {
  csvWriter.writeRecords(generateResultsArray());
  console.log(i);
}

// Product.sync({ force: false }).then(() => {
//   categoriesForMock.forEach(category => {
//     for (let i = 0; i < category.numItemsToGenerate; i += 1) {
//       if (i % 100000 === 0) {
//         console.log(i);
//       }
//       Product.create(generateProduct(category.name));
//     }
//   });
// });
