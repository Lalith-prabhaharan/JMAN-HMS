require('dotenv').config();
const Patient = require('../models/Patient');
const { Op } = require('sequelize');
const azureStorage = require('azure-storage');
const intoStream = require('into-stream');
const path = require('path');
let { username } = require('os').userInfo();


// required variables
const dirname = path.resolve("../server");
const containerName = process.env.AZURE_CONTAINER_NAME;
const blobService = azureStorage.createBlobService(
    process.env.AZURE_STORAGE_CONNECTION_STRING
);



// render index.html
const show = (req, res) => {
    res.sendFile(path.join(dirname, "index.html"));
};


// file upload
const blobupload = async (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files are received.");
    }

    const {patient_id, doc_id} = req.body;
    console.log(patient_id, doc_id);

    const timestamp = Date.now()
    const blobName = `${timestamp}-${req.files.file.name}`;

    // here we have to add the file name in the table
    // insert (patient_id, doc_id, blobname)

    const stream = intoStream(req.files.file.data);
    const streamLength = req.files.file.data.length;

    blobService.createBlockBlobFromStream(
        containerName,
        blobName,
        stream,
        streamLength,
        (err) => {
            if (err) {
                return res.status(500).send({ message: "Error Occured" });
            }

            res.status(201).send({ message: 'File Uploaded Successfully' });
        }
    );
};


// file download
const blobdownload = (req, res) => {

    const {patient_id, doc_id, timestamp} = req.body;
    console.log(patient_id, doc_id, timestamp);

    // here we have to extract source file name from the table
    // select file_name from table where patient_id, doc_id, timestamp


    const sourcefile = "1708613140338-PROJECT_REPORT_SWE.docx";
    const destinationfilepath = path.join("C:/Users",username,"Downloads",sourcefile);
    
    blobService.getBlobToLocalFile(
        containerName, 
        sourcefile, 
        destinationfilepath, 
        (err) => {
            if (err) {
                return res.status(500).send({ message: "Error Occured" });
            }

            res.status(200).send({ message: 'File Downloaded Successfully' });
        }
    );
};








module.exports = {
    show,
    blobupload,
    blobdownload
}