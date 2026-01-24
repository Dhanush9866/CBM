'use strict';

const crypto = require('crypto');
const emailService = require('./email');
const { logger } = require('../setup/logger');

// In-memory store; consider Redis for production
const otpStore = new Map(); // key: email, value: { code, expiresAt }

function generateOtp(length = 6) {
	const digits = '0123456789';
	let code = '';
	for (let i = 0; i < length; i++) code += digits[Math.floor(Math.random() * 10)];
	return code;
}

async function sendOtp(email) {
	const code = generateOtp(6);
	const ttlMs = 5 * 60 * 1000; // 5 minutes
	const expiresAt = Date.now() + ttlMs;
	const hashed = crypto.createHash('sha256').update(code).digest('hex');
	otpStore.set(email, { code: hashed, expiresAt });

	// Get admin email from .env for logging
	const adminEmail = process.env.ADMIN_EMAIL || email;
	const smtpUser = process.env.SMTP_USER;
	const smtpPass = process.env.SMTP_PASS;

	// Log OTP generation and configuration
	console.log('================================================');
	console.log('📧 OTP Email Sending Process Started');
	console.log('================================================');
	console.log('  Admin Email (from .env):', adminEmail);
	console.log('  Target Email:', email);
	console.log('  SMTP User:', smtpUser ? `${smtpUser.substring(0, 3)}***${smtpUser.substring(smtpUser.length - 5)}` : 'NOT SET');
	console.log('  SMTP Pass:', smtpPass ? `${'*'.repeat(Math.min(smtpPass.length, 4))}***` : 'NOT SET');
	console.log('  Generated OTP:', code);
	console.log('  OTP Expires in: 5 minutes');
	console.log('================================================');

	const html = `
	  <div style="font-family: Arial, sans-serif;">
	    <h2>CBM Admin Login Code</h2>
	    <p>Your one-time verification code is:</p>
	    <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</div>
	    <p>This code will expire in 5 minutes.</p>
	  </div>
	`;

	try {
		if (!smtpUser || !smtpPass) {
			console.error('❌ OTP EMAIL NOT SENT - SMTP credentials missing');
			console.error('   SMTP_USER:', smtpUser ? 'SET' : 'NOT SET');
			console.error('   SMTP_PASS:', smtpPass ? 'SET' : 'NOT SET');
			console.error('   Please configure SMTP_USER and SMTP_PASS in .env file');
			console.warn('⚠️ OTP email will not be sent. Using console OTP for development.');
			logger.warn('OTP email not sent - SMTP credentials missing', { adminEmail });
			return { success: true };
		}

		// Check if transporter exists
		if (!emailService.transporter) {
			console.error('❌ OTP EMAIL NOT SENT - Transporter not initialized');
			return { success: false, message: 'Email service not ready' };
		}

		console.log('📤 Sending OTP email to:', email);
		const startTime = Date.now();
		
		// Send email - this will use connection pool for faster sending
		const emailResult = await emailService.transporter.sendMail({
			from: `CBM Admin <${smtpUser}>`,
			to: email,
			subject: 'Your CBM Admin OTP Code',
			html,
		});
		
		const sendDuration = Date.now() - startTime;

		console.log('================================================');
		console.log('✅ OTP EMAIL SENT SUCCESSFULLY');
		console.log('================================================');
		console.log('  To:', email);
		console.log('  From:', smtpUser);
		console.log('  Message ID:', emailResult.messageId);
		console.log('  Response:', emailResult.response || 'N/A');
		console.log('  Send Duration:', sendDuration + 'ms');
		console.log('================================================');
		
		logger.info('OTP email sent successfully', { 
			email, 
			adminEmail,
			messageId: emailResult.messageId 
		});
		
		return { success: true, messageId: emailResult.messageId };
	} catch (error) {
		console.log('================================================');
		console.log('❌ OTP EMAIL FAILED TO SEND');
		console.log('================================================');
		console.error('  Error Code:', error.code || 'N/A');
		console.error('  Error Message:', error.message || 'N/A');
		console.error('  Error Command:', error.command || 'N/A');
		console.error('  Error Response:', error.response || 'N/A');
		console.error('  Response Code:', error.responseCode || 'N/A');
		console.error('  To Email:', email);
		console.error('  From Email:', smtpUser || 'NOT SET');
		console.log('================================================');
		console.warn('⚠️ Email failed to send. OTP is still available via console for development.');
		console.log('🔑 ADMIN LOGIN OTP (Console Fallback):', code);
		console.log('================================================');
		
		logger.error('Failed to send OTP email', { 
			error: error.message,
			code: error.code,
			email,
			adminEmail 
		});
		
		// Don't throw error so client can still verify
		return { success: true };
	}
}

function verifyOtp(email, code) {
	const entry = otpStore.get(email);
	if (!entry) return { success: false, message: 'No OTP requested' };
	if (Date.now() > entry.expiresAt) {
		otpStore.delete(email);
		return { success: false, message: 'OTP expired' };
	}
	const hashed = crypto.createHash('sha256').update(code).digest('hex');
	if (hashed !== entry.code) return { success: false, message: 'Invalid OTP' };
	otpStore.delete(email);
	return { success: true };
}

module.exports = { sendOtp, verifyOtp };



