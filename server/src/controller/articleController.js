const { AddArticle, ArticleList } = require('../services/articleService');

exports.addArticleHandler = async (req, res) => {
  try {
    // Mengambil fields dari request
    const { title, content } = req.fields || {};

    // Validasi input di level controller
    if (!title || !content) {
      return res.status(400).json({ message: 'Semua field harus terisi' });
    }

    // Validasi session untuk memastikan user sudah login
    const authorId = req.session?.userId; // Pastikan userId berasal dari session

    console.log(authorId);

    if (!authorId) {
      return res
        .status(400)
        .json({ message: 'User tidak ditemukan atau tidak valid' });
    }

    // Panggil service untuk membuat artikel
    const article = await AddArticle(title, content, authorId);

    // Kirim respons sukses jika berhasil membuat artikel
    return res.status(201).json(article);
  } catch (error) {
    // Log error untuk debugging dan kirim respons ke client
    console.error('Error creating article:', error.message);
    return res
      .status(500)
      .json({ message: error.message || 'Terjadi kesalahan pada server' });
  }
};

exports.articleListHandler = async (req, res) => {
  const { page, perPage } = req.query;
  try {
    const { articles, totalPages, totalArticles } = await ArticleList(
      page,
      perPage
    );
    return res.status(200).json({
      articles,
      currentPage: page,
      perPage: perPage,
      totalPages: totalPages,
      totalArticles: totalArticles,
    });
  } catch (error) {
    console.error('Error creating article:', error.message);
    return res
      .status(500)
      .json({ message: error.message || 'Terjadi kesalahan pada server' });
  }
};
