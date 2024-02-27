require('dotenv').config();
const Doctor = require('../models/Doctor');
const Application = require('../models/Application');
const Patient = require('../models/Patient');
const Report = require('../models/Report');
const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');
const path = require('path');
const azureStorage = require('azure-storage');
const intoStream = require('into-stream');



// get all doctors
const getAllDeptDoctors = async (req, res) => {
    const doctor = await Doctor.findAll({
        attributes: ['doc_id', 'first_name', 'last_name', 'age', 'department', 'year_of_exp']
    });

    if (doctor.length === 0) {
        return res.status(200).json({ msg: 'No doctors available' });
    }
    return res.status(200).json(doctor);
};


// get all doctors in a particular department
const getDeptDoctors = async (req, res) => {
    const department = req.params.dept;

    const doctor = await Doctor.findAll({
        attributes: ['doc_id', 'first_name', 'last_name', 'age', 'department', 'year_of_exp'],
        where: { department: { [Op.regexp]: `^${department}` } }
    });

    if (doctor.length === 0) {
        return res.status(404).json({ msg: 'No doctor in the specified department' })
    }
    res.status(200).json(doctor);
};


// get all the application status
const getPatients = async(req, res) => {
    const applicant = await Application.findAll({});

    if (applicant.length === 0) {
        return res.status(404).json({ msg: 'No patients' })
    }
    res.status(200).json(applicant);
};


// get the status of all patient
const getAllPatientStatus = async (req, res) => {
    const allPatient = await Patient.findAll({
        attributes: ['patient_id', 'first_name', 'last_name', 'status']
    });

    if (allPatient.length === 0) {
        return res.status(404).json({ msg: 'No Patients' });
    }
    res.status(200).json(allPatient);
};


// get the details of a patient
const getPatientDetails = async (req, res) => {
    const patient = await Patient.findAll({
        where: { patient_id: Number(req.params.id) }
    });

    if (patient.length === 0) {
        return res.status(404).json({ msg: `No patient with id: ${req.params.id}` });
    }
    res.status(200).json(patient);
};


// post the application form for new patient
const postPatientForm = async (req, res) => {
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
        where: { doc_id: doctor_id },
    })

    if (doctor.length !== 1) {
        return res.status(400).json({ msg: "Invalid Doctor" });
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
        return res.status(500).json({ msg: 'Failed To insert' });
    }
    res.status(200).json({ msg: 'Success' });
}


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
    if (patient[0].dataValues.doc_id !== doc_id){
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


// test interface to upload report
const dirname = path.resolve("../server");
const choosereport = (req, res) => {
    res.sendFile(path.join(dirname, "index.html"));
};



const getSpecificStatus = async(req,res)=>{
    const status=req.params.status;
    const patient=await Application.findAll({
        where: {status: { [Op.regexp]: `^${status}`}}
    }) 
    if(patient.length === 0){
        return res.status(404).json({msg:'No Patient in the specified status'})
    }
    res.status(200).json(patient);
}


// add new doctor
const postDoctorForm=async(req,res)=>{
    const{
        first_name,
        last_name,
        email,
        password,
        age,
        dob,
        gender,
        phone,
        department,
        year_of_exp,
    } = req.body
    const maxDocId = await Doctor.max('doc_id')
    const numericPart = parseInt(maxDocId.slice(1), 10);
    const newNumericPart = numericPart + 1;
    // Format the new doc_id
    const newDocId = `D${newNumericPart.toString().padStart(4, '0')}`;

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);

    const doctor=await Doctor.create({
        doc_id:newDocId,
        first_name:first_name,
        last_name:last_name,
        email:email,
        dob:dob,
        password:hashedPassword,
        age:age,
        gender:gender,
        phone:phone,
        department:department,
        year_of_exp:year_of_exp
    })
    if(!doctor)
        return res.status(500).json({msg:'Failed'})
    res.status(200).json({msg:'Success'})
}


module.exports = {
    getAllDeptDoctors,
    getDeptDoctors,
    getPatients,
    getAllPatientStatus,
    getPatientDetails,
    postPatientForm,
    getSpecificStatus,
    postDoctorForm,
    uploadreport,
    choosereport
}