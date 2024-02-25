const nodemailer = require('nodemailer');


// contact route
// not forwarding email: needs to set up for the correct email anyway: make new email
const handleContactForm = (req, res) => {
  const { email, subject, message } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  }

  let transporter = nodemailer.createTransport(config);

  let emailMessage = {
    from: email,
    to: "amithamillensuwanta@gmail.com",
    subject: subject,
    text: message,
    html: message,
  };

  transporter.sendMail(emailMessage, (error, info) => {
    if(error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log('Email sent:', info.response);
      return res.status(201).json({
        message: "Thanks! Your message to Amitha has been sent!"
      });
    }
  });
};


module.exports = {
  handleContactForm
};