const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getProductsByCategory', productController.getProductsByCategory);

module.exports = router;
