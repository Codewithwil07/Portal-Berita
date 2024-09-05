const { User, ResetPassword } = require('../model/user.model');
const bcrypt = require('bcrypt');

// Administrator
const createUser = async (username, email, password, role) => {
  try {
    const existingUser = await User.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      throw new Error('username sudah ada');
    }

    const existingEmail = await User.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      throw new Error('Email sudah ada');
    }

    const user = await User.create({
      data: {
        username: username,
        email: email,
        passwordHash: password,
        role: role,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

const fetchUsers = async (page, perPage) => {
  try {
    page = parseInt(page, 10) || 1;
    perPage = parseInt(perPage, 10) || 10;

    const isAdmin = 'ADMIN';

    const offsetPage = (page - 1) * perPage;
    const endIndex = offsetPage + perPage;

    const users = await User.findMany({
      skip: offsetPage,
      take: perPage,
      where: { role: { notIn: isAdmin } },
    });

    const totalUsers = await User.count();

    const totalPages = Math.ceil(totalUsers / perPage);
    if (page > totalPages || page < 1) throw new Error('Halaman Tidak Valid');

    const usersForPage = users.slice(offsetPage, endIndex);
    if (usersForPage.length === 0) throw new Error('Daftar penggguna kosong');

    return { users, totalPages, totalUsers };
  } catch (error) {
    throw error;
  }
};

const searchUser = (search) => {
  const users = User.findMany({
    where: {
      OR: [{ username: { contains: search } }, { email: { contains: search } }],
    },
  });
  return users;
};

const filterUser = (role, subsId) => {
  console.log(role);

  const filters = User.findMany({
    where: {
      AND: [{ role: role || undefined }, { role: { notIn: ['ADMIN'] } }],
      subscriptionId: parseInt(subsId, 10) || null,
    },
  });
  return filters;
};

const updateUserbyId = async (userId, data) => {
  const username = data.username;
  const email = data.email;
  try {
    if (!username || !email) throw new Error('Form tidak boleh kosong');

    const existingUser = await User.findUnique({ where: { username } });
    if (existingUser) {
      throw new Error('Username sudah ada');
    }

    const existingEmail = await User.findUnique({ where: { email } });
    if (existingEmail) {
      throw new Error('Email sudah ada');
    }

    const validasiId = await User.findUnique({ where: { id: userId } });
    if (!validasiId) throw new Error('User tidak ada');

    const userUpdated = await User.update({
      where: { id: userId },
      data: data,
    });

    if (userUpdated) {
      userUpdated.username = data.username;
      userUpdated.email = data.email;
      userUpdated.role = data.role;
    }

    return userUpdated;
  } catch (error) {
    throw error;
  }
};

const removeUserbyId = async (userId) => {
  try {
    const cekId = await User.findUnique({ where: { id: userId } });
    if (!cekId) throw new Error('User tidak ada');

    const removeUser = await User.delete({ where: { id: userId } });
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
      data: { username: username, email: email, passwordHash: hashedPassword },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findUnique({ where: { email } });
    if (!user) throw new Error('Email anda  tidak cocok');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error('Password anda Salah');

    return user;
  } catch (error) {
    throw error;
  }
};

const simpanToken = async (email) => {
  try {
    const user = await User.findUnique({ where: { email: email } });

    if (!user) throw new Error('Email tidak ditemukan');

    const date = new Date();
    const newDate = new Date(date.getTime() + 1 * 60 * 1000);

    let token = Math.floor(1000 + Math.random() * 9000);

    if (user) {
      const saveOTPtoDatabase = await ResetPassword.create({
        data: {
          token: token.toString(),
          expiresAt: newDate,
          user: {
            connect: { id: user.id },
          },
        },
      });
    }

    console.alert(`Kode OTP anda adalah {token}`);

    return user;
  } catch (error) {
    throw error;
  }
};

const masukkanPassword = async (password, confPassword, id) => {
  try {
    let newPassword = password === confPassword;

    if (!newPassword) new Error('password Tidak cocok');

    newPassword = await bcrypt.hash(password, 10);

    const userPassword = await User.update({
      where: { id: id },
      data: { passwordHash: newPassword },
    });

    return userPassword;
  } catch (error) {
    throw error;
  }
};

const newOTP = async (email, id) => {
  token = Math.floor(1000 + Math.random() * 9000);
  const date = new Date();
  const newDate = new Date(date.getTime() + 1 * 60 * 1000);

  if (email) {
    const updateOTPonDatabase = await ResetPassword.update({
      where: { userId: id },
      data: {
        token: token.toString(),
        expiresAt: newDate,
        user: {
          connect: { id: id },
        },
      },
    });
  }

  const subject = `Lupa Password`;
  const text = `Kode verifikasi anda adalah ${token}`;
  await kirimEmail(email, subject, text);
};

module.exports = {
  createUser,
  fetchUsers,
  searchUser,
  filterUser,
  updateUserbyId,
  removeUserbyId,
  registerUser,
  loginUser,
  simpanToken,
  masukkanPassword,
  newOTP,
};
