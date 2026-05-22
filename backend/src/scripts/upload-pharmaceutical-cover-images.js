'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const cloudService = require('../services/cloud');
const Section = require('../models/Section');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm';

// Pharmaceutical services mapping
const PHARMACEUTICAL_SERVICES = {
  inspection: [
    {
      sectionId: 'pharmaceutical-products-inspection-ppi',
      folderName: 'pharmaceutical-products-inspection-ppi',
      title: 'Pharmaceutical Products Inspection (PPI)'
    },
    {
      sectionId: 'pharmaceutical-plant-equipment-inspection-ppei',
      folderName: 'pharmaceutical-plant-equipment-inspection-ppei',
      title: 'Pharmaceutical Plant Equipment Inspection (PPEI)'
    }
  ],
  'verification-certification': [
    {
      sectionId: 'pharmaceutical-plant-refinery-fitness-verification-certification',
      folderName: 'pharmaceutical-plant-refinery-fitness-verification-certification',
      title: 'Pharmaceutical Plant & Refinery Fitness Verification & Certification'
    }
  ]
};

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
}

async function uploadCoverImagesForService(serviceType, serviceData) {
  const { sectionId, folderName, title } = serviceData;
  const uploadDir = path.join(__dirname, '../../uploads', serviceType, folderName);
  
  console.log(`📁 Processing ${title}...`);
  
  if (!fs.existsSync(uploadDir)) {
    console.log(`⚠️  Upload directory not found: ${uploadDir}`);
    return null;
  }

  const files = fs.readdirSync(uploadDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });

  if (files.length === 0) {
    console.log(`⚠️  No images found in ${uploadDir}`);
    return null;
  }

  console.log(`📸 Found ${files.length} image(s) to upload`);

  let coverImageUrl = null;

  for (const file of files) {
    const filePath = path.join(uploadDir, file);
    
    try {
      // Upload to Cloudinary with cover-photo name for the first image
      const imageName = files.indexOf(file) === 0 ? 'cover-photo' : null;
      const result = await cloudService.uploadImage(
        filePath,
        serviceType,
        folderName,
        imageName
      );

      if (files.indexOf(file) === 0) {
        coverImageUrl = result.url;
        console.log(`✅ Cover image uploaded: ${result.url}`);
      } else {
        console.log(`✅ Additional image uploaded: ${result.url}`);
      }
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    }
  }

  return coverImageUrl;
}

async function updateSectionCoverPhoto(sectionId, coverImageUrl) {
  if (!coverImageUrl) return;

  try {
    const section = await Section.findOne({ sectionId });
    if (!section) {
      console.log(`⚠️  Section not found: ${sectionId}`);
      return;
    }

    section.coverPhoto = coverImageUrl;
    await section.save();
    console.log(`✅ Updated section cover photo: ${section.title}`);
  } catch (error) {
    console.error(`❌ Failed to update section ${sectionId}:`, error.message);
  }
}

async function uploadAllPharmaceuticalCoverImages() {
  try {
    await connectToDatabase();
    
    console.log('🚀 Starting pharmaceutical cover images upload...\n');

    // Process inspection services
    console.log('📋 Processing Inspection Services...');
    for (const serviceData of PHARMACEUTICAL_SERVICES.inspection) {
      const coverImageUrl = await uploadCoverImagesForService('inspection', serviceData);
      await updateSectionCoverPhoto(serviceData.sectionId, coverImageUrl);
      console.log('');
    }

    // Process verification-certification services
    console.log('🏆 Processing Verification & Certification Services...');
    for (const serviceData of PHARMACEUTICAL_SERVICES['verification-certification']) {
      const coverImageUrl = await uploadCoverImagesForService('verification-certification', serviceData);
      await updateSectionCoverPhoto(serviceData.sectionId, coverImageUrl);
      console.log('');
    }

    console.log('🎉 Successfully processed all pharmaceutical cover images!');
    console.log('\nNext steps:');
    console.log('1. Add your cover images to the respective folders:');
    console.log('   - backend/uploads/inspection/pharmaceutical-products-inspection-ppi/');
    console.log('   - backend/uploads/inspection/pharmaceutical-plant-equipment-inspection-ppei/');
    console.log('   - backend/uploads/verification-certification/pharmaceutical-plant-refinery-fitness-verification-certification/');
    console.log('2. Run this script again to upload them to Cloudinary');

  } catch (error) {
    console.error('❌ Failed to upload pharmaceutical cover images:', error.message);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
if (require.main === module) {
  uploadAllPharmaceuticalCoverImages()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error.message);
      process.exit(1);
    });
}

module.exports = { uploadAllPharmaceuticalCoverImages };
