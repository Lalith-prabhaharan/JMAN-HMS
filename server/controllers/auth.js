const { UnauthenticatedError, BadRequestError } = require('../errors/index');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const otps = {};

// authentication
const loginUser = async(req, res) => {
    const { username, password, type } = req.body;

    if (type==="") {
        return res.status(200).json({msg: 'select'});
    }

    //Admin Login
    if (type === 'admin') {
        if (username !== 'root' || password !== '123') {
            return res.status(200).json({msg: 'Invalid credentials'});
        }
        const token = jwt.sign({ name: username }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token});
    }

    //Doctor login
    else {
        const doctor = await Doctor.findAll({
            where: {email: username},
        });

        if (doctor.length == 0 || (doctor.length > 0 && !await bcrypt.compare(password, doctor[0].password))) {
            return res.status(200).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign({ userId: doctor[0].doc_id, name: doctor[0].first_name }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        return res.status(200).json({ msg: 'success', token });
    }
}

const forgetPass = async(req,res) =>{
    const { email } = req.body;
    const doctor = await Doctor.findOne({
        where: { email: email }
    });

    if (!doctor) {
        return res.status(404 ).json({msg: 'Doctor not found with this email'});
    }
    const randomCode = Math.floor(1000 + Math.random() * 9000);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "sait20333.cs@rmkec.ac.in",
          pass: "Sai@2003",
        },
      });
    const mailOptions = {
        from: "sait20333.cs@rmkec.ac.in",
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${randomCode}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return res.status(500).json({msg: 'Error sending email'});
        } else {
            console.log('Email sent: ' + info.response);
            otps[email]= String (randomCode);
            return res.status(200).json({msg: 'success'});
        }
    });
}

const otpVerify = async(req,res) =>{
    const { email,otp } = req.body;
    const storedOTP = otps[email]; 
    if (!storedOTP) {
        return res.status(400).json({ msg: 'OTP not found or expired' });
    }

    if (otp !== storedOTP) {
        return res.status(400).json({ msg: 'Invalid OTP' });
    }
    return res.status(200).json({msg: 'success'});
}

const resetPass = async(req,res)=>{
    const {email,pass}=req.body;
    const user = await Doctor.findOne({ where: { email } });
    
    if (!user) {
        return res.status(404).json({msg: 'Doctor not found with this email'});
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    await user.update({ password: hashedPassword });
    if(bcrypt.compare(pass, hashedPassword)){
        return res.status(200).json({msg: 'success password'});
    }
    else{
        return res.status(400).json({ message: 'Invalid pass' });
    }
}



module.exports = { loginUser, forgetPass, resetPass, otpVerify };