const Doctor = require('../models/Doctor');
const Application = require('../models/Application');
const {Op} = require('sequelize');

const getDeptDoctors = async (req, res) => {
    const department= req.params.dept; 
    
    const doctor = await Doctor.findAll({
        where: {department: { [Op.regexp]: `^${department}`}}
    }) 
    
    if(doctor.length === 0){
        return res.status(404).json({msg:'No doctor in the specified department'})
    }
    res.status(200).json(doctor);
}

const getAllDeptDoctors = async(req, res) => {
    const doctor = await Doctor.findAll({
        attributes: ['doc_id', 'first_name', 'last_name','age','department', 'year_of_exp'],
    }) 

    if(doctor.length === 0){
        return res.status(200).json({msg:'No doctors available'});
    }
    return res.status(200).json(doctor);
}

const getPatients = async(req, res) => {
    const applicant = await Application.findAll({
        attributes: ['application_id','first_name','last_name', 'status'],
    });

    if(applicant.length === 0){
        return res.status(404).json({msg:'No patients'})
    }
    res.status(200).json(applicant);
}

const getAllPatientStatus = async(req, res) => {
    // const getPatientsStatus = `SELECT patient_id,first_name,last_name,status FROM patient;`;
    // const {rows,rowCount} = await db.query(getPatientsStatus);
    // if(rowCount === 0){
    //     return res.status(200).json({msg:'No patients'})
    // }
    // res.status(200).json(rows);
}

const postPatientForm = async(req, res) => {
    const {  
        firstname, 
        lastname, 
        age, 
        dob, 
        gender, 
        phone, 
        email,
        address, 
        blood,
        weight,
        description,
        history,
        dept,
        doctor_name,
        doctor_id
    } = req.body;


    const doctor = await Doctor.findAll({
        where: {doc_id: doctor_id},        
    })

    if(doctor.length !== 1) {
        return res.status(400).json({msg: "Invalid Doctor"});
    }
    const entry_date = new Date();
    const applicant = await Application.create({
        entry_date: entry_date,
        first_name: firstname,
        last_name: lastname,
        age: age,
        dob: dob,
        gender: gender,
        phone: phone,
        email: email,
        address: address,
        weight: weight,
        blood_group: blood,
        diseases_description: description,
        history: history,
        department: dept,
        doctor_name: doctor_name,
        doc_id: doctor_id
    });

    if (!applicant) {
        return res.status(500).json({msg: 'Failed To insert'});
    }
    res.status(200).json({ msg: 'Success' });
}

module.exports = {
    getDeptDoctors,
    getPatients,
    postPatientForm,
    getAllDeptDoctors,
    getAllPatientStatus,
}