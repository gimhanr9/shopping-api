const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favouriteController');
const auth = require('../middleware/auth');

router.post('/addFavourite', auth, favouriteController.addFavourite);

router.get('/favourites', auth, favouriteController.getFavourites);

module.exports = router;
