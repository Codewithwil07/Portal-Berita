// Administrator
const userService = require('../services/userService');

exports.getallUserHandler = async (req, res) => {
  try {
    const users = await userService.getallUsers();
    res.status(200).send(users);
  } catch (error) {
    console.error(error.message);
    res.send(500).send(error.message);
  }
};

exports.getUserByIdHandler = (req, res) => {
  res.send('By Id');
};

exports.updateUserbyIdHandler = (req, res) => {
  res.send('update User byId');
};
exports.removeUserbyIdHandler = (req, res) => {
  res.send('remove User by Id');
};

// Auth
exports.registerUserHandler = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userService.registerUser(username, email, password);
    res.status(201).send(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
    res.status(500).send('internal server error');
  }
};

// exports.loginUserHandler = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userService.loginUser(email, password);
//     res.status(200).send(user);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('internal server error');
//   }
// };
