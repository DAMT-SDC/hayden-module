const Sequelize = require('sequelize');
const { connection } = require('./index.js');

const Product = connection.define(
  'products',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50)
    },
    price: {
      type: Sequelize.INTEGER
    },
    saleprice: {
      type: Sequelize.INTEGER
    },
    sport: {
      type: Sequelize.STRING(25)
    },
    color: {
      type: Sequelize.STRING(25)
    },
    team: {
      type: Sequelize.STRING(25)
    },
    rating: {
      type: Sequelize.FLOAT
    },
    num_ratings: {
      type: Sequelize.INTEGER
    },
    imageurl: {
      type: Sequelize.STRING(100)
    },
    gender: {
      type: Sequelize.STRING(25)
    },
    category: {
      type: Sequelize.STRING(25)
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
);

// const Category = connection.define('category', {
//   name: {
//     type: Sequelize.STRING(25)
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

const Suggestions = connection.define(
  'suggestions',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50)
    },
    count: {
      type: Sequelize.INTEGER
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
);

// Product.sync({ force: true }).then(() => {
//   console.log('successfully created Product table!');
// });

// Suggestions.sync({ force: true }).then(() => {
//   console.log('successfully created Suggestions table!');
// });

module.exports.Product = Product;
module.exports.Suggestions = Suggestions;
