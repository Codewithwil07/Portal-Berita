const isAdmin = (req, res, next) => {
  console.log(req.session.user);
  if (req.session.user && req.session.user.role === 'ADMIN') {
    return next();
  }
  res.status(401).send('Kamu bukan admin');
};

const isEditor = (req, res, next) => {
  if (req.user && req.user.role === 'EDITOR') {
    return next();
  }
  res.status(401).send('Kamu bukan Editor');
};

const isWriter = (req, res, next) => {
  if (req.user && req.user.role === 'WRITER') {
    return next();
  }
  res.status(401).send('Kamu bukan Writer');
};

module.exports = { isAdmin, isEditor, isWriter };
