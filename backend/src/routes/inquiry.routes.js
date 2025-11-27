'use strict';

const express = require('express');
const multer = require('multer');
const { ApiError } = require('../utils/error');
const emailService = require('../services/email');

const router = express.Router();

// Upload configuration for verification documents
const allowedVerificationMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
];

const verifyDocUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 5,
  },
  fileFilter: (req, file, cb) => {
    if (allowedVerificationMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.fileValidationError = 'Only PDF, DOC/DOCX, PNG, or JPG files are allowed.';
      cb(null, false);
    }
  },
}).array('documents', 5);

// POST /api/contact - send contact inquiry email
router.post('/contact', async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      industry,
      service,
      message,
      consent,
    } = req.body || {};

    if (!firstName || !lastName || !email || !company || !message) {
      throw new ApiError(400, 'firstName, lastName, email, company and message are required');
    }

    const consentBool = Boolean(consent);

    await emailService.sendContactInquiry({
      firstName,
      lastName,
      email,
      phone,
      company,
      industry,
      service,
      message,
      consent: consentBool,
    });

    res.status(200).json({ success: true, message: 'Inquiry sent successfully' });
  } catch (err) {
    next(err);
  }
});

// POST /api/verify-doc - submit document verification request
router.post(
  '/verify-doc',
  (req, res, next) => {
    verifyDocUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new ApiError(400, 'Each file must be under 10MB.'));
        }
        return next(new ApiError(400, err.message));
      }
      if (err) {
        return next(err);
      }
      if (req.fileValidationError) {
        return next(new ApiError(400, req.fileValidationError));
      }
      next();
    });
  },
  async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        companyName,
        jobTitle,
        location,
        comments,
      } = req.body || {};

      if (!firstName || !lastName || !email || !location) {
        throw new ApiError(400, 'firstName, lastName, email, and location are required');
      }

      const files = Array.isArray(req.files) ? req.files : [];
      if (!files.length) {
        throw new ApiError(400, 'Please attach at least one document for verification.');
      }

      await emailService.sendDocumentVerification(
        {
          firstName,
          lastName,
          email,
          companyName,
          jobTitle,
          location,
          comments,
        },
        files.map((file) => ({
          buffer: file.buffer,
          originalname: file.originalname,
          mimetype: file.mimetype,
        }))
      );

      res.status(200).json({
        success: true,
        message: 'Verification request sent successfully',
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;


