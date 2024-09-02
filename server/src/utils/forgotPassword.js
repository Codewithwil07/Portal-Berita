const nodemailer = require('nodemailer');

const pengirim = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_USER,
  },
});

const kirimEmail = async (to, subeject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subeject: subeject,
    text: text,
  };
  return kirimEmail(mailOptions);
};

module.exports = kirimEmail;
