#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const cloudinaryService = require('./src/services/cloudinary');

// Configuration
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const EXCLUDE_FOLDERS = ['visual-testing']; // Already uploaded

// Service structure mapping
const SERVICE_STRUCTURE = {
  'testing': [
    'borescope-inspection',
    'drone-inspection', 
    'phased-array-ut',
    'time-of-flight-diffraction',
    'ultrasonic-testing',
    'guided-wave-lrut',
    'radiographic-testing',
    'eddy-current-testing',
    'liquid-penetrant-testing',
    'magnetic-particle-testing',
    'hardness-testing',
    'positive-material-identification',
    'leak-testing',
    'lifting-gear-load-testing'
  ],
  'cbm': [
    'vibration-analysis-balancing',
    'laser-shaft-alignment',
    'remote-cbm-iot-cloud',
    'infrared-thermography',
    'lubrication-oil-analysis'
  ],
  'inspection': [
    'third-party-inspection',
    'asset-integrity-inspection',
    'environmental-monitoring-inspection',
    'risk-based-inspection',
    'welding-inspection',
    'Mechanical-inspection',
    'painting-inspection',
    'electrical-instrumentation-inspection',
    'gearbox-inspection',
    'topside-fitness-inspection',
    'hse-inspection',
    'underground-mine-shaft-safety-inspection',
    'on-site-laboratory-sampling',
    'marine-inspection',
    'pre-shipment-inspection'
  ],
  'auditing': [
    'technical-audit',
    'operational-audit',
    'hse-health-safety-environment-audit',
    'fire-and-safety-audit',
    'asset-integrity-management-audit',
    'production-import-export-audit',
    'financial-audit'
  ],
  'verification-certification': [
    'production-import-export-verification-certification',
    'asset-integrity-fitness-verification-certification',
    'environmental-damage-verification-certification',
    'pressure-vessels-boilers-verification-certification',
    'turbines-generators-engines-compressors-verification-certification',
    'lifting-gear-load-verification-certification',
    'pipeline-integrity-verification-certification',
    'industrial-structural-health-monitoring-fitness-verification-certification',
    'storage-tank-facilities-verification-certification'
  ]
};

async function uploadServiceImages(serviceType, subService) {
  const folderPath = path.join(UPLOAD_DIR, serviceType, subService);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Folder not found: ${folderPath}`);
    return [];
  }

  const files = fs.readdirSync(folderPath)
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map(file => path.join(folderPath, file));

  if (files.length === 0) {
    console.log(`⚠️  No images found in: ${folderPath}`);
    return [];
  }

  console.log(`📁 Uploading ${files.length} images from ${serviceType}/${subService}...`);
  
  const uploadPromises = files.map(async (filePath) => {
    try {
      const fileName = path.basename(filePath, path.extname(filePath));
      const result = await cloudinaryService.uploadImage(filePath, serviceType, subService, fileName);
      console.log(`✅ Uploaded: ${fileName}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to upload ${path.basename(filePath)}: ${error.message}`);
      return null;
    }
  });
  const results = await Promise.all(uploadPromises);
  const successfulUploads = results.filter(result => result !== null);
  console.log(`🎉 Successfully uploaded ${successfulUploads.length}/${files.length} images for ${serviceType}/${subService}\n`);
  return successfulUploads;
}
async function bulkUploadAllImages() {
  console.log('🚀 Starting Bulk Upload of All Images to Cloudinary...\n');
  
  const startTime = Date.now();
  let totalUploaded = 0;
  let totalFailed = 0;
  const uploadResults = {};

  // Process each service type
  for (const [serviceType, subServices] of Object.entries(SERVICE_STRUCTURE)) {
    console.log(`\n📂 Processing ${serviceType.toUpperCase()} Services...`);
    console.log('='.repeat(50));
    
    uploadResults[serviceType] = {};

    for (const subService of subServices) {
      // Skip excluded folders
      if (EXCLUDE_FOLDERS.includes(subService)) {
        console.log(`⏭️  Skipping ${subService} (already uploaded)`);
        continue;
      }

      try {
        const results = await uploadServiceImages(serviceType, subService);
        uploadResults[serviceType][subService] = results;
        totalUploaded += results.length;
      } catch (error) {
        console.error(`❌ Error processing ${serviceType}/${subService}: ${error.message}`);
        totalFailed++;
      }
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Summary Report
  console.log('\n' + '='.repeat(60));
  console.log('📊 BULK UPLOAD SUMMARY');
  console.log('='.repeat(60));
  
  for (const [serviceType, subServices] of Object.entries(uploadResults)) {
    const serviceTotal = Object.values(subServices).flat().length;
    console.log(`\n📁 ${serviceType.toUpperCase()}: ${serviceTotal} images uploaded`);
    
    for (const [subService, results] of Object.entries(subServices)) {
      if (results.length > 0) {
        console.log(`  └─ ${subService}: ${results.length} images`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`🎉 BULK UPLOAD COMPLETED!`);
  console.log(`⏱️  Duration: ${duration} seconds`);
  console.log(`✅ Total Uploaded: ${totalUploaded} images`);
  console.log(`❌ Total Failed: ${totalFailed} folders`);
  console.log('='.repeat(60));

  // Save results to file for reference
  const resultsFile = path.join(__dirname, 'bulk-upload-results.json');
  fs.writeFileSync(resultsFile, JSON.stringify(uploadResults, null, 2));
  console.log(`\n📄 Results saved to: ${resultsFile}`);

  return uploadResults;
}

// Run the bulk upload
bulkUploadAllImages()
  .then(() => {
    console.log('\n🎊 All images have been successfully uploaded to Cloudinary!');
    console.log('🚀 You can now view them in your frontend application.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Bulk upload failed:', error);
    process.exit(1);
  });
