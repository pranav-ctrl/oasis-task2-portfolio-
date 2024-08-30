
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

// Email configuration (replace with your actual email credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
});

app.post('/contact', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Send email
  const mailOptions = {
    from: 'your_email@gmail.com', // Your email address
    to: 'recipient_email@example.com', // Recipient's email address
    subject: 'New Contact Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending message');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Message sent successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});