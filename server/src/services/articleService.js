const { Article } = require('../model/article.model');
const { Category } = require('../model/categories.model');

const AddArticle = async (title, content, categoryName, authorId) => {
  try {
    const category = await Category.findUnique({
      where: { name: categoryName },
    });

    if (!category) throw new Error('Category not found');

    // Buat artikel baru
    const article = await Article.create({
      data: {
        title: title,
        content: content,
        category: {
          connect: {
            id: parseInt(category.id, 10),
          },
        },
        author: {
          connect: {
            id: parseInt(authorId, 10),
          },
        },
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

const updateArticle = async (articleId, title, content, categoryName) => {
  try {
    if (!articleId || isNaN(parseInt(articleId, 10))) {
      throw new Error('Invalid or missing article ID');
    }

    const existingArticle = await Article.findFirst({
      where: { id: parseInt(articleId, 10) },
    });

    if (!existingArticle) throw new Error('Article not found');

    const existingCategory = await Category.findUnique({
      where: { name: categoryName },
    });

    if (!existingCategory) throw new Error('Category not found');

    // Menangani string kosong atau undefined
    const updatedTitle = title !== undefined && title.trim() !== "" 
      ? title 
      : existingArticle.title;

    const updatedContent = content !== undefined && content.trim() !== "" 
      ? content 
      : existingArticle.content;

    const article = await Article.update({
      where: { id: parseInt(articleId, 10) },
      data: {
        title: updatedTitle,
        content: updatedContent,
        categoryId: existingCategory.id,
      },
    });

    if (!article) throw new Error('Failed to update article');

    return article;
  } catch (error) {
    console.error('Error in updateArticle service:', error.message);
    throw new Error(
      error.message || 'An error occurred while updating the article'
    );
  }
};

const deleteArticle = (articleId) => {
  try {
    const article = Article.delete({ where: { id: parseInt(articleId, 10) } });
    if (!article) throw new Error('Article not found');

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
  deleteArticle,
};
