const isAdmin = (req, res, next) => {
  console.log(req.session.role);
  if (req.session.role === 'ADMIN') {
    return next();
  }
  res.status(401).send('Kamu bukan admin');
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

module.exports = { isAdmin, isEditor, isWriter, isReader };
