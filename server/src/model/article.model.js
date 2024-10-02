const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Article = prisma.article;

module.exports = { Article };
