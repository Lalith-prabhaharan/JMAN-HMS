const express = require('express');
const router = express.Router();
const {
    getDeptDoctors,
    getPatients,
    postPatientForm
} = require('../controllers/admin');


router.route('/patient').get(getPatients);
router.post('/form', postPatientForm);
router.route('/doctor/:dept').get(getDeptDoctors);

module.exports = router;