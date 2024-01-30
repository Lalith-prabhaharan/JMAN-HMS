const statusCode = require('http-status-codes');

const loginUser = (req, res) => {
    res.status(statusCode.OK).json('Login Admin or doctor');
}

module.exports = { loginUser };