const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
