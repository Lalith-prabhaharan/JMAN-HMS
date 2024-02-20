const express = require('express');
const router = express.Router();
const {
    getDeptDoctors,
    getPatients,
    postPatientForm,
    getAllDeptDoctors,
    getAllPatientStatus,
    getSpecificStatus,
    postDoctorForm
} = require('../controllers/admin');
const createValidator = require('../middleware/validator');

router.post('/patient/application', createValidator,postPatientForm);
router.post('/doctor/add',postDoctorForm)
router.route('/patient/application/status').get(getPatients);
router.route('/patient/application/status/:status').get(getSpecificStatus);
router.route('/doctor/:dept').get(getDeptDoctors);
router.route('/doctor').get(getAllDeptDoctors);
router.route('/patient/status').get(getAllPatientStatus);
module.exports = router;