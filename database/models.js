const Sequelize = require('sequelize');
const { connection } = require('./index.js');

const Product = connection.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  saleprice: {
    type: Sequelize.INTEGER
  },
  sport: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  team: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.FLOAT
  },
  num_ratings: {
    type: Sequelize.INTEGER
  },
  imageurl: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  }
}, {
  createdAt: false,
  updatedAt: false
});

// const Category = connection.define('category', {
//   name: {
//     type: Sequelize.STRING
//   },
//   gender: {
//     type: Sequelize.STRING
//   },
//   featured: {
//     type: Sequelize.BOOLEAN
//   }
// });

// Category.sync().then(() => {
//   console.log("successfully created Category table!");
// });

// Product.sync().then(() => {
//   console.log("successfully created Product table!");
// });

module.exports.Product = Product;
// module.exports.Category = Category;
