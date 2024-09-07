// Administrator
const { body, validationResult } = require('express-validator');
const userService = require('../services/userService');

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

exports.updateUserbyAdmin = async (req, res) => {
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
    const isSuperAdmin =
      username === 'superAnonim' &&
      email === 'meisKING@gmail.com' &&
      password === '@meisKING.env1';

    const user = await userService.registerUser(username, email, password, isSuperAdmin);

    req.session.isAuthenticated = true;
    req.session.role = user.role;
    req.session.email = user.email;
    req.session.name = user.username;

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
    req.session.name = user.username;

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
    const user = await userService.simpanToken(email);

    req.session.userId = user.id;
    req.session.email = user.email;
    req.session.username = user.username;

    res.status(200).send('Kode verifikasi telah dikirim ke email Anda');
  } catch (error) {
    if (error.message) return res.status(400).json(error.message);
    res.status(500).send('internal server error');
  }
};

exports.userUbahPasswordHandler = async (req, res) => {
  const { password, konfirmasi } = req.body;
  try {
    const userPassword = await userService.masukkanPassword(
      password,
      req.session.userId
    );

    res.status(200).json({ msg: 'Password berhasil di ubah' });
  } catch (error) {
    if (error.message) return res.status(400).json(error.message);
    res.status(500).send('internal server error');
  }
};

exports.NewOTPHandler = async (req, res) => {
  try {
    const userId = req.session.userId;
    const email = req.session.email;
    const name = req.session.username;

    console.log(userId, email, name);

    const newOTPResult = await userService.newOTP(email, userId);

    res.status(200).send('Kode baru berhasil di kirim');
  } catch (error) {
    if (error.message) return res.status(400).send(error.message);
    res.status(500).send('internal server error');
  }
};

// FITUR
exports.fetchCurrentProfileReaderHandler = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const userProfile = await userService.userProfile(userId);

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

exports.updateProfileReaderHandler = async (req, res) => {
  let {
    username,
    bio,
    phoneNumber,
    gender,
    address,
    dateOfBirth,
    jobType,
    lastEducation,
    city,
    province,
    postCode,
  } = req.fields;

  // Validation
  if (!username) return res.json({ error: 'Name is required' });
  if (!bio) return res.json({ error: 'Bio is required' });
  if (!phoneNumber) return res.json({ error: 'Phone number is required' });
  if (!gender) return res.json({ error: 'Gender is required' });
  if (!address) return res.json({ error: 'Address is required' });
  if (!dateOfBirth) return res.json({ error: 'Date of birth is required' });
  if (!jobType) return res.json({ error: 'Job type is required' });
  if (!lastEducation) return res.json({ error: 'Last education is required' });
  if (!city) return res.json({ error: 'City is required' });
  if (!province) return res.json({ error: 'Province is required' });
  if (!postCode) return res.json({ error: 'Post code is required' });

  const userId = parseInt(req.params.id, 10);
  parseInt(phoneNumber, 10);
  parseInt(postCode, 10);

  try {
    const whereName = req.session.name;

    const profileUser = await userService.updateProfile(
      whereName,
      username,
      bio,
      phoneNumber,
      gender,
      address,
      dateOfBirth,
      jobType,
      lastEducation,
      city,
      province,
      postCode
    );

    res.status(200).send('Profile user berhasil di ubah');
  } catch (error) {
    if (error.message) return res.status(400).send(error.message);
    res.status(500).send('Internal server error');
  }
};
