const statusCode = require('http-status-codes');
const db = require('../db/connect');

const getAllPaients = (req, res) => {
    res.status(200).json('Get all Handling patients');
}

const getPatient = (req, res) => {
    res.status(200).json('Get a handling patient');
}

const postApproval = (req, res) => {
    res.status(200).json('Approve patient');
}

const getAllPendingPatients = (req, res) => {
    // Query to fetch all the pending patients
    const queryStr = {
        text: `select * from patients where status="pending"`
    }
    // Fetching data from db
    const pendingPatients = await db.query(queryStr);
    
    // Sending the response
    return res.status(200).json({ pendingPatients: pendingPatients });
}

const getPendingPatient = (req, res) => {
    res.status(200).json('Get a wating patient');
}

const postSuggestions = (req, res) => {
    res.status(statusCode.OK).json('Post suggestions for patients');
}



module.exports = {
    getAllPaients,
    getPatient,
    getPendingPatient,
    getAllPendingPatients,
    postApproval,
    postSuggestions
}