const { UnauthenticatedError, BadRequestError } = require('../errors/index');
const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const db = require('../db/connect');
const Doctor = require('../models/Doctor');

const loginUser = async(req, res) => {
    const { username, password, type } = req.body;

    if (!type) {
        return res.status(400).json({msg: 'Please select type of user'});
    }

    //Admin Login
    if (type === 'admin') {
        if (username !== 'root' || password !== '123') {
            return res.status(404).json({msg: 'Invalid credentials'});
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

        if (doctor.length == 0 || (doctor.length > 0 && doctor[0].password !== password)) {
            return res.status(404).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign({ userId: doctor[0].doc_id, name: doctor[0].first_name }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token });
    }
}

module.exports = { loginUser };