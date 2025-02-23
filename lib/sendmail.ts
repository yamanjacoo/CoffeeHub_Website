
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, SendGrid, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

export async function sendEmail(to: string, subject: string, text: string, attachment?: { filename: string, content: string }) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient address
    subject, // Email subject
    text, // Plain text body
    attachments: attachment ? [attachment] : [], // Attach the XML file
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('⚠️ Error sending email:', error);
    throw error;
  }
}