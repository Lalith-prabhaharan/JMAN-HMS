const Patient = require('../models/Patient');
const Prescription = require('../models/Prescription');



// upload prescription
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

    let date = new Date();
    var currdatetime = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(); 
    currdatetime += ' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(); 
    
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
    const patient_id=req.params.id;
    const prescription= await Prescription.findAll({
        where:{patient_id: patient_id}
    });
    if (prescription.length===0){
        return res.status(200).json({msg:"No prescription available"})
    }
    res.status(200).json(prescription);
};





module.exports = {
    uploadprescription,
    getprescription
}