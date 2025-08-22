'use strict';

const express = require('express');
const { upload } = require('../middlewares/upload');
const controller = require('../controllers/section.controller');

const router = express.Router();

router.post('/', upload.array('images', 10), controller.createSection);
router.get('/:id', controller.getSectionById);
router.get('/', controller.getSections);
router.put('/:id', upload.array('images', 10), controller.updateSection);
router.delete('/:id', controller.deleteSection);

module.exports = router;


