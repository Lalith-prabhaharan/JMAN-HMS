const { UnauthenticatedError, BadRequestError } = require('../errors/index');
const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const db = require('../db/connect');

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
        const queryStr = {
            text: `select * from doctor where email = $1`,
            values: [username]
        }
        const { rows, rowCount } = await db.query(queryStr);

        if (rowCount == 0 || (rowCount > 0 && rows[0].password !== password)) {
            return res.status(200).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign({ userId: rows[0].doc_id, name: rows[0].first_name }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token });
    }
}

module.exports = { loginUser };