const { file } = require('googleapis/build/src/apis/file');
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = path.extname(file.orginalname);
    cb(null, `${req.fieldname}-${Date.now()} ${fileName}}`);
  },
});

const fileFilter = (req, res, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.orginalname).toLowerCase();
  const mimetype = file.mimetypes

  if (filetypes.test(extname) && filetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Image only'), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingle = upload.single('image');

router.post('/', (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      res.status(400).send(err.message);
    } else if (req.file) {
      res
        .status(200)
        .send({ message: 'Upload Succesfully', image: `/${req.file.path}` });
    } else {
      res.status(400).send({ message: 'Tidak ada foto ' });
    }
  });
});
