'use strict';

const express = require('express');
const { requestOtp, verifyOtpCode, loginWithPassword } = require('../controllers/adminAuth.controller');

const router = express.Router();

// Middleware to log all requests to admin auth routes
router.use((req, res, next) => {
  console.log('================================================');
  console.log('🔐 Admin Auth Route Request');
  console.log('================================================');
  console.log('  Method:', req.method);
  console.log('  Path:', req.path);
  console.log('  Full URL:', req.originalUrl);
  console.log('  Origin:', req.headers.origin || 'N/A');
  console.log('  IP:', req.ip || req.connection.remoteAddress);
  console.log('  User-Agent:', req.headers['user-agent'] || 'N/A');
  console.log('  Timestamp:', new Date().toISOString());
  console.log('================================================');
  next();
});

/**
 * @route POST /api/admin/auth/request-otp
 */
router.post('/request-otp', requestOtp);

/**
 * @route POST /api/admin/auth/verify-otp
 */
router.post('/verify-otp', verifyOtpCode);

/**
 * @route POST /api/admin/auth/login
 */
router.post('/login', loginWithPassword);

module.exports = router;



