const User = require('../model/user.model');

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
  const existingUser = await User.findFirst(username, email);
  if (existingUser) throw new Error(`Username dan Email sudah ada`);

  const salt = bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await User.createUser(username, email, hashedPassword);
};

const loginUser = async (email, password) => {
  const userPassword = await User.findUnique(password);

  const comparePassword = await bcrypt.compare(userPassword, password);
  if (!comparePassword) throw new Error('Password salah');

  return User.findFirst(email, password);
};

module.exports = {
  getallUsers,
  getUserById,
  updateUserbyId,
  removeUserbyId,
  registerUser,
  loginUser,
};
