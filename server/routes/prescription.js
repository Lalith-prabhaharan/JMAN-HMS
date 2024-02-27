const express = require('express');
const router = express.Router();
const {
    uploadprescription,
    getprescription
} = require('../controllers/prescription');


// get prescription details
router.route('/getDetails/:id').get(getprescription);

// post prescription 
router.route('/uploadprescription').post(uploadprescription);

module.exports = router;

