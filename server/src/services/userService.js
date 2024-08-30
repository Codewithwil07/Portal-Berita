const User = require('../model/user.model');
const bcrypt = require('bcrypt');

// Administrator
const getallUsers = async (name, email, pasword) => {
  return await User.findFirst(name, email, pasword);
};

const getUserById = (user) => {
  return;
};
const updateUserbyId = (user) => {
  return;
};
const removeUserbyId = (user) => {
  return;
};

// Auth
const registerUser = async (username, email, password) => {
  try {
    const existingUser = await User.findUnique({ where: { username } });
    if (existingUser) {
      throw new Error('Username sudah ada');
    }

    const existingEmail = await User.findUnique({ where: { email } });
    if (existingEmail) {
      throw new Error('Email sudah ada');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      data: { username: username, email: email, password: hashedPassword },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getallUsers,
  getUserById,
  updateUserbyId,
  removeUserbyId,
  registerUser,
};
