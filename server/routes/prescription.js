const express = require('express');
const router = express.Router();
const {
    uploadprescription,
    getprescription
} = require('../controllers/prescription');


// get prescription details
router.route('/getDetails').post(getprescription);

// post prescription 
router.route('/uploadprescription').post(uploadprescription);

module.exports = router;

