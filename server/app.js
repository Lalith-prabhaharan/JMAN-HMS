require('dotenv').config();
require('express-async-errors');
const cors=require('cors');
const express = require('express');
const app = express();

const db = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const doctor = require('./routes/doctor');

//routes
app.use(cors());
app.options("*",cors());
app.use('/api/v1/auth', auth);
app.use('/api/v1/admin', admin);
app.use('/api/v1/doctor', doctor);

//error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000;

const start = async() => {
    try {
        //
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();