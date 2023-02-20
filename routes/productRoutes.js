const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const productController = require('../controllers/productController');

router.get('/getProductsByCategory', productController.getProductsByCategory);

module.exports = router;
