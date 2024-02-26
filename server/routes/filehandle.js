const express = require('express');
const router = express.Router();
const {
    show,
    blobupload,
    blobdownload
} = require('../controllers/filecontrol');


// test page
router.route('/').get(show);

// upload
router.route('/blobupload').post(blobupload);

// download
router.route('/blobdownload').post(blobdownload);





module.exports = router;