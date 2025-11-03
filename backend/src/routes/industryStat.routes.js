'use strict';

const express = require('express');
const router = express.Router();
const {
  getAllIndustryStats,
  getIndustryStatById,
  createIndustryStat,
  updateIndustryStat,
  deleteIndustryStat
} = require('../controllers/industryStat.controller');

// Public routes
router.get('/', getAllIndustryStats);
router.get('/:id', getIndustryStatById);

// Admin routes (consider adding auth middleware later)
router.post('/', createIndustryStat);
router.put('/:id', updateIndustryStat);
router.delete('/:id', deleteIndustryStat);

module.exports = router;





