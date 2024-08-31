const User = require('../model/user.model');
const bcrypt = require('bcrypt');

// Administrator
const fetchUsers = async (page, perPage) => {
  try {
    page = parseInt(page, 10) || 1;
    perPage = parseInt(perPage, 10) || 10;

    const offsetPage = (page - 1) * perPage;

    const users = await User.findMany({
      skip: offsetPage,
      take: perPage,
    });

    if (!users) throw new Error('Pengguna tidak ada');

    const totalUsers = await User.count();
    const totalPages = Math.ceil(totalUsers / perPage);

    return { users, totalPages, totalUsers };
  } catch (error) {
    throw error;
  }
};

const updateUserbyId = async (userId, data) => {
  try {
    const userUpdated = await User.update({
      where: { id: userId },
      data: data,
    });
    if (!userUpdated) throw new Error('User tidak ada');

    if (userUpdated) {
      userUpdated.username = data.username;
      userUpdated.email = data.email;
    }

    return userUpdated;
  } catch (error) {
    throw error;
  }
};

const removeUserbyId = async (userId) => {
  try {
    const removeUser = await User.delete({ where: { id: userId } });
    if (!removeUser) throw new Error('User tidak ada');

    return removeUser;
  } catch (error) {
    throw Error;
  }
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
  fetchUsers,
  updateUserbyId,
  removeUserbyId,
  registerUser,
};
