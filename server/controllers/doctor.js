const statusCode = require('http-status-codes');
const Doctor = require('../models/Doctor');
const Application = require('../models/Application');
const Patient = require('../models/Patient');
const Report = require('../models/Report');
const { Sequelize } = require('sequelize');


const azureStorage = require('azure-storage');
const path = require('path');
let { username } = require('os').userInfo();





const getAllPatients = async (req, res) => {
    const { userId } = req.user;
    const patient = await Patient.findAll({
        attributes: ['patient_id', 'first_name', 'last_name', 'age'],
        where: { doc_id: userId }
    });

    if (patient.length === 0) {
        return res.status(200).json({ msg: 'No Patients Available' });
    }

    return res.status(200).json(patient);
}

const getPatient = (req, res) => {
    res.status(200).json('Get a handling patient');
}

const approvePatient = async (req, res) => {
    const { userId } = req.user;
    const patient_id = req.params.id;
    const patient = await Application.update({
        status: 'approved'
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
    const updatedPatient = patient[1][0].dataValues;
    const { application_id, ...newPatient } = updatedPatient;
    newPatient.status = 'active';
    await Patient.create(newPatient);
    return res.status(200).json({ msg: "Success" });
}

const rejectPatient = async (req, res) => {
    const { userId } = req.user;
    const patient_id = req.params.id;
    const patient = await Application.update({
        status: 'Rejected'
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

const getAllPendingPatients = async (req, res) => {
    const { userId } = req.user;
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

    if (applicant.length === 0) {
        return res.status(200).json({ msg: 'No applicants Available' });
    }

    // Sending the response
    return res.status(200).json(applicant);
}

const getPendingPatient = async (req, res) => {
    const { userId } = req.user;
    const application_id = req.params.id;

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

const postSuggestions = (req, res) => {
    res.status(statusCode.OK).json('Post suggestions for patients');
}





const downloadreport = async (req, res) => {
    const { report_id } = req.body;

    const report = await Report.findAll({
        where: { report_id: report_id }
    })

    const containerName = process.env.AZURE_CONTAINER_NAME;
    const blobService = azureStorage.createBlobService(
        process.env.AZURE_STORAGE_CONNECTION_STRING
    );

    const sourcefile = report[0].dataValues.file_name;
    const destinationfilepath = path.join("C:/Users", username, "Downloads", sourcefile);

    blobService.getBlobToLocalFile(
        containerName,
        sourcefile,
        destinationfilepath,
        (err) => {
            if (err) {
                return res.status(500).send({ message: "Error Occured" });
            }

            res.status(200).send({ message: 'Success' });
        }
    );
};





module.exports = {
    getAllPatients,
    getPatient,
    getPendingPatient,
    getAllPendingPatients,
    approvePatient,
    postSuggestions,
    rejectPatient,
    downloadreport
}