const { Product } = require("./models");
const { generateProduct } = require("../utils/mockData.js");

const categoriesForMock = [
  { "name": "Shoe", "numItemsToGenerate": 3000000 },
  { "name": "Sandle", "numItemsToGenerate": 1400000 },
  { "name": "Hoodie", "numItemsToGenerate": 1400000 },
  { "name": "Pants", "numItemsToGenerate": 1400000 },
  { "name": "Backpack", "numItemsToGenerate": 1400000 },
  { "name": "Hat", "numItemsToGenerate": 1400000 }
];

Product.sync({ force: false }).then(() => {
  categoriesForMock.forEach((category) => {
    for (let i = 0; i < category.numItemsToGenerate; i += 1) {
      if (i % 100000 === 0) {
        console.log(i)
      }
      Product.create(generateProduct(category.name));
    }
  })
});

