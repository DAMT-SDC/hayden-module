const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  salePrice: Number,
  sport: String,
  color: String,
  team: String,
  rating: Number,
  num_ratings: Number,
  imageUrl: String,
  gender: String,
  category: String
})

const Product = mongoose.model('Product', productSchema);


// const Category = connection.define("category", {
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
