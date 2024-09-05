// Administrator
const { body, validationResult } = require('express-validator');
const userService = require('../services/userService');
const { User } = require('../model/user.model');

exports.createuserHandler = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const newUser = await userService.createUser(
      username,
      email,
      password,
      role
    );
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
      return res.status(400).send(error.message);
    }
    res.status(500).send('Internal Server');
  }
};

exports.searchUserByNameandEmailHandler = async (req, res) => {
  const { search } = req.query;
  try {
    const searchResult = await userService.searchUser(search);

    if (searchResult.length < 1) return res.status(404).send('User not found');

    res.status(200).json({ result: searchResult });
  } catch (error) {
    res.status(500).send('Internal Server');
  }
};

exports.filterUserHandler = async (req, res) => {
  const { role, subsId } = req.query;
  try {
    const filters = await userService.filterUser(role, subsId);

    if (filters.length < 1) return res.status(400).send('user not found');

    res.status(200).json({ result: filters });
  } catch (error) {
    res.status(500).send('Internal Server Error');
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
      return res.status(400).send(error.message);
    }
    res.status(500).send('Internal Server');
  }
};

exports.removeUserbyIdHandler = async (req, res) => {
  const { userId } = req.params;
  const parseIntuserId = parseInt(userId, 10);
  try {
    await userService.removeUserbyId(parseIntuserId);
    res.status(204).json({ message: 'User di hapus' });
  } catch (error) {
    if (error.message) {
      return res.status(400).send(error.message);
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
      return res.status(400).send(error.message);
    }
    res.status(500).send('Internal Server');
  }
};

exports.loginUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);

    req.session.isAuthenticated = true;
    req.session.role = user.role;
    req.session.email = user.email;
    req.session.id = user.id;

    res.status(200).send({ message: 'User berhasil login' });
  } catch (error) {
    if (error.message) return res.status(400).send(error.message);
    res.status(500).send('internal server error');
  }
};

exports.userMasukkanEmailHandler = async (req, res) => {
  const { email } = req.body;
  body('email')
    .isEmail()
    .withMessage('Email tidak valid')
    .matches(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|icloud|hotmail)\.com$/)
    .withMessage('Format email tidak valid')
    .trim()
    .escape();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userEmail = await userService.simpanToken(email);

    req.session.id = userEmail.id;

    res.status(200).send('Kode verifikasi telah dikirim ke email Anda');
  } catch (error) {
    if (error.message) return res.status(400).json(error.message);
    res.status(500).send('internal server error');
  }
};

exports.userUbahPasswordHandler = async (req, res) => {
  const { password, confPassword } = req.body;
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password harus memiliki panjang minimal 8 karakter')
    .matches(/\d/)
    .withMessage('Password harus mengandung setidaknya satu angka')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password harus mengandung setidaknya satu karakter khusus')
    .trim();

  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(400).json({ errors: error.array() });

  try {
    const userPassword = await userService.masukkanPassword(
      password,
      confPassword,
      req.session.id
    );

    res.status(200).json({ messgae: 'Password berhasil di ubah' });
  } catch (error) {
    if (error.message) return res.status(400).json(error.message);
    res.status(500).send('internal server error');
  }
};

exports.NewOTPHandler = async (req, res) => {
  try {
    const email = req.session.email;
    const id = req.session.id;

    const newOTP = await newOTP(email, id);

    res.status(200).send('Kode baru berhasil di kirim');
  } catch (error) {
    res.status(500).send('internal server error');
  }
};
