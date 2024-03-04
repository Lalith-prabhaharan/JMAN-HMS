const express = require('express');
const router = express.Router();
const {
    getSearchPatient
} = require('../controllers/search');



// get all doctors
router.route('/:search/:status').get(getSearchPatient);



module.exports = router;