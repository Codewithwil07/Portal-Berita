const { AddArticle } = require('../services/articleService');

exports.addArticleHandler = async (req, res) => {
  const { title, content } = req.fields || {};

  const { fields } = req;
  // Handle the incoming form data, validate, and save to the database

  console.log(fields); // e.g., article title, content
  try {
    const authorId = req.session.userId;
    const article = await AddArticle({ title, content, authorId });
    return res.status(200).json(article);
  } catch (error) {
    const statusCode = ['Semua field harus terisi', 'userId invalid'].includes(
      error.message
    )
      ? 400
      : 500;
    return res.status(statusCode).send(error.message);
  }
};
