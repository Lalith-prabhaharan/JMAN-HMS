const jwt = require('jsonwebtoken');
const db = require('../db/connect');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(404).json({msg: 'Authentication failed'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userId, name: payload.name};
        next();
    } catch (error) {
        return res.status(404).json({msg: 'Authentication invalid'});
    }
}

module.exports = auth;