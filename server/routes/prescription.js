const express = require('express');
const router = express.Router();
const {
    uploadprescription,
    getprescription,
    uploadreport,
    downloadreport,
    getreports
} = require('../controllers/prescription');


// get prescription details
router.route('/getDetails/:id').get(getprescription);

// post prescription 
router.route('/uploadprescription').post(uploadprescription);

// upload report
router.route('/report/upload').post(uploadreport);

// Download patient report
router.route('/report/download/:id').get(downloadreport);

// get report details of a particular patient
router.route('/patient/report/:id').get(getreports);





module.exports = router;

