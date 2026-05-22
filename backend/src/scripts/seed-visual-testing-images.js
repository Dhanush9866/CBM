#!/usr/bin/env node

/**
 * Script to seed visual testing images to Cloudinary
 * Run this after setting up your .env file with Cloudinary credentials
 */

const path = require('path');
const fs = require('fs');
const cloudService = require('./src/services/cloud');

async function seedVisualTestingImages() {
  console.log('🌱 Seeding Visual Testing Images to Cloudinary...\n');

  try {
    const folderPath = path.join(__dirname, 'uploads/testing/visual-testing');
    const files = fs.readdirSync(folderPath);
    
    console.log(`📁 Found ${files.length} images in visual-testing folder:`);
    files.forEach(file => console.log(`   - ${file}`));
    console.log('');

    // Upload each image to Cloudinary
    const uploadResults = [];
    
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      console.log(`📤 Uploading ${file}...`);
      
      try {
        const result = await cloudService.uploadImage(
          filePath,
          'testing',
          'visual-testing',
          file.replace(/\.[^/.]+$/, '') // Remove extension for custom name
        );
        
        uploadResults.push(result);
        console.log(`   ✅ Success: ${result.url}`);
        console.log(`   📍 Cloudinary ID: ${result.public_id}`);
        console.log(`   📏 Size: ${result.width}x${result.height}`);
        console.log('');
        
      } catch (error) {
        console.error(`   ❌ Failed to upload ${file}: ${error.message}`);
      }
    }

    console.log('🎉 Upload Summary:');
    console.log(`   Total images: ${files.length}`);
    console.log(`   Successfully uploaded: ${uploadResults.length}`);
    console.log(`   Failed: ${files.length - uploadResults.length}`);
    console.log('');

    if (uploadResults.length > 0) {
      console.log('📋 Cloudinary URLs for frontend:');
      uploadResults.forEach((result, index) => {
        console.log(`   ${index + 1}. ${result.url}`);
      });
      console.log('');
      
      console.log('🔗 API endpoint to retrieve images:');
      console.log('   GET /api/images/testing/visual-testing/images');
      console.log('');
      
      console.log('💡 Frontend integration ready!');
      console.log('   Use the URLs above or fetch via API endpoint');
    }

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    
    if (error.message.includes('CLOUDINARY')) {
      console.log('\n💡 Solution: Add Cloudinary credentials to your .env file');
      console.log('   Required variables:');
      console.log('   - CLOUDINARY_CLOUD_NAME');
      console.log('   - CLOUDINARY_API_KEY');
      console.log('   - CLOUDINARY_API_SECRET');
    }
    
    console.log('\n📖 See CONFIGURATION.md for setup instructions');
  }
}

// Run the seeding
seedVisualTestingImages().catch(console.error);
