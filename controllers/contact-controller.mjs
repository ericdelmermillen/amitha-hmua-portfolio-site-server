import nodemailer from 'nodemailer';

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const handleContactForm = async (req, res) => {

  const { 
    firstName, 
    lastName, 
    email, 
    subject, 
    message 
  } = req.body;

  const config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD
    }
  };

  const transporter = nodemailer.createTransport(config);

  const submittedMessage = `
    <p>New Contact form submission:</p>
    <p>From: ${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Subject: ${subject}</p>
    <p>Message:</p>
    <p>${message}</p>
  `;

  const emailMessage = {
    from: email,
    to: "amithamillensuwanta@gmail.com",
    subject: `Contact Form Submission: ${subject}`,
    text: "New Contact form submission",
    html: submittedMessage,
  };
  
  try {
    // respond before awaiting sendMail due to delay
    res.status(201).json({
      message: "Thanks! Your message to Amitha has been sent!"
    });

    return await transporter.sendMail(emailMessage);

  } catch(error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: "Failed to send email." });
  };
};

export {
  handleContactForm
};