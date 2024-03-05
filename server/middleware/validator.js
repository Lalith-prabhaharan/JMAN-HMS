const {body} = require('express-validator');
const {validationResult} = require('express-validator');

const check = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
    next();
}

const createValidator = [
    body('age', 'age must be a Number').isNumeric(),
    body('phone', 'Invalid phone').isLength({min: 10, max: 10}), 
    body('email', 'Invalid email').isEmail(),
    body('weight', 'Weight must be a Number').isNumeric(),
    check
];

module.exports = createValidator;
  