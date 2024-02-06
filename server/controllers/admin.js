const db = require('../db/connect');

const getDeptDoctors = async (req, res) => {
    const department= req.params.dept; 
    const getDoctors = {
        text: `SELECT * FROM doctor WHERE department = $1`,
        values: [department] 
    } 
    const {rows,rowCount} = await db.query(getDoctors);
    if(rowCount===0){
        res.status(404).json({msg:'No doctor in the specified department'})
    }
    else{
        res.status(200).json(rows);
    }
}
const getPatients = (req, res) => {
    res.status(200).json({ msg: 'Get Approval of patients' });
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

    const getDoctors = {
        text: `SELECT doc_id FROM doctor WHERE doc_id = $1`,
        values: [doctor_id] 
    } 

    const doctors = await db.query(getDoctors);
    if(doctors.rowCount !== 1) {
        return res.status(400).json({msg: "Invalid Doctor"});
    }
    const entry_date = new Date();
    const insertPatient = {
        text: `INSERT INTO FORM (
            entry_date,
            first_name,
            last_name,
            age,
            dob,
            gender,
            phone,
            email,
            address,
            weight,
            blood_group,
            diseases_description,
            history,
            department,
            doctor_name,
            doc_id
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        values: [
            entry_date, 
            firstname, 
            lastname,
            age,
            dob,
            gender,
            phone,
            email,
            address,
            weight,
            blood,
            description,
            history,
            dept,
            doctor_name,
            doctor_id
        ] 
    }

    let {rowCount} = await db.query(insertPatient);
    if (rowCount !== 1) {
        return res.status(500).json({msg: 'Failed To insert'});
    }
    res.status(200).json({ msg: 'Success' });
}

module.exports = {
    getDeptDoctors,
    getPatients,
    postPatientForm
}