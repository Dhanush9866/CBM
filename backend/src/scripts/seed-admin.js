'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cbm360tiv:MiiFze4xYGr6XNji@cluster0.sf6iagh.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster';

async function seedAdmin() {
  try {
    console.log('================================================');
    console.log('🌱 Seeding Admin User');
    console.log('================================================');

    // Connect to database
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Default admin credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'cbm360tiv@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    console.log('  Email:', adminEmail);
    console.log('  Password:', adminPassword);
    console.log('================================================');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });

    if (existingAdmin) {
      console.log('⚠️  Admin already exists. Updating password...');
      existingAdmin.password = adminPassword; // Will be hashed by pre-save hook
      existingAdmin.isActive = true;
      await existingAdmin.save();
      console.log('✅ Admin password updated successfully');
    } else {
      // Create new admin
      const admin = new Admin({
        email: adminEmail.toLowerCase(),
        password: adminPassword, // Will be hashed by pre-save hook
        isActive: true
      });

      await admin.save();
      console.log('✅ Admin created successfully');
    }

    console.log('================================================');
    console.log('📋 Admin Credentials:');
    console.log('  Email:', adminEmail);
    console.log('  Password:', adminPassword);
    console.log('================================================');
    console.log('✅ Seeding completed successfully!');
    console.log('================================================');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedAdmin();
