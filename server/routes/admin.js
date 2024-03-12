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
    postDoctorForm,
    updatePatientForm,
    getSearchPatient,
    getSearchApplication,
    getSearchDoctor,
    releasePatient
} = require('../controllers/admin');


const createValidator = require('../middleware/validator');
const { email_post } = require('../controllers/mail');



// get all doctors
router.route('/doctor').get(getAllDeptDoctors);

// get all doctors in a particular department
router.route('/doctor/:dept').get(getDeptDoctors);

// get all applications status
router.route('/patient/application/status').get(getPatients);

// get the status of all patient
router.route('/patientStatus/:status').get(getAllPatientStatus);

// get the details of a patient
router.route('/patient/status/:id').get(getPatientDetails);

// post the application form for new patient
router.post('/patient/application', createValidator, postPatientForm);

// post the doctor form for new doctor
router.route('/doctor/add').post(postDoctorForm)

// get application based on specific value
router.route('/patient/application/status/:status').get(getSpecificStatus);

// post email for doctor 
router.route('/add/doctor').post(email_post);

// put application form for resubmit
router.patch('/patient/application', createValidator, updatePatientForm);

// get patients based on search
router.route('/patient/:search/:status').get(getSearchPatient);

// get applications based on search
router.route('/application/:search/:status').get(getSearchApplication);

// get doctors based on search
router.route('/doctor/:search/:dept').get(getSearchDoctor);

router.route('/release/:id').delete(releasePatient);





module.exports = router;