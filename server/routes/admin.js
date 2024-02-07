const express = require('express');
const router = express.Router();
const {
    getDeptDoctors,
    getPatients,
    postPatientForm,
    getAllDeptDoctors,
    getPatientsStatus,
} = require('../controllers/admin');
const createValidator = require('../middleware/validator');

router.post('/patient/application', createValidator,postPatientForm);
router.route('/patient/application/status').get(getPatients);
router.route('/doctor/:dept').get(getDeptDoctors);
router.route('/doctor').get(getAllDeptDoctors);
router.route('/patient/status').get(getPatientsStatus);
module.exports = router;