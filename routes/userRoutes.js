const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/forgotPassword', userController.forgotPassword);

router.post('/checkOtp', userController.checkOtp);

router.put('/resetPassword', userController.resetPassword);

router.put('/updateDetails', auth, userController.updateDetails);

module.exports = router;
