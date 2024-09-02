// Administrator
const User = require('../model/user.model');
const userService = require('../services/userService');
const kirimEmail = require('../utils/forgotPassword');

exports.createuserHandler = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await userService.createUser(username, email, password);
    res.status(201).send(newUser);
  } catch (error) {
    if (error.message) return res.status(400).send(error.message);
    res.status(400).send('internal Server Error');
  }
};

exports.fetchUserHandler = async (req, res) => {
  const { page, perPage } = req.query;
  try {
    const { users, totalPages, totalUsers } = await userService.fetchUsers(
      page,
      perPage
    );
    res.status(200).send({
      users,
      currentPage: perPage,
      perPage: perPage,
      totalPages: totalPages,
      totalUsers: totalUsers,
    });
  } catch (error) {
    if (error.message) {
      res.status(400).send(error.message);
    }
    res.status(500).send('Internal Server');
  }
};

exports.updateUserbyIdHandler = async (req, res) => {
  const { username, email, role } = req.body;
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.updateUserbyId(userId, {
      username,
      email,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    if (error.message) {
      res.status(400).send(error.message);
    }
    res.status(500).send('Internal Server');
  }
};

exports.removeUserbyIdHandler = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  try {
    await userService.removeUserbyId(userId);
    res.status(204).json({ message: 'User di hapus' });
  } catch (error) {
    if (error.message) {
      res.status(400).send(error.message);
    }
    res.status(500).send('Internal Server');
  }
};

// Auth
exports.registerUserHandler = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userService.registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    if (error.message) {
      res.status(400).send(error.message);
    }
    res.status(500).send('Internal Server');
  }
};

exports.loginUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);

    req.session.isAuthenticated = true;
    req.session.user = user.role;

    res.status(200).send({ user });
  } catch (error) {
    if (error.message) return res.status(400).send(error.message);
    res.status(500).send('internal server error');
  }
};

const resetToken = {};
exports.userMasukkanEMailHandler = async (req, res) => {
  const { email } = req.body;
  body('email')
    .isEmail()
    .withMessage('Email tidak valid')
    .matches(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|icloud|hotmail)\.com$/)
    .withMessage('Format email tidak valid')
    .trim()
    .escape();

  if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });
  try {
    const userEmail = await userService.userMasukkanEMail(email);

    const token = crypto.randomBytes(20).toString('hex'); // Belum ngerti
    resetToken[email] = token;

    const pesan = `Kode verifikasi anda adalah ${token}`;
    await kirimEmail(email, 'Lupa Password', pesan);

    res.status(200).send('Kode verifikasi telah dikirim ke email Anda');
  } catch (error) {
    if (error.message) return res.status(400).json(error.message);
  }
};

exports.userUbahPasswordHandler = async () => {};
