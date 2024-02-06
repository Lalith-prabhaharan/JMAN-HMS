const jwt = require('jsonwebtoken');
const db = require('../db/connect');

const authDoc = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(404).json({msg: 'Authentication failed'});
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        // db check
        const queryStr = {
            text: `select * from doctor where doc_id = $1 AND first_name = $2`,
            values: [payload.userId, payload.name]
        }
        const { rows, rowCount } = await db.query(queryStr);
        if (rowCount == 0) {
            return res.status(404).json({msg: 'Authentication failed'});
        }

        req.user = {userId: rows[0].doc_id, name: rows[0].first_name};
        next();
    } catch (error) {
        return res.status(404).json({msg: 'Authentication invalid'});
    }
}

module.exports = authDoc;