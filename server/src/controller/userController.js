// Administrator
const userService = require('../services/userService');

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
    const user = await userService.updateUserbyId(userId, { username, email, role });
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
    req.session.userId = user.id;
    req.session.isAuthenticated = true;
    req.session.user = user;
    res.status(200).send({ user });
  } catch (error) {
    if (error.message) return res.status(400).send(error.message);
    res.status(500).send('internal server error');
  }
};
