const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const purchaseController = require('../controllers/purchaseController');

router.post('/addPurchase', auth, purchaseController.addPurchase);

router.get('/purchases', auth, purchaseController.getPurchases);

router.put('/ratePurchase', auth, purchaseController.ratePurchase);

module.exports = router;
