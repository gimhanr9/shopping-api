const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).catch((err) => {
  console.error('Error connecting to the database!');
});

const db = mongoose.connection;

module.exports = db;
