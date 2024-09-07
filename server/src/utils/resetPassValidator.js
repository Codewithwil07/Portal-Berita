const { body, validationResult } = require('express-validator');

const validPass = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password harus memiliki panjang minimal 8 karakter')
    .matches(/\d/)
    .withMessage('Password harus mengandung setidaknya satu angka')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password harus mengandung setidaknya satu karakter khusus')
    .trim(),

  body('konfirmasi').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true
  }),

  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() }); //Belum Ngerti
    }
    next();
  },
];

module.exports = validPass;
