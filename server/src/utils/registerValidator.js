const { body, validationResult } = require('express-validator');

const registervalidator = [
  body('username')
    .isLength({ min: 1 })
    .withMessage('Nama tidak boleh kosong')
    .trim()
    .escape(),

  body('email')
    .isEmail()
    .withMessage('Email tidak valid')
    .matches(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|icloud|hotmail)\.com$/)
    .withMessage('Format email tidak valid')
    .trim()
    .escape(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password harus memiliki panjang minimal 8 karakter')
    .matches(/\d/)
    .withMessage('Password harus mengandung setidaknya satu angka')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password harus mengandung setidaknya satu karakter khusus')
    .trim(),

  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() }); //Belum Ngerti
    }
    next();
  },
];

module.exports = registervalidator;
