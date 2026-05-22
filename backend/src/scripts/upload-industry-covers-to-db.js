'use strict';

// Upload cover images for two industries and persist URLs ONLY in MongoDB
// Usage: node src/scripts/upload-industry-covers-to-db.js

const path = require('path');
const fs = require('fs');
const { glob } = require('glob');
require('dotenv').config();

const { connectToDatabase } = require('../setup/database');
const Section = require('../models/Section');
const cloudService = require('../services/cloud');

function sanitizeKey(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uploadCoverImagesForIndustry(displayName, files) {
  const safeSubService = sanitizeKey(displayName);
  const serviceType = 'industries';
  const uploaded = [];

  for (const file of files) {
    const result = await cloudService.uploadImage(
      file,
      serviceType,
      `${safeSubService}/covers`,
      null
    );
    uploaded.push(result.secure_url || result.url);
  }
  return uploaded;
}

async function updateSectionInDb(displayName, uploadedUrls) {
  if (!uploadedUrls || uploadedUrls.length === 0) return null;

  // Prefer match by exact title on the industries page
  const query = { page: 'industries', title: displayName };
  const update = {
    $set: {
      coverPhoto: uploadedUrls[0],
      images: uploadedUrls
    }
  };

  const options = { new: true };
  const updated = await Section.findOneAndUpdate(query, update, options);
  return updated;
}

async function main() {
  const repoRoot = path.resolve(__dirname, '../../..');
  const uploadsRoot = path.join(repoRoot, 'frontend', 'uploads');

  const targets = [
    'Mining & Metals Plants & Refineries cover-pic',
    'Petrochemical Plants & Refineries cover-pic'
  ];

  console.log('🚀 Uploading industry cover images and saving URLs to MongoDB...');
  console.log(`📁 Uploads directory: ${uploadsRoot}`);

  await connectToDatabase();

  for (const folderName of targets) {
    const displayName = folderName.replace(' cover-pic', '');
    const absFolder = path.join(uploadsRoot, folderName);

    console.log(`\n🔍 Processing: ${displayName}`);

    if (!fs.existsSync(absFolder)) {
      console.log(`  ⚠️  Folder not found: ${absFolder}`);
      continue;
    }

    const pattern = path.join(absFolder, '*.{png,jpg,jpeg,webp}').replace(/\\/g, '/');
    const files = await glob(pattern, { nocase: true });

    if (files.length === 0) {
      console.log('  📭 No images found. Skipping.');
      continue;
    }

    console.log(`  📸 Found ${files.length} images. Uploading to Cloudinary...`);
    const urls = await uploadCoverImagesForIndustry(displayName, files);
    console.log(`  ✅ Uploaded ${urls.length} images.`);

    const updated = await updateSectionInDb(displayName, urls);
    if (updated) {
      console.log(`  🗄️  Saved to DB: coverPhoto set and images updated for section '${updated.title}'.`);
    } else {
      console.log(`  ❓ Section not found in DB for title '${displayName}'.`);
    }
  }

  console.log('\n🎉 Done. URLs are stored in MongoDB. Frontend will fetch from API/DB.');
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});


