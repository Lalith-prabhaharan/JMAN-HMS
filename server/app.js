require('dotenv').config();
require('express-async-errors');
const cors=require('cors');
const express = require('express');
const app = express();

const {sequelize} = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());
// extra package
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const doctor = require('./routes/doctor');
const prescription = require('./routes/prescription');
const authDoc = require('./middleware/authDoctor');
const authAdmin = require('./middleware/authAdmin');





// extra things for file upload on azure ////////

// const filestore = require('./routes/filehandle');
// const fileUpload = require('express-fileupload');

// app.use( fileUpload({createParentPath: true})  );

//////////////////////////////////////////////////




//routes
app.use(cors());
app.options("*",cors());
app.use('/api/v1/auth', auth);
app.use('/api/v1/admin', admin);
app.use('/api/v1/doctor', authDoc, doctor);
app.use('/api/v1/prescription', prescription);


////////////// test /////////////////////////////////
// app.use("/filetest", filestore);
/////////////////////////////////////////////////////



//error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 7001;



const start = async() => {
    try {
        await sequelize.authenticate();
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();