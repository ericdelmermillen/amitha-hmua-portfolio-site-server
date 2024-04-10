const nodemailer = require('nodemailer');

// contact form
// not forwarding email: needs to set up for the correct email anyway: make new email
const handleContactForm = async (req, res) => {
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

  try {
    let info = await transporter.sendMail(emailMessage);
    console.log('Email sent:', info.response);
    return res.status(201).json({
      message: "Thanks! Your message to Amitha has been sent!"
    });
  } catch(error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: "Failed to send email." });
  }
};


module.exports = {
  handleContactForm
};