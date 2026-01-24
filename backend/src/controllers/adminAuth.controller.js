'use strict';

const { logger } = require('../setup/logger');
const { sendOtp, verifyOtp } = require('../services/otp');
const Admin = require('../models/Admin');

async function requestOtp(req, res) {
	try {
		const email = process.env.ADMIN_EMAIL;
		
		console.log('================================================');
		console.log('🔐 OTP Request Received');
		console.log('================================================');
		console.log('  ADMIN_EMAIL from .env:', email || 'NOT SET');
		
		if (!email) {
			console.error('❌ ADMIN_EMAIL is not configured in .env file');
			logger.error('OTP request failed - ADMIN_EMAIL not configured');
			return res.status(500).json({ success: false, message: 'ADMIN_EMAIL is not configured' });
		}
		
		console.log('  Sending OTP to admin email:', email);
		
		// Send email in background (non-blocking) - don't wait for it
		// This allows API to respond immediately while email sends asynchronously
		sendOtp(email)
			.then((result) => {
				if (result && result.messageId) {
					console.log('✅ OTP email sent successfully (background)', { messageId: result.messageId });
					logger.info('OTP email sent successfully', { email, messageId: result.messageId });
				} else {
					console.log('⚠️ OTP email may not have been sent (background)');
					logger.warn('OTP email may not have been sent', { email });
				}
			})
			.catch((error) => {
				console.error('❌ Background OTP email error:', error.message);
				logger.error('Background OTP email error', { email, error: error.message });
			});
		
		// Return immediately - don't wait for email to send
		// This makes the API response instant while email sends in background
		console.log('✅ OTP request accepted - responding immediately (email sending in background)');
		return res.json({ success: true, message: 'OTP sent' });
	} catch (error) {
		console.error('❌ OTP request error:', error.message);
		logger.error('requestOtp error:', error);
		return res.status(500).json({ success: false, message: 'Failed to send OTP' });
	}
}

async function verifyOtpCode(req, res) {
	try {
		const { code } = req.body;
		const email = process.env.ADMIN_EMAIL;
		if (!email) return res.status(500).json({ success: false, message: 'ADMIN_EMAIL is not configured' });
		if (!code) return res.status(400).json({ success: false, message: 'Code is required' });
		const result = verifyOtp(email, code);
		if (!result.success) return res.status(400).json({ success: false, message: result.message });
		// Issue a simple stateless token (for demo). Consider JWT in production.
		const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
		return res.json({ success: true, data: { token } });
	} catch (error) {
		logger.error('verifyOtpCode error:', error);
		return res.status(500).json({ success: false, message: 'Verification failed' });
	}
}

/**
 * Login with email and password
 * @route POST /api/admin/auth/login
 */
async function loginWithPassword(req, res) {
	try {
		const { email, password } = req.body;

		console.log('================================================');
		console.log('🔐 Admin Password Login Attempt');
		console.log('================================================');
		console.log('  Email:', email || 'NOT PROVIDED');

		if (!email || !password) {
			console.error('❌ Missing email or password');
			return res.status(400).json({ 
				success: false, 
				message: 'Email and password are required' 
			});
		}

		// Find admin by email
		const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

		if (!admin) {
			console.error('❌ Admin not found:', email);
			logger.warn('Admin login attempt - user not found', { email });
			return res.status(401).json({ 
				success: false, 
				message: 'Invalid email or password' 
			});
		}

		// Check if admin is active
		if (!admin.isActive) {
			console.error('❌ Admin account is blocked:', email);
			logger.warn('Admin login attempt - account blocked', { email });
			return res.status(403).json({ 
				success: false, 
				message: 'Your account has been blocked. Please contact administrator.' 
			});
		}

		// Compare password
		const isPasswordValid = await admin.comparePassword(password);

		if (!isPasswordValid) {
			console.error('❌ Invalid password for:', email);
			logger.warn('Admin login attempt - invalid password', { email });
			return res.status(401).json({ 
				success: false, 
				message: 'Invalid email or password' 
			});
		}

		// Update last login
		await admin.updateLastLogin();

		// Generate token (same format as OTP login for consistency)
		const token = Buffer.from(`${admin.email}:${Date.now()}`).toString('base64');

		console.log('✅ Admin login successful:', email);
		logger.info('Admin login successful', { email, adminId: admin._id });

		return res.json({ 
			success: true, 
			data: { 
				token,
				admin: {
					email: admin.email,
					lastLogin: admin.lastLogin
				}
			},
			message: 'Login successful' 
		});
	} catch (error) {
		console.error('❌ Login error:', error.message);
		logger.error('Admin login error', { error: error.message });
		return res.status(500).json({ 
			success: false, 
			message: 'Login failed. Please try again.' 
		});
	}
}

module.exports = { requestOtp, verifyOtpCode, loginWithPassword };



