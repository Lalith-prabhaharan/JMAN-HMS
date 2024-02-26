const nodemailer = require("nodemailer");
const email_post = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "lalitkishorep.20cse@kongu.edu",
        pass: "9345718515",
      },
    });
    // Send the email using nodemailer

    const info = {
    //   from: req.body.from,
      from:"lalitkishorep.20cse@kongu.edu",
      to: req.body.email,
      subject:"Enrolled in Health Care",
    //   phone: req.body.phone,
    // phone:"945664332",
      html:`<p>Hi ${req.body.name},</p> <br><p> You have been appointed as doctor of ${req.body.department}  department in Health Care. </p> <br><p> Thanks and Regards, </p> <br> <p> -Admin </p> `
    };

    transporter.sendMail(info,(err,res)=>{
        console.log("Email sent successfully");
        res.json({ message: "Email sent successfully", info });
    })
    // Send a response to the client
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports={
    email_post
}