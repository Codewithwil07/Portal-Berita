const { User, ResetPassword } = require('../model/user.model');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/email');
const { format } = require('date-fns');

// Administrator
const createUser = async (username, email, password, role) => {
  try {
    const [existingUser, existingEmail] = await Promise.all([
      User.findUnique({ where: { username: username } }),
      User.findUnique({ where: { email: email } }),
    ]);

    if (existingUser) {
      throw new Error('username sudah ada');
    }

    if (existingEmail) {
      throw new Error('Email sudah ada');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      data: {
        username: username,
        email: email,
        passwordHash: hashedPassword,
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

    const offsetPage = (page - 1) * perPage;
    const endIndex = offsetPage + perPage;

    const users = await User.findMany({
      skip: offsetPage,
      take: perPage,
      where: { role: { not: 'SUPER_ADMIN' } },
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
  const filters = User.findMany({
    where: {
      AND: [
        { role: role || undefined },
        { role: { notIn: ['SUPER_ADMIN', 'ADMIN'] } },
      ],
      subscriptionId: parseInt(subsId, 10) || null,
    },
  });
  return filters;
};

const updateUserbyId = async (userId, data) => {
  try {
    if (data === undefined) throw new Error('Form tidak boleh kosong');

    const [existingUser, existingEmail, validasiId] = await Promise.all([
      User.findUnique({ where: { username: data.username } }),
      User.findUnique({ where: { email: data.email } }),
      User.findUnique({ where: { id: userId } }),
    ]);

    if (existingUser) {
      throw new Error('Username sudah ada');
    }
    if (existingEmail) {
      throw new Error('Email sudah ada');
    }
    if (!validasiId) throw new Error('User tidak di temukan');

    const userUpdated = await User.update({
      where: { id: userId },
      data: data,
    });

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
    const [existingUser, existingEmail] = await Promise.all([
      User.findUnique({ where: { username } }),
      User.findUnique({ where: { email } }),
    ]);

    if (existingUser) {
      throw new Error('Username sudah ada');
    }
    if (existingEmail) {
      throw new Error('Email sudah ada');
    }

    const isSuperAdmin =
      username === 'superAnonim' &&
      email === 'meisKING@gmail.com' &&
      password === '@meisKING.env1';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(isSuperAdmin);

    const newUser = await User.create({
      data: {
        username: username,
        email: email,
        passwordHash: hashedPassword,
        role: isSuperAdmin ? 'SUPER_ADMIN' : 'READER',
      },
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
          token: token,
          expiresAt: newDate,
          user: {
            connect: { id: user.id },
          },
        },
      });
    }

    const subject = `Lupa Password`;
    const text = `<p>Kode OTP anda adalah <b>${token}</b></p>`;
    await sendEmail(email, subject, text)
      .then((response) => console.log('Email sent: ', response))
      .catch((err) => console.error(err.message));

    return user;
  } catch (error) {
    throw error;
  }
};

const masukkanPassword = async (password, id) => {
  try {
    const newPassword = await bcrypt.hash(password, 10);

    const userPassword = await User.update({
      where: { id: id },
      data: { passwordHash: newPassword },
    });

    return userPassword;
  } catch (error) {
    throw error;
  }
};

const newOTP = async (email, userId, name) => {
  try {
    const token = Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    const newDate = new Date(date.getTime() + 1 * 60 * 1000);

    const oldToken = await ResetPassword.findFirst({
      where: { userId: userId },
    });

    if (!oldToken) throw new Error('User not found');

    let updateOTPonDatabase;

    if (oldToken) {
      updateOTPonDatabase = await ResetPassword.update({
        where: { id: oldToken.id },
        data: {
          token: token,
          expiresAt: newDate,
          user: {
            connect: { id: userId },
          },
        },
      });
    }

    const subject = `Lupa Password`;
    const text = `<p>Kode OTP anda adalah <b>${token}</b></p>`;
    await sendEmail(email, subject, text)
      .then((response) => console.log('Email sent: ', response))
      .catch((err) => console.error(err.message));

    return updateOTPonDatabase;
  } catch (error) {
    throw error;
  }
};

//fitur
const userProfile = async (userid) => {
  if (!userid) throw new Error('UserId is required');

  const user = await User.findFirst({ where: { id: userid } });
  if (!user) throw new Error('User not found');
  return user;
};

const updateProfile = async (
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
) => {
  let parseDate = format(
    new Date(`${dateOfBirth}:00:00:00`),
    "yyyy-MM-dd'T'HH:mm:ss'Z'"
  );

  const updateUser = await User.update({
    where: { username: whereName },
    data: {
      username: username,
      bio: bio,
      phoneNumber: phoneNumber,
      gender: gender,
      address: address,
      dateOfBirth: parseDate,
      jobType: jobType,
      lastEducation: lastEducation,
      province: province,
      city: city,
      postalCode: postCode,
      city: city,
    },
  })
    .then(() => {
      (d) => console.log(d);
    })
    .catch((err) => console.log(err.message));

  return updateUser;
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
  updateProfile,
  userProfile,
};
