const Sequelize = require("sequelize");
const { connection } = require("./index.js");

const Product = connection.define("product", {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  salePrice: {
    type: Sequelize.INTEGER
  },
  gender: {
    type: Sequelize.STRING
  },
  sport: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  team: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  }
});

const Category = connection.define("category", {
  name: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  featured: {
    type: Sequelize.BOOLEAN
  }
});

Category.sync({ force: true }).then(() => {
  console.log("successfully created Category table!");
});

Product.sync({ force: true }).then(() => {
  console.log("successfully created Product table!");
});

module.exports.Product = Product;
module.exports.Category = Category;