const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/auth');
const purchaseController = require('../controllers/purchaseController');

router.post('/addPurchase', auth, purchaseController.addPurchase);

router.get('/purchases', auth, purchaseController.getPurchases);

router.put(
  '/ratePurchase',
  auth,
  upload.array('images', 6),
  purchaseController.ratePurchase
);

module.exports = router;
