const express = require('express');
const { loginUser,forgetPass, otpVerify, resetPass } = require('../controllers/auth');
const router = express.Router();

router.route('/login').post(loginUser);
router.route('/forget_password').post(forgetPass);
router.route('/otp_verify').post(otpVerify);
router.route('/reset_pass').post(resetPass);
module.exports = router;