const express = require('express');
const router = express.Router();
const {
    uploadprescription,
    getprescription,
    uploadreport,
    choosereport,
    downloadreport,
    getreports
} = require('../controllers/prescription');


// get prescription details
router.route('/getDetails/:id').get(getprescription);

// post prescription 
router.route('/uploadprescription').post(uploadprescription);

// upload report
router.route('/report/upload').get(choosereport).post(uploadreport);

// Download patient report
router.route('/report/download').post(downloadreport);

// get report details of a particular patient
router.route('/patient/report').post(getreports);





module.exports = router;

