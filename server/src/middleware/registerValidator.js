const { body, validationResult } = require('express-validator');

const registervalidator = [
  body('name')
    .isLength({ min: 1 })
    .withMessage('Nama tidak boleh kosong')
    .trim()
    .escape(),
  body('email').isEmail().withMessage('Email tidak valid').trim().escape(),
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
      return res.status(400).json({ error: err.array() });
    }
    next();
  },
];

module.exports = registervalidator;
