const { Article } = require('../model/article.model');

const AddArticle = async (title, content, authorId) => {
  try {
    // Buat artikel baru di database
    const article = await Article.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    // Jika pembuatan artikel gagal, lemparkan error
    if (!article) {
      throw new Error('Gagal membuat artikel');
    }

    return article; // Kembalikan artikel yang berhasil dibuat
  } catch (error) {
    // Tangani error dan lemparkan ke controller
    console.error('Error in AddArticle service:', error.message);
    throw new Error(
      error.message || 'Terjadi kesalahan pada proses pembuatan artikel'
    );
  }
};

const ArticleList = async (page, perPage) => {
  page = parseInt(page, 1) || 1;
  perPage = parseInt(perPage, 10) || 10;

  const offsetPage = (page - 1) * perPage;
  const endIndex = offsetPage + perPage;
  try {
    const articles = await Article.findMany({
      skip: offsetPage,
      take: perPage,
    });

    const totalArticles = Article.count();

    const totalPages = Math.ceil(totalArticles / perPage);
    if (page > totalPages || page < 1) throw new Error('Halaman Tidak Valid');

    const articleForPages = articles.slice(offsetPage, endIndex);
    if (articleForPages.length === 0) throw new Error('Daftar Artikel kosong');

    return { articles, totalPages, totalArticles };
  } catch (error) {
    console.error('Error in ArticleList service:', error.message);
    throw new Error(
      error.message || 'Terjadi kesalahan pada proses memuat artikel'
    );
  }
};

module.exports = {
  AddArticle,
  ArticleList,
};
