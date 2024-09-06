const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'garudawinnicode@gmail.com',
    pass: 'klmszcedrjtcwhpk', // Gunakan App Password jika menggunakan 2FA
  },
});

async function sendMail(to, subject, content) {
  try {
    const mailOptions = {
      from: 'garudawinnicode@gmail.com',
      to: to,
      subject: subject,
      html: content,
    };

    const message = await transporter.sendMail(mailOptions);

    return message;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = sendMail;
