const Doctor = require('../models/Doctor');
const Application = require('../models/Application');
const Patient = require('../models/Patient');
const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');

// get all doctors
const getSearchPatient = async (req, res) => {
    const {search, status} = req.params;
    var patients;
    if(!isNaN(search)){
        console.log("number");
        if (status === "all"){
            patients = await Patient.findAll({
                attributes: ['patient_id', 'first_name', 'last_name', 'status', 'risk'],
                where: { patient_id: Number(search) },
                order: [ ['risk', 'DESC'] ]
            });
        }
        else{
            patients = await Patient.findAll({
                attributes: ['patient_id', 'first_name', 'last_name', 'status', 'risk'],
                where: { status: status, patient_id: Number(search) },
                order: [ ['risk', 'DESC'] ]
            });
        }
    }
    else{
        console.log("not a number");
    }
    if (patients.length === 0) {
        return res.status(200).json({ msg: 'No Patients' });
    }
    res.status(200).json(patients);

};


module.exports = {
    getSearchPatient
}