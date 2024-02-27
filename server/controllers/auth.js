const { UnauthenticatedError, BadRequestError } = require('../errors/index');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');



// authentication
const loginUser = async(req, res) => {
    const { username, password, type } = req.body;

    if (type==="") {
        return res.status(200).json({msg: 'select'});
    }

    //Admin Login
    if (type === 'admin') {
        if (username !== 'root' || password !== '123') {
            return res.status(200).json({msg: 'Invalid credentials'});
        }
        const token = jwt.sign({ name: username }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token});
    }

    //Doctor login
    else {
        const doctor = await Doctor.findAll({
            where: {email: username},
        });

        if (doctor.length == 0 || (doctor.length > 0 && !await bcrypt.compare(password, doctor[0].password))) {
            return res.status(200).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign({ userId: doctor[0].doc_id, name: doctor[0].first_name }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token });
    }
}



module.exports = { loginUser };