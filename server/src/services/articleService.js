const { Article } = require('../model/article.model');

const AddArticle = async (form) => {
  // Validasi input
  if (!form.title || !form.content || !form.authorId) {
    throw new Error('Semua field harus terisi');
  }
  try {
    // Buat artikel di database
    const article = await Article.create({
      data: {
        title: form.title,
        content: form.content,
        authorId: form.authorId,
      },
    });
    // Jika gagal membuat artikel, lempar error
    if (!article) {
      throw new Error('Gagal membuat artikel');
    }
    // Kembalikan artikel yang berhasil dibuat
    return article;
  } catch (error) {
    // Lempar error dengan pesan yang sesuai atau default
    throw new Error(error.message || 'Terjadi error saat menambah artikel');
  }
};

module.exports = {
  AddArticle,
};
