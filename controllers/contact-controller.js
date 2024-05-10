const nodemailer = require('nodemailer');

// email sending can be very slow: add a: "Working on it..." toast and a "Message sent successfully"

// contact form
// needs to set up for the correct email: make new email
const handleContactForm = async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  }

  let transporter = nodemailer.createTransport(config);

  const submittedMessage = `
    <p>New Contact form submission:</p>
    <p>From: ${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Subject: ${subject}</p>
    <p>Message:</p>
    <p>${message}</p>
  `;

  let emailMessage = {
    from: email,
    to: "amithamillensuwanta@gmail.com",
    subject: subject,
    text: "New Contact form submission",
    html: submittedMessage,
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