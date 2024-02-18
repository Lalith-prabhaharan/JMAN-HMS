const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const authDoc = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(404).json({msg: 'Authentication failed'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        // db check
        const doctor = await Doctor.findAll({
            where: {
                doc_id: payload.userId,
                first_name: payload.name,
            }
        });

        if (doctor.length === 0) {
            return res.status(404).json({msg: 'Authentication failed'});
        }

        req.user = {userId: doctor[0].doc_id, name: doctor[0].first_name};
        next();
    } catch (error) {
        return res.status(404).json({msg: 'Authentication invalid'});
    }
}

module.exports = authDoc;