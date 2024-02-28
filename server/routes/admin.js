const express = require('express');
const router = express.Router();
const {
    getAllDeptDoctors,
    getDeptDoctors,
    getPatients,
    getAllPatientStatus,
    getPatientDetails,
    postPatientForm,
    getSpecificStatus,
    postDoctorForm
} = require('../controllers/admin');


const createValidator = require('../middleware/validator');
const { email_post } = require('../controllers/mail');



// get all doctors
router.route('/doctor').get(getAllDeptDoctors);

// get all doctors in a particular department
router.route('/doctor/:dept').get(getDeptDoctors);

// get the application status
router.route('/patient/application/status').get(getPatients);

// get the status of all patient
router.route('/patient/status').get(getAllPatientStatus);

// get the details of a patient
router.route('/patient/status/:id').get(getPatientDetails);

// post the application form for new patient
router.post('/patient/application', createValidator, postPatientForm);

// post the doctor form for new doctor
router.route('/doctor/add').post(postDoctorForm)

// get specific status for the patient
router.route('/patient/application/status/:status').get(getSpecificStatus);

// post email for doctor 
router.route('/add/doctor').post(email_post);





module.exports = router;