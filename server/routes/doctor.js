const express = require('express');
const router = express.Router();
const {
    getAllPatients,
    getPatient,
    getAllPendingPatients,
    getPendingPatient,
    approvePatient,
    rejectPatient,
    dischargePatient
} = require('../controllers/doctor');



// Get all Handling Patients
router.route('/handling').get(getAllPatients);

// Get a particular Handling Patient
router.route('/handling/:id').get(getPatient);

// Get all pending applicants
router.route('/pending').get(getAllPendingPatients);

// Get a particular Applicant details
router.route('/pending/:id').get(getPendingPatient);

// Approve Patient
router.route('/approve/:id').put(approvePatient);

// Reject Patient
router.route('/reject/:id').patch(rejectPatient);

// Discharge Patient
router.route('/discharge/:id').patch(dischargePatient);





module.exports = router;