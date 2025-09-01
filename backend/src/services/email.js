'use strict';

const nodemailer = require('nodemailer');
const { logger } = require('../setup/logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // Create transporter using environment variables
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        logger.error('Email service configuration error:', error);
      } else {
        logger.info('Email service is ready to send messages');
      }
    });
  }

  /**
   * Send job application notification to admin
   * @param {Object} applicationData - Application form data
   * @param {Buffer} resumeBuffer - Resume file buffer
   * @param {string} resumeFileName - Original resume filename
   * @returns {Promise<Object>} Email send result
   */
  async sendJobApplication(applicationData, resumeBuffer, resumeFileName) {
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@cbm.com';
      
      const emailContent = this.generateApplicationEmail(applicationData);
      
      const mailOptions = {
        from: `"CBM Careers" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `New Job Application: ${applicationData.position}`,
        html: emailContent,
        attachments: [
          {
            filename: resumeFileName,
            content: resumeBuffer,
            contentType: this.getContentType(resumeFileName)
          }
        ]
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info('Job application email sent successfully', { 
        messageId: result.messageId,
        position: applicationData.position,
        applicant: `${applicationData.firstName} ${applicationData.lastName}`
      });

      return {
        success: true,
        messageId: result.messageId
      };

    } catch (error) {
      logger.error('Failed to send job application email:', error);
      throw new Error('Failed to send application email');
    }
  }

  /**
   * Generate HTML email content for job application
   * @param {Object} applicationData - Application form data
   * @returns {string} HTML email content
   */
  generateApplicationEmail(applicationData) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Job Application</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .section { margin-bottom: 20px; }
          .label { font-weight: bold; color: #374151; }
          .value { margin-left: 10px; }
          .cover-letter { background-color: white; padding: 15px; border-left: 4px solid #1e40af; margin: 10px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Job Application</h1>
            <p>Position: ${applicationData.position}</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Applicant Information</h2>
              <p><span class="label">Name:</span><span class="value">${applicationData.firstName} ${applicationData.lastName}</span></p>
              <p><span class="label">Email:</span><span class="value">${applicationData.email}</span></p>
              <p><span class="label">Phone:</span><span class="value">${applicationData.phone}</span></p>
            </div>
            
            <div class="section">
              <h2>Position Details</h2>
              <p><span class="label">Position:</span><span class="value">${applicationData.position}</span></p>
              <p><span class="label">Department:</span><span class="value">${applicationData.department}</span></p>
              <p><span class="label">Experience Level:</span><span class="value">${applicationData.experience} years</span></p>
            </div>
            
            <div class="section">
              <h2>Cover Letter</h2>
              <div class="cover-letter">
                ${applicationData.coverLetter.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="section">
              <h2>Resume/CV</h2>
              <p>The applicant's resume is attached to this email.</p>
            </div>
          </div>
          
          <div class="footer">
            <p>This application was submitted through the CBM Careers portal.</p>
            <p>Application received on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Get content type based on file extension
   * @param {string} fileName - File name with extension
   * @returns {string} MIME content type
   */
  getContentType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    const contentTypes = {
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    return contentTypes[extension] || 'application/octet-stream';
  }

  /**
   * Send confirmation email to applicant
   * @param {Object} applicationData - Application form data
   * @returns {Promise<Object>} Email send result
   */
  async sendApplicationConfirmation(applicationData) {
    try {
      const emailContent = this.generateConfirmationEmail(applicationData);
      
      const mailOptions = {
        from: `"CBM Careers" <${process.env.SMTP_USER}>`,
        to: applicationData.email,
        subject: 'Application Received - CBM Careers',
        html: emailContent
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info('Application confirmation email sent', { 
        messageId: result.messageId,
        applicant: applicationData.email
      });

      return {
        success: true,
        messageId: result.messageId
      };

    } catch (error) {
      logger.error('Failed to send confirmation email:', error);
      // Don't throw error for confirmation email failure
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate confirmation email content
   * @param {Object} applicationData - Application form data
   * @returns {string} HTML email content
   */
  generateConfirmationEmail(applicationData) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Application Received</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Application Received</h1>
          </div>
          
          <div class="content">
            <p>Dear ${applicationData.firstName} ${applicationData.lastName},</p>
            
            <p>Thank you for your interest in joining the CBM team! We have successfully received your application for the <strong>${applicationData.position}</strong> position.</p>
            
            <p>Our talent team will review your application and qualifications against the role requirements. You can expect to hear from us within 5-7 business days.</p>
            
            <p>If you have any questions about your application, please don't hesitate to contact our HR team.</p>
            
            <p>Best regards,<br>
            The CBM Careers Team</p>
          </div>
          
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
