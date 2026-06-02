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
const pageRoutes = require('../routes/page.routes');
const translateRoutes = require('../routes/translate.routes');
const imageRoutes = require('../routes/image.routes');
const careerRoutes = require('../routes/career.routes');
const contactRoutes = require('../routes/contact.routes');
const inquiryRoutes = require('../routes/inquiry.routes');
const adminAuthRoutes = require('../routes/admin-auth.routes');
const blogRoutes = require('../routes/blog.routes');
const industryStatRoutes = require('../routes/industryStat.routes');

const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, '');

function createApp() {
  const app = express();

  // Config
  app.set('trust proxy', 1);

  const defaultAllowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:8080',
    'http://localhost:8081',
    'https://cbm-ky2n.onrender.com',
    'https://cbm-admin-7dbj.onrender.com',
    'https://api.cbm360tiv.com',
    'https://cbm360tiv.com',
    'https://www.cbm360tiv.com',
    'https://admin.cbm360tiv.com',
    'https://cbm360tiv.in',
    'https://www.cbm360tiv.in',
    'https://admin.cbm360tiv.in'
  ];
  const envAllowedOrigins = (process.env.CORS_ORIGINS || process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const allowedOrigins = new Set([...defaultAllowedOrigins, ...envAllowedOrigins].map(normalizeOrigin));

  const corsOptions = {
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      const normalizedOrigin = normalizeOrigin(origin);
      const isAllowed =
        allowedOrigins.has(normalizedOrigin) ||
        /^https:\/\/[a-z0-9-]+\.onrender\.com$/i.test(normalizedOrigin);

      if (!isAllowed) {
        console.warn(`CORS blocked origin: ${origin}`);
        return callback(null, false);
      }

      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 204
  };
  // Middlewares
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));


  // Global request duration middleware
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      // eslint-disable-next-line no-console
      if (duration > 1000) {
        console.warn(`⚠️ Slow API: ${req.method} ${req.originalUrl} took ${duration}ms`);
      } else {
        console.log(`${req.method} ${req.originalUrl} took ${duration}ms`);
      }
    });
    next();
  });

  // Logging: METHOD PATH STATUS(response code colored) DURATION
  const colorizeStatus = (status) => {
    if (status >= 500) return `\x1b[31m${status}\x1b[0m`; // red
    if (status >= 400) return `\x1b[33m${status}\x1b[0m`; // yellow
    if (status >= 300) return `\x1b[36m${status}\x1b[0m`; // cyan
    return `\x1b[32m${status}\x1b[0m`; // green
  };
  app.use(morgan((tokens, req, res) => {
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const status = Number(tokens.status(req, res)) || 0;
    const time = tokens['response-time'](req, res) || '0.0';
    return `${method} ${url} ${colorizeStatus(status)} ${time} ms`;
  }));

  // Rate limiting basic safe defaults
  const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
  app.use('/api', limiter);

  // Static: serve uploaded images
  app.use('/uploads', express.static(uploadsDir));

  // Routes
  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use('/api/sections', sectionRoutes);
  app.use('/api/pages', pageRoutes);
  app.use('/api/translate', translateRoutes);
  app.use('/api/images', imageRoutes);
  app.use('/api/careers', careerRoutes);
  app.use('/api/contact-offices', contactRoutes);
  app.use('/api', inquiryRoutes);
  app.use('/api/admin/auth', adminAuthRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/industry-stats', industryStatRoutes);


  // 404 and error handler
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };


