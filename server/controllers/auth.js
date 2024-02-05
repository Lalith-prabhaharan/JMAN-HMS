const { UnauthenticatedError, BadRequestError } = require('../errors/index');
const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const db = require('../db/connect');

const loginUser = async(req, res) => {
    const { username, password, type } = req.body;

    if (!type) {
        return res.status(200).json({ msg: 'select'});
    }

    //Admin Login
    if (type === 'admin') {
        if (username != 'root' || password != '123') {
            throw new UnauthenticatedError('Invalid credentials');
        }
        const token = jwt.sign({ name: username }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token});
    }

    //Doctor login
    else {
        const queryStr = {
            text: `select * from doctor where username = $1`,
            values: [username]
        }
        const { rows, rowCount } = await db.query(queryStr);

        if (rowCount == 0 || (rowCount > 0 && rows[0].password !== password)) {
            // throw new UnauthenticatedError('Invalid credentials');
            return res.status(200).json({ msg: 'failed'});
        }

        const token = jwt.sign({ userId: rows[0].id, name: rows[0].username }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token });
    }
}

module.exports = { loginUser };