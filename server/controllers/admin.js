const getDeptDoctors = (req, res) => {
    console.log(req.params);
    res.status(200).json('Get Department Doctors');
}

const getPatients = (req, res) => {
    res.status(200).json({ msg: 'Get Approval of patients' });
}

const postPatientForm = (req, res) => {
    console.log(req.body);
    res.status(200).json({ msg: 'get patient form' });
}

module.exports = {
    getDeptDoctors,
    getPatients,
    postPatientForm
}