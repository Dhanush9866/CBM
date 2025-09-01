'use strict';

const emailService = require('../services/email');
const { logger } = require('../setup/logger');

/**
 * Submit a job application
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function submitJobApplication(req, res) {
  try {
    const applicationData = req.body;
    const resumeFile = req.file;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'position', 'department', 'experience', 'coverLetter'];
    const missingFields = requiredFields.filter(field => !applicationData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Check if resume file is provided
    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: 'Resume/CV file is required'
      });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Please upload PDF, DOC, or DOCX files only.'
      });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (resumeFile.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'File size must be less than 5MB'
      });
    }

    // Send application email to admin
    const adminEmailResult = await emailService.sendJobApplication(
      applicationData,
      resumeFile.buffer,
      resumeFile.originalname
    );

    // Send confirmation email to applicant
    const confirmationResult = await emailService.sendApplicationConfirmation(applicationData);

    // Log the application
    logger.info('Job application submitted successfully', {
      position: applicationData.position,
      applicant: `${applicationData.firstName} ${applicationData.lastName}`,
      email: applicationData.email,
      adminEmailSent: adminEmailResult.success,
      confirmationEmailSent: confirmationResult.success
    });

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        adminEmailSent: adminEmailResult.success,
        confirmationEmailSent: confirmationResult.success,
        applicationId: adminEmailResult.messageId
      }
    });

  } catch (error) {
    logger.error('Error submitting job application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.'
    });
  }
}

/**
 * Get application status (placeholder for future implementation)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getApplicationStatus(req, res) {
  try {
    const { email, applicationId } = req.query;

    if (!email || !applicationId) {
      return res.status(400).json({
        success: false,
        message: 'Email and application ID are required'
      });
    }

    // This is a placeholder - in a real implementation, you would query a database
    // to get the actual application status
    res.status(200).json({
      success: true,
      message: 'Application status retrieved',
      data: {
        status: 'Under Review',
        submittedDate: new Date().toISOString(),
        estimatedResponseTime: '5-7 business days'
      }
    });

  } catch (error) {
    logger.error('Error getting application status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve application status'
    });
  }
}

module.exports = {
  submitJobApplication,
  getApplicationStatus
};


