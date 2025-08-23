#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envContent = `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/cbm
MONGODB_DB=cbm

# Cloudinary Configuration (Required)
CLOUDINARY_CLOUD_NAME=docyipoze
CLOUDINARY_API_KEY=532233698436916
CLOUDINARY_API_SECRET=Ht0ssi51VrbeyLT5ZFqybhHTt9Q

# Server Configuration
PORT=5000
NODE_ENV=development
`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('✅ .env file created successfully!');
  console.log('📁 Path:', envPath);
  console.log('\n📋 Content:');
  console.log(envContent);
} catch (error) {
  console.error('❌ Failed to create .env file:', error.message);
}
