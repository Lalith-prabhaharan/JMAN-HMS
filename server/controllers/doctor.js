const statusCode = require('http-status-codes');
const Doctor = require('../models/Doctor');
const Application = require('../models/Application');
const Patient = require('../models/Patient');
const {Sequelize} = require('sequelize');

const getAllPatients = async(req, res) => {
    const {userId} = req.user;
    const patient = await Patient.findAll({
        attributes: ['patient_id', 'first_name', 'last_name', 'age'],
        where: {doc_id: userId}
    });
    
    if(patient.length === 0) {
        return res.status(200).json({msg: 'No Patients Available'});
    }

    return res.status(200).json(patient);
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
    
    const applicant = await Application.findAll({
        attributes: [
            'application_id', [
                Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), 
                'name'
            ]],
        where: {
            status: 'pending',
            doc_id: userId
        }
    })
    
    if(applicant.length === 0) {
        return res.status(200).json({msg: 'No applicants Available'});
    }

    // Sending the response
    return res.status(200).json(applicant);
}

const getPendingPatient = async(req, res) => {
    const {userId} = req.user;
    const application_id = req.params.id;

    const applicant = await Application.findAll({
        attributes: [[
                Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')), 
                'name'
            ] , 
            'age', 
            'phone', 
            'blood_group', 
            ['diseases_description', 'description'], 
            'history'
        ],
        where: {
            application_id: application_id,
            doc_id: userId
        }
    })

    // Fetching data from db
    if(applicant.length === 0) {
        return res.status(404).json({msg: 'No such applicant availabe'});
    }

    // Sending the response
    return res.status(200).json(applicant[0]);
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