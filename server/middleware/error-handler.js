const { CustomAPIError } = require('../errors')
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ err: 'Internal server error' })
}

module.exports = errorHandlerMiddleware