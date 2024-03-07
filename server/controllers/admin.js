require('dotenv').config();
const Doctor = require('../models/Doctor');
const Application = require('../models/Application');
const Patient = require('../models/Patient');
const Prescription=require('../models/Prescription')
const Report=require('../models/Report')
const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');



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

    var doctor;
    if(department === "all"){
        doctor = await Doctor.findAll({});
    }
    else {
        doctor = await Doctor.findAll({
            where: { department: department }
        });
    }

    if (doctor.length === 0) {
        return res.status(200).json([]);
    }
    res.status(200).json(doctor);
};


// get all the application status
const getPatients = async(req, res) => {
    const applicant = await Application.findAll({order: [
        ['risk', 'DESC']
    ]});

    if (applicant.length === 0) {
        return res.status(200).json({ msg: 'No patients' })
    }
    res.status(200).json(applicant);
};


// get the status of all patient
const getAllPatientStatus = async (req, res) => {
    const status = req.params.status;
    var allPatient;
    if (status === "all"){
        allPatient = await Patient.findAll({
            order: [ ['risk', 'DESC'] ]
        });
    }
    else{
        allPatient = await Patient.findAll({
            where: {status: status},
            order: [ ['risk', 'DESC'] ]
        });
    }
    if (allPatient.length === 0) {
        return res.status(200).json([]);
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
        doctor_id,
        risk
    } = req.body;


    const doctor = await Doctor.findAll({
        where: { doc_id: doctor_id },
    });

    if (doctor.length !== 1) {
        return res.status(404).json({ msg: "Invalid Doctor" });
    }
    const entry_date = new Date();
    const applicant = await Application.create({
        entry_date: entry_date,
        first_name: firstname,
        last_name: lastname,
        age: Number(age),
        dob: dob,
        gender: gender,
        phone: phone,
        email: email,
        address: address,
        weight: Number(weight),
        blood_group: blood,
        diseases_description: description,
        history: history,
        department: dept,
        doctor_name: doctor_name,
        doc_id: doctor_id,
        risk: risk
    });

    if (!applicant) {
        return res.status(500).json({ msg: 'Failed To insert' });
    }
    res.status(200).json({ msg: 'Success' });
}


// get application based on specific value
const getSpecificStatus = async(req,res) => {
    const status=req.params.status;
    var patient;
    if(status === "all"){
        patient=await Application.findAll({});
    }
    else {
        patient=await Application.findAll({
            where: {status: status}
        }) ;
    }
    if(patient.length === 0){
        return res.status(200).json([]);
    }
    res.status(200).json(patient);
}


// add new doctor
const postDoctorForm=async(req,res) => {
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


// get application based on specific value
const updatePatientForm = async(req,res) => {
    const {
        application_id,
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
        doctor_id,
        risk
    } = req.body;
    const avail = await Application.findAll({
        where: { application_id: application_id }
    });
    if (avail[0].dataValues.status != "rejected") {
        return res.status(404).json({ msg: "Invalid Application_id" });
    }

    const doctor = await Doctor.findAll({
        where: { doc_id: doctor_id },
    });

    if (doctor.length !== 1) {
        return res.status(404).json({ msg: "Invalid Doctor" });
    }
    const entry_date = new Date();
    const status = "pending";
    const reason = null;
    const applicant = await Application.update  ({
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
        doc_id: doctor_id,
        status: status,
        reason: reason,
        risk: risk
    },
    {
        where: {
            application_id: application_id
        },

        returning: true,
    });

    if (!applicant) {
        return res.status(500).json({ msg: 'Failed To insert' });
    }
    res.status(200).json({ msg: 'Success' });
}


// get patients based on search
const getSearchPatient = async (req, res) => {
    const {search, status} = req.params;

    var patients;
    if(!isNaN(search)){
        if (status === "all"){
            patients = await Patient.findAll({
                where: { patient_id: Number(search) }
            });
        }
        else{
            patients = await Patient.findAll({
                where: { status: status, patient_id: Number(search) }
            });
        }
    }
    else{
        if (status === "all"){
            patients = await Patient.findAll({});
        }
        else{
            patients = await Patient.findAll({ 
                where: { status: status }
            });
        }
        let x = new Array();
        for(let i=0; i<patients.length; i++){
            let str = patients[i].dataValues.first_name;
            if(str.toLowerCase().includes(search.toLowerCase())){
                x.push(patients[i]);
            }
        }
        patients = x;
    }
    res.status(200).json(patients);
};


// get applications based on search
const getSearchApplication = async (req, res) => {
    const {search, status} = req.params;
    var applications;
    if(!isNaN(search)){
        if (status === "all"){
            applications = await Application.findAll({
                where: { application_id: Number(search) }
            });
        }
        else{
            applications = await Application.findAll({
                where: { status: status, application_id: Number(search) }
            });
        }
    }
    else{
        if (status === "all"){
            applications = await Application.findAll({});
        }
        else{
            applications = await Application.findAll({
                where: { status: status }
            });
        }
        
        let x = new Array();
        for(let i=0; i<applications.length; i++){
            let str = applications[i].dataValues.first_name;
            if(str.toLowerCase().includes(search.toLowerCase())){
                x.push(applications[i]);
            }
        }
        applications = x;
    }
    res.status(200).json(applications);
};

// get doctors based on search
const getSearchDoctor = async (req, res) => {
    const {search, dept} = req.params;
    var doctors;
    if(!isNaN(search.substring(1))){
        if (dept === "all"){
            doctors = await Doctor.findAll({
                where: { doc_id: search }
            });
        }
        else{
            doctors = await Doctor.findAll({
                where: { department: dept, doc_id: search }
            });
        }
    }
    else{
        if (dept === "all"){
            doctors = await Doctor.findAll({});
        }
        else{
            doctors = await Doctor.findAll({
                where: { department: dept }
            });
        }
        
        let x = new Array();
        for(let i=0; i<doctors.length; i++){
            let str = doctors[i].dataValues.first_name;
            if(str.toLowerCase().includes(search.toLowerCase())){
                x.push(doctors[i]);
            }
        }
        doctors = x;
    }
    res.status(200).json(doctors);
};


const releasePatient=async(req,res)=>{
    const patient_id = Number(req.params.id);
    const email = await Patient.findAll({
        attributes: ['email'],
        where: {
            patient_id: patient_id,
            status: 'discharge'
        }
    });

    const prescription = await Prescription.destroy({
        where: {
            patient_id: patient_id,
        },
        returning: true,
    });

    if(prescription === 0) {
        console.log("No prescripiton Available");;
    }

    const report = await Report.destroy({
        where: {
            patient_id: patient_id,
        },
        returning: true,
    });

    if(report === 0) {
        console.log("No report Available");;
    }

    const patient = await Patient.destroy({
        where: {
            patient_id: patient_id,
            status: 'discharge'
        },
        returning: true,
    });

    if(patient === 0) {
        return res.status(404).json({msg: 'No such patient availabe'});
    }

    const mail =  email[0].dataValues.email;

    const applicant = await Application.destroy({
        where: {
            email: mail,
            doc_id: userId,
            status: 'approved'
        },
        returning: true,
    });
    
    if(applicant === 0) {
        return res.status(404).json({msg: 'No such applicant availabe'});
    }

    return res.status(200).json({msg: 'success'});
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
    updatePatientForm,
    getSearchPatient,
    getSearchApplication,
    getSearchDoctor,
    releasePatient
}