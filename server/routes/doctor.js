const express = require('express');
const {
    getAllPatients,
    getPatient,
    postSuggestions,
    getAllPendingPatients,
    getPendingPatient,
    postApproval,
} = require('../controllers/doctor');

const router = express.Router();

router.route('/handling').get(getAllPatients);
router.route('/handling/:id').get(getPatient);
router.route('/suggestion/:id').post(postSuggestions);
router.route('/pending').get(getAllPendingPatients);
router.route('/pending/:id').get(getPendingPatient);
router.route('/approve/:id').post(postApproval);

module.exports = router;const express = require('express');
const {
    getAllPaients,
    getPatient,
    postSuggestions,
    getAllPendingPatients,
    getPendingPatient,
    postApproval,
} = require('../controllers/doctor');

const router = express.Router();

router.route('/').get(getAllPaients);
router.route('/:id').get(getPatient);
router.route('/suggestion/:id').post(postSuggestions);
router.route('/pending').get(getAllPendingPatients);
router.route('/pending/:id').get(getPendingPatient);
router.route('/approve/:id').post(postApproval);

module.exports = router;