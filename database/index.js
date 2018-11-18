require('dotenv').config();
const mongoose = require('mongoose');
// TODO source these attributes from a .env file

mongoose.connect('mongodb://localhost/shoedidas_header');
mongoose.set('debug', true);

const { connection } = mongoose;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log('MongoDB Connected!');
});

// connection
//     .authenticate()
//     .then(() => {
//         console.log('Connection to sql database successful!');
//     })
//     .catch(err => {
//         console.log('Unable to connect to database: ', err);
//     });

module.exports.connection = connection;
