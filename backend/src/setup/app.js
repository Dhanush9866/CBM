'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { notFoundHandler, errorHandler } = require('../utils/error');
const { uploadsDir } = require('../utils/paths');
const sectionRoutes = require('../routes/section.routes');
const translateRoutes = require('../routes/translate.routes');

function createApp() {
  const app = express();

  // Config
  app.set('trust proxy', 1);

  // Middlewares
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Logging
  app.use(morgan('combined'));

  // Rate limiting basic safe defaults
  const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
  app.use('/api', limiter);

  // Static: serve uploaded images
  app.use('/uploads', express.static(uploadsDir));

  // Routes
  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use('/api/sections', sectionRoutes);
  app.use('/api/translate', translateRoutes);

  // 404 and error handler
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };


