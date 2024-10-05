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
  page = parseInt(page, 10) || 1;
  perPage = parseInt(perPage, 10) || 10;

  const offsetPage = (page - 1) * perPage;

  try {
    const [articles, totalArticles] = await Promise.all([
      Article.findMany({
        skip: offsetPage,
        take: perPage,
      }),
      Article.count(),
    ]);

    const totalPages = Math.ceil(totalArticles / perPage);

    if (page > totalPages || page < 1) throw new Error('Halaman Tidak Valid');
    if (articles.length === 0) throw new Error('Daftar Artikel kosong');

    return { articles, totalPages, totalArticles };
  } catch (error) {
    console.error('Error in ArticleList service:', error.message);
    throw new Error(
      error.message || 'Terjadi kesalahan pada saat proses memuat artikel'
    );
  }
};

const updateArticle = async (articleId, title, content) => {
  if (!articleId) throw new Error('ArticleId is not found');
  try {
    const existingArticle = await Article.findUnique({
      where: { id: parseInt(articleId, 10) },
    });

    existingArticle.title = title;
    existingArticle.content = content;

    const article = await Article.update({
      where: { id: parseInt(articleId, 10) },
      data: { title, content },
    });
    if (!article) throw new Error('artikel gagal di update');

    return article;
  } catch (error) {
    console.error('Error in ArticleList service:', error.message);
    throw new Error(
      error.message || 'Terjadi kesalahan pada saat update article'
    );
  }
};

module.exports = {
  AddArticle,
  ArticleList,
  updateArticle,
};
