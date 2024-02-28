const express = require('express');
const router = express.Router();
const {
    getAllPatients,
    getPatient,
    updateRisk,
    getAllPendingPatients,
    getPendingPatient,
    approvePatient,
    rejectPatient
} = require('../controllers/doctor');



// Get all Handling Patients
router.route('/handling').get(getAllPatients);

// Get a particular Handling Patient
router.route('/handling/:id').get(getPatient);

//Update a Handling Patient risk
router.route('/handling/risk/:id').patch(updateRisk);

// Get all pending applicants
router.route('/pending').get(getAllPendingPatients);

// Get a particular Applicant details
router.route('/pending/:id').get(getPendingPatient);

// Approve Patient
router.route('/approve/:id').put(approvePatient);

// Reject Patient
router.route('/reject/:id').patch(rejectPatient);





module.exports = router;