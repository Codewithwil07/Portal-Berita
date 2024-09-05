const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const User = prisma.user;
const ResetPassword = prisma.passwordReset

module.exports = { User, ResetPassword };
