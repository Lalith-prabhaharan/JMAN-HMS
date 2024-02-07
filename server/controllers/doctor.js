const statusCode = require('http-status-codes');
const db = require('../db/connect');

const getAllPatients = async(req, res) => {
    const {userId} = req.user;
    const queryStr = {
        text: `SELECT 
                patient_id, 
                first_name,
                last_name,
                age FROM patient WHERE doc_id = $1`,
        values: [userId]
    }

    const {rows, rowCount} = await db.query(queryStr);
    
    if(rowCount === 0) {
        return res.status(200).json({msg: 'No Patients Available'});
    }

    return res.status(200).json(rows);
}

const getPatient = (req, res) => {
    res.status(200).json('Get a handling patient');
}

const postApproval = (req, res) => {
    res.status(200).json('Approve patient');
}

const getAllPendingPatients = async(req, res) => {
    const {userId} = req.user;
    // Query to fetch all the pending patients
    const queryStr = {
        text: `select application_id, concat(first_name,' ', last_name) As name from form where status = $1 AND doc_id = $2`,
        values: ['pending', userId]
    }

    // Fetching data from db
    const {rows, rowCount} = await db.query(queryStr);
    if(rowCount === 0) {
        return res.status(200).json({msg: 'No applicants Available'});
    }

    // Sending the response
    return res.status(200).json(rows);
}

const getPendingPatient = async(req, res) => {
    const {userId} = req.user;
    const application_id = req.params.id;
    const queryStr = {
        text: `select concat(first_name,' ', last_name) As name,
                      age,
                      phone,
                      blood_group,
                      diseases_description As Description,
                      history
        from form where application_id = $1 AND doc_id = $2`,
        values: [application_id, userId]
    }

    // Fetching data from db
    const {rows, rowCount} = await db.query(queryStr);
    if(rowCount === 0) {
        return res.status(404).json({msg: 'No such applicant availabe'});
    }

    // Sending the response
    return res.status(200).json(rows[0]);
}

const postSuggestions = (req, res) => {
    res.status(statusCode.OK).json('Post suggestions for patients');
}



module.exports = {
    getAllPatients,
    getPatient,
    getPendingPatient,
    getAllPendingPatients,
    postApproval,
    postSuggestions
}