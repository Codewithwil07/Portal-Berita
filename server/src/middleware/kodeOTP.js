const { ResetPassword } = require('../model/user.model');

const cekKodeOTP = async (req, res, next) => {
  const { kodeOTP } = req.body;
  try {
    const existingToken = await ResetPassword.findUnique({
      where: { token: kodeOTP },
    });
    if (!existingToken) return res.status(403).send('Token Salah');

    res.status(200).send('Lanjut ke Halama reset password');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = cekKodeOTP;
