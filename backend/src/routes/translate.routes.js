'use strict';

const express = require('express');
const controller = require('../controllers/translate.controller');

const router = express.Router();

router.get('/:id', controller.translateSection);

module.exports = router;


