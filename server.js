const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./models/product');
const app = express();
const PORT = process.env.PORT || 4000;

var corsOptions = {
  origin: process.env.REACT_APP_URL,
};

app.use(corsOptions);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.on('error', cosnole.error.bind(console, 'MongoDB connection failed'));

app.listen(PORT, () => {
  console.log('Server started!');
});
