'use strict';

const express = require('express');
const ContactOffice = require('../models/ContactOffice');

const router = express.Router();

// GET all grouped by region_name
router.get('/', async (req, res, next) => {
  try {
    const offices = await ContactOffice.find().sort({ region_order: 1, office_order: 1 }).lean();
    const grouped = offices.reduce((acc, o) => {
      if (!acc[o.region_name]) acc[o.region_name] = [];
      acc[o.region_name].push(o);
      return acc;
    }, {});
    const response = Object.entries(grouped).map(([region_name, offices]) => ({ region_name, offices }));
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


