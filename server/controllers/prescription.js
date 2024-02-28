const Patient = require('../models/Patient');
const Prescription = require('../models/Prescription');
const Report = require('../models/Report');
const path = require('path');
const azureStorage = require('azure-storage');
const intoStream = require('into-stream');
let { username } = require('os').userInfo();


// upload prescription
const uploadprescription = async (req, res) => {
    const { patient_id, doc_id, suggestion } = req.body;

    const patient = await Patient.findAll({
        where: { patient_id: Number(patient_id) }
    })

    if (patient.length !== 1) {
        return res.status(400).json({ msg: "Invalid Patient" });
    }
    if (patient[0].dataValues.doc_id !== doc_id) {
        return res.status(400).json({ msg: "Invalid Doctor" });
    }

    let date = new Date();
    var currdatetime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    currdatetime += ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    const prescription = await Prescription.create({
        patient_id: Number(patient_id),
        doc_id: doc_id,
        time_stamp: currdatetime,
        medication: suggestion
    });

    if (!prescription) {
        return res.status(500).json({ msg: 'Failed To insert' });
    }

    res.status(200).json({ message: 'Success' });
};


// get prescriptions of a patient
const getprescription = async (req, res) => {
    const patient_id = req.params.id;
    const prescription = await Prescription.findAll({
        where: { patient_id: patient_id }
    });
    if (prescription.length === 0) {
        return res.status(200).json({ msg: "No prescription available" })
    }
    res.status(200).json(prescription);
};


// test interface to upload report
const dirname = path.resolve("../server");
const choosereport = (req, res) => {
    res.sendFile(path.join(dirname, "index.html"));
};


// upload the patient report
const uploadreport = async (req, res) => {
    const {
        patient_id,
        doc_id
    } = req.body;

    if (!req.files) {
        return res.status(400).send("No files are received.");
    }

    const patient = await Patient.findAll({
        where: { patient_id: Number(patient_id) }
    })

    if (patient.length !== 1) {
        return res.status(400).json({ msg: "Invalid Patient" });
    }
    if (patient[0].dataValues.doc_id !== doc_id) {
        return res.status(400).json({ msg: "Invalid Doctor" });
    }

    const timestamp = Date.now();
    const file_name = `${timestamp}-${req.files.file.name}`;

    const report = await Report.create({
        patient_id: patient_id,
        doc_id: doc_id,
        time_stamp: timestamp,
        file_name: file_name
    });

    if (!report) {
        return res.status(500).json({ msg: 'Failed To insert' });
    }

    const containerName = process.env.AZURE_CONTAINER_NAME;
    const blobService = azureStorage.createBlobService(
        process.env.AZURE_STORAGE_CONNECTION_STRING
    );
    const stream = intoStream(req.files.file.data);
    const streamLength = req.files.file.data.length;

    blobService.createBlockBlobFromStream(
        containerName,
        file_name,
        stream,
        streamLength,
        (err) => {
            if (err) {
                return res.status(500).send({ message: "Error Occured" });
            }
        }
    );


    res.status(200).json({ message: 'Success' });
}


// Download patient report
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


// get report details of a particular patient
const getreports = async(req, res) => {
    const {patient_id} = req.body;
    const patient = await Patient.findAll({
        where: { patient_id: Number(patient_id) }
    });
    if (patient.length === 0) {
        return res.status(200).json({ msg: 'Invalid Patient Id' });
    }

    const report = await Report.findAll({
        attributes: ['report_id', 'time_stamp', 'file_name'],
        where: { patient_id: Number(patient_id) }
    });

    if (report.length === 0) {
        return res.status(200).json({ msg: 'No Report Available' });
    }

    return res.status(200).json(report);
} 





module.exports = {
    uploadprescription,
    getprescription,
    uploadreport,
    choosereport,
    downloadreport,
    getreports
}