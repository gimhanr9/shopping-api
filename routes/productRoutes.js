const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products/:category', productController.getProductsByCategory);

router.get('/getPopularProducts', productController.getPopularProducts);

router.post('/askQuestion', productController.askQuestion);

module.exports = router;
