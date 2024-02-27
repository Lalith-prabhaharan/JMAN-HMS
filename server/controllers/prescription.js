const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Prescription = require('../models/Prescription');
const statusCode = require('http-status-codes');
let { username } = require('os').userInfo();

// get all doctors
const uploadprescription = async (req, res) => {
    const { patient_id, doc_id, suggestion } = req.body;

    const patient = await Patient.findAll({
        where: { patient_id: Number(patient_id) }
    })

    if (patient.length !== 1) {
        return res.status(400).json({ msg: "Invalid Patient" });
    }
    if (patient[0].dataValues.doc_id !== doc_id){
        return res.status(400).json({ msg: "Invalid Doctor" });
    }

    const timestamp = Date.now();

    console.log(patient_id, doc_id, timestamp, suggestion);
    
    const prescription = await Prescription.create({
        patient_id: Number(patient_id),
        doc_id: doc_id,
        time_stamp: timestamp,
        medication: suggestion
    });

    if (!prescription) {
        return res.status(500).json({ msg: 'Failed To insert' });
    }
    res.status(200).json({ message: 'Success' });
};


const getprescription = async (req, res) => {
    const patient_id=req.params.id;
    const prescription= await Prescription.findAll({
        where:{patient_id: patient_id}
    });
    if (prescription.length===0){
        return res.status(200).json({msg:"No prescription available"})
    }
    else
    return res.status(200).json(prescription);
};


module.exports = {
    uploadprescription,
    getprescription
}