const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.post('/addItem', auth, cartController.addToCart);

router.get('/cart', auth, cartController.getCart);

router.put('/updateItem', auth, cartController.updateCart);

router.delete('/deleteItem', auth, cartController.deleteItem);

router.delete('/deleteAll', auth, cartController.deleteAll);

module.exports = router;
