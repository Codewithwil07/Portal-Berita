const isAdmin = (req, res, next) => {
  if (req.session.role === 'ADMIN' || req.session.role === 'SUPER_ADMIN') {
    return next();
  }
  res.status(401).send('Kamu bukan admin');
};

const isUsersBiasa = (req, res, next) => {
  if (
    req.session.role === 'READER' ||
    req.session.role === 'WRITER' ||
    req.session.role === 'EDITOR'
  ) {
    return next();
  }
};

const isEditor = (req, res, next) => {
  if (req.session.role === 'EDITOR') {
    return next();
  }
  res.status(401).send('Kamu bukan Editor');
};

const isWriter = (req, res, next) => {
  if (req.session.role === 'WRITER') {
    return next();
  }
  res.status(401).send('Kamu bukan Writer');
};

const isReader = (req, res, next) => {
  if (req.session.role === 'READER') {
    return next();
  }
  res.status(401).send('Kamu bukan Reaader');
};

const isAuthorizedAdminorWriter = (req, res, next) => {
  if (
    (req.session &&
      (req.session.role === 'ADMIN' || req.session.role === 'WRITER')) ||
    req.session.role === 'SUPER_ADMIN'
  ) {
    return next(); // Lanjutkan jika role adalah ADMIN atau WRITER
  }
  res.status(403).json({ message: 'Kamu bukan Admin atau Writer' });
};

module.exports = isAuthorizedAdminorWriter;

module.exports = {
  isAdmin,
  isEditor,
  isWriter,
  isReader,
  isUsersBiasa,
  isAuthorizedAdminorWriter,
};
