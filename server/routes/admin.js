const express = require('express');
const router = express.Router();
const {
    getDeptDoctors,
    getPatients,
    postPatientForm
} = require('../controllers/admin');
const createValidator = require('../middleware/validator');

router.post('/patient/application', createValidator,postPatientForm);
router.route('/patient/application/status').get(getPatients);
router.route('/doctor/:dept').get(getDeptDoctors);

module.exports = router;