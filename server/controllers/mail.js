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
      from: "lalitkishorep.20cse@kongu.edu",
      to: req.body.email,
      subject: "Enrolled in Health Care",
      //   phone: req.body.phone,
      // phone:"945664332",
      // html: `<p>Hi ${req.body.name},</p> <br><p> You have been appointed as doctor of ${req.body.department}  department in Health Care. </p> <br><p> Thanks and Regards, </p> <br> <p> -Admin </p> `
      html:
            `<body style="background-color:grey"> 
            <table align="center" border="0" cellpadding="0" cellspacing="0"
                  width="550" bgcolor="white" style="border:2px solid black"> 
                <tbody> 
                    <tr> 
                        <td align="center"> 
                            <table align="center" border="0" cellpadding="0"
                                  cellspacing="0" class="col-550" width="550"> 
                                <tbody> 
                                    <tr> 
                                        <td align="center" style="background-color: #4cb96b; 
                                                  height: 50px;"> 
          
                                            <a href="#" style="text-decoration: none;"> 
                                                <p style="color:white; 
                                                          font-weight:bold;"> 
                                                          <a href="#" 
                                                          style="border:none; 
                                                                text-decoration: none;  
                                                                padding: 5px;">  
                                                                  
                                                          <img height="60" 
                                                          src= "https://logo.com/image-cdn/images/kts928pd/production/acf71dc493554cc492578b8b5b8beb4ee20e8873-731x731.png?w=1080&q=72" 
                                                          width="60" />  
                                                          </a>  
                                                    <h2>Health Care</h2> 
                                                </p> 
                                            </a> 
                                        </td> 
                                    </tr> 
                                </tbody> 
                            </table> 
                        </td> 
                    </tr> 
                    <tr style="height: 300px;"> 
                        <td align="center" style="border: none; 
                                  border-bottom: 2px solid #4cb96b;  
                                  padding-right: 20px;padding-left:20px"> 
          
                            <p style="font-weight: bolder;font-size: 42px; 
                                      letter-spacing: 0.025em; 
                                      color:black;"> 
                                Hello Doctor! 
                                <br> Check out your position in Health Care 
                            </p> 
                        </td> 
                    </tr> 
          
                    <tr style="display: inline-block;"> 
                        <td style="height: 150px; 
                                  padding: 20px; 
                                  border: none;  
                                  border-bottom: 2px solid #361B0E; 
                                  background-color: white;"> 
                            
                            <h2 style="text-align: left; 
                                      align-items: center; color:purple ">
                                Hii ${req.body.name}, You have been appointed in 
                                ${req.body.department} department of Health Care. Hope you
                                provide service to all the patients with good care.
                            </h2> 
                        </td> 
                    </tr> 
                    <tr style="border: none;  
                    background-color: #4cb96b;  
                    height: 40px;  
                    color:white;  
                    padding-bottom: 20px;  
                    text-align: center;"> 
                          
        <td height="40px" align="center"> 
            <a href="#" 
            style="border:none; 
                  text-decoration: none;  
                  padding: 5px;">  
                    
            <img height="60" 
            src= "https://logo.com/image-cdn/images/kts928pd/production/acf71dc493554cc492578b8b5b8beb4ee20e8873-731x731.png?w=1080&q=72" 
            width="60" />  
            </a>  
            <p style="color:white;  
            line-height: 1.5em;"> 
            Health Care
            </p> 
            <a href="#" 
            style="border:none; 
                  text-decoration: none;  
                  padding: 5px;">  
                    
            <img height="30" 
            src= 
        "https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-twitter_20190610074030.png" 
            width="30" />  
            </a>  
              
            <a href="#"
            style="border:none; 
            text-decoration: none;  
            padding: 5px;">                
            <img height="20"
            src= 
        "https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/facebook-letter-logo_20190610100050.png" 
                width="24" 
                style="position: relative;  
                      padding-bottom: 5px;" /> 
            </a> 
        </td> 
        </tr> 
        <tr> 
        <td style="font-family:'Open Sans', Arial, sans-serif; 
                  font-size:11px; line-height:18px;  
                  color:#999999;"  
            valign="top"
            align="center"> 
        <a href="#"
          target="_blank" 
          style="color:#999999;  
                  text-decoration:underline;">PRIVACY STATEMENT</a>  
                  | <a href="#" target="_blank" 
                  style="color:#999999; text-decoration:underline;">TERMS OF SERVICE</a>  
                  | <a href="#"
                  target="_blank" 
                  style="color:#999999; text-decoration:underline;">RETURNS</a><br> 
                          © 2024 Health Care. All Rights Reserved.<br> 
                          If you do not wish to receive any further  
                          emails from us, please 
                          <a href="#"
                          target="_blank"
                          style="text-decoration:none;  
                                color:#999999;">unsubscribe</a> 
                    </td> 
                      </tr> 
                    </tbody></table></td> 
                </tr> 
                <tr> 
                  <td class="em_hide"
                  style="line-height:1px; 
                        min-width:700px; 
                        background-color:#ffffff;"> 
                      <img alt="" 
                      src="images/spacer.gif" 
                      style="max-height:1px;  
                      min-height:1px;  
                      display:block;  
                      width:700px;  
                      min-width:700px;"  
                      width="700"
                      border="0" 
                      height="1"> 
                      </td> 
                </tr> 
                </tbody> 
            </table> 
        </body> `
    };

    transporter.sendMail(info, (err, res) => {
      // console.log("Email sent successfully");
      res.json({ message: "Email sent successfully", info });
    })
    // Send a response to the client
  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  email_post
}