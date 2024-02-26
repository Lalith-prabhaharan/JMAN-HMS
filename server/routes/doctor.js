const express = require('express');
const {
    getAllPatients,
    getPatient,
    postSuggestions,
    getAllPendingPatients,
    getPendingPatient,
    approvePatient,
    rejectPatient,
    downloadreport
} = require('../controllers/doctor');

const router = express.Router();

router.route('/handling').get(getAllPatients);
router.route('/handling/:id').get(getPatient);
router.route('/suggestion/:id').post(postSuggestions);
router.route('/pending').get(getAllPendingPatients);
router.route('/pending/:id').get(getPendingPatient);
router.route('/approve/:id').put(approvePatient);
router.route('/reject/:id').patch(rejectPatient);


router.route('/report/download').post(downloadreport);

module.exports = router;