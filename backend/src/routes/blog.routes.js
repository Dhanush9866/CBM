const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getAllBlogs,
  getBlogById,
  getFeaturedBlogs,
  getBlogsByTag,
  searchBlogs,
  getAllTags,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blog.controller');

// Create upload middleware for blog assets using memory storage for Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const imageFields = ['featuredImageFile'];
    const isImageField = imageFields.includes(file.fieldname);

    const allowedImageMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (isImageField && allowedImageMimes.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type uploaded.'), false);
  }
});

// Public routes
router.get('/', getAllBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/tags', getAllTags);
router.get('/search', searchBlogs);
router.get('/tag/:tag', getBlogsByTag);
router.get('/:id', getBlogById);

// Admin routes (you can add authentication middleware here)
router.post('/', upload.fields([
  { name: 'featuredImageFile', maxCount: 1 }
]), createBlog);
router.put('/:id', upload.fields([
  { name: 'featuredImageFile', maxCount: 1 }
]), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
