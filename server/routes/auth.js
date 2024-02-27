const express = require('express');
const { loginUser } = require('../controllers/auth');
const router = express.Router();



// user login
router.route('/login').post(loginUser);



module.exports = router;