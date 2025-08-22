'use strict';

const path = require('path');
const multer = require('multer');
const { uploadsDir } = require('../utils/paths');

const maxSize = Number(process.env.MAX_FILE_SIZE_BYTES || 10 * 1024 * 1024);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '';
    cb(null, unique + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    return cb(null, true);
  }
  cb(new Error('Only image uploads are allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: maxSize } });

module.exports = { upload };


