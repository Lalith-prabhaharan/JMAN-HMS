const { CustomAPIError } = require('../errors')
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
<<<<<<< HEAD
    return res.status(500).json({ err: 'Internal server error' })
=======
    return res.status(500).json({ err: err.message })
>>>>>>> 4f0e9b14f1c080987395267009dcbd28a2127299
}

module.exports = errorHandlerMiddleware