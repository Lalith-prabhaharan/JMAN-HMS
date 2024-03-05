const statusCode = require('http-status-codes');
const Doctor = require('../models/Doctor');
const Application = require('../models/Application');
const Patient = require('../models/Patient');
const { Sequelize } = require('sequelize');


// Get all Handling Patients
const getAllPatients = async(req, res) => {
    const {userId} = req.user;
    const patient = await Patient.findAll({
        attributes: ['patient_id', 'first_name', 'last_name', 'age', 'risk'], 
        where: { doc_id: userId, status: "active"},
        order: [
            ['risk', 'DESC']
        ]
    });

    if (patient.length === 0) {
        return res.status(200).json({ msg: 'No Patients Available' });
    }

    return res.status(200).json(patient);
}


// Get a particular Handling Patient
const getPatient = async (req, res) => {
    const {userId} = req.user;
    const patient_id = Number(req.params.id);
    const patient = await Patient.findAll({
        where: {doc_id: userId, patient_id: patient_id, status: "active"}
    });
    
    if(patient.length === 0) {
        return res.status(404).json({msg: 'No such patient availabe'});
    }

    return res.status(200).json(patient[0]);
}


// Approve Patient
const approvePatient = async(req, res) => {
    const {userId} = req.user;
    const patient_id = Number(req.params.id);
    const patient = await Application.update({
        status: 'approved'
    },
    {
        where: {
            application_id: Number(patient_id),
            doc_id: userId,
            status: 'pending'
        },

        returning: true,
    });
    if (patient[0] != 1) {
        return res.status(404).json({ msg: "No such patient available" });
    }
    const updatedPatient = patient[1][0].dataValues;
    const { application_id, ...newPatient } = updatedPatient;
    newPatient.status = 'active';
    await Patient.create(newPatient);
    return res.status(200).json({ msg: "Success" });
}


// Reject Patient
const rejectPatient = async(req, res) => {
    const {userId} = req.user;
    const {reason} = req.body;
    const patient_id = Number(req.params.id);
    const patient = await Application.update({
        status: 'rejected',
        reason: reason
    },
    {
        where: {
            application_id: patient_id,
            doc_id: userId,
            status: 'pending'
        },

        returning: true,
    });
    if (patient[0] != 1) {
        return res.status(404).json({ msg: "No such patient available" });
    }
    return res.status(200).json({ msg: "Success" });
}


// Get all pending Applicants
const getAllPendingPatients = async(req, res) => {
    const {userId} = req.user;
    const applicant = await Application.findAll({
        attributes: [
            'application_id', [
                Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),
                'name'
            ], 'age','phone', 'blood_group', 'diseases_description', 'history', 'risk'],
        where: {
            status: 'pending',
            doc_id: userId
        },
        order: [
            ['risk', 'DESC']
        ]
    })

    if (applicant.length === 0) {
        return res.status(200).json({ msg: 'No applicants Available' });
    }

    // Sending the response
    return res.status(200).json(applicant);
}


// Get a particular Applicant details
const getPendingPatient = async(req, res) => {
    const {userId} = req.user;
    const application_id = Number(req.params.id);

    const applicant = await Application.findAll({
        attributes: [[
            Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),
            'name'
        ],
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
    if (applicant.length === 0) {
        return res.status(404).json({ msg: 'No such applicant availabe' });
    }

    // Sending the response
    return res.status(200).json(applicant[0]);
}


// update risk status
const updateRisk = async(req, res) => {
    const {id} = req.params;
    const {risk} = req.body;
    const {userId} = req.user;
    if(!risk) {
        return res.status(500).json({ msg: "Bad request" });
    }
    const patient = await Patient.update({risk: risk}, {
        where: {patient_id: id, doc_id: userId}
    })

    if (patient[0] != 1) {
        return res.status(404).json({ msg: "No such patient available" });
    }
    return res.status(200).json({ msg: "Success" });
}


// discharge a patient
const dischargePatient = async (req, res) => {
    const {userId} = req.user;
    const patient_id = Number(req.params.id);
    const patient = await Patient.update({
        status: 'discharge'
    },
    {
        where: {
            patient_id: patient_id,
            doc_id: userId,
            status: 'active'
        },

        returning: true,
    });
    
    if(patient.length === 0) {
        return res.status(404).json({msg: 'No such patient availabe'});
    }

    return res.status(200).json(patient[0]);
}





module.exports = {
    getAllPatients,
    getPatient,
    getPendingPatient,
    getAllPendingPatients,
    approvePatient,
    rejectPatient,
    updateRisk,
    dischargePatient
}