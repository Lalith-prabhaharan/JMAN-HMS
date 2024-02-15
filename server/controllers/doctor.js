const statusCode = require('http-status-codes');

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
    res.status(200).json('Get all wating patients');
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