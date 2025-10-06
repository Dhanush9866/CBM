'use strict';

// Upload REGULAR images (not covers) for two industries and persist URLs ONLY in MongoDB
// Usage: node src/scripts/upload-industry-images-to-db.js

const path = require('path');
const fs = require('fs');
const { glob } = require('glob');
require('dotenv').config();

const { connectToDatabase } = require('../setup/database');
const Section = require('../models/Section');
const cloudinaryService = require('../services/cloudinary');

function sanitizeKey(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uploadImagesForIndustry(displayName, files) {
  const safeSubService = sanitizeKey(displayName);
  const serviceType = 'industries';
  const uploaded = [];

  for (const file of files) {
    const result = await cloudinaryService.uploadImage(
      file,
      serviceType,
      `${safeSubService}`,
      null
    );
    uploaded.push(result.secure_url || result.url);
  }
  return uploaded;
}

async function updateSectionImagesInDb(displayName, uploadedUrls) {
  if (!uploadedUrls || uploadedUrls.length === 0) return null;

  const query = { page: 'industries', title: displayName };
  // DO NOT touch coverPhoto here; only replace images array
  const update = { $set: { images: uploadedUrls } };

  const options = { new: true };
  const updated = await Section.findOneAndUpdate(query, update, options);
  return updated;
}

async function main() {
  const repoRoot = path.resolve(__dirname, '../../..');
  const uploadsRoot = path.join(repoRoot, 'frontend', 'uploads');

  // Folders where you will place the detailed-page images
  const targets = [
    { folder: 'Mining & Metals Plants & Refineries images', name: 'Mining & Metals Plants & Refineries' },
    { folder: 'Petrochemical Plants & Refineries images', name: 'Petrochemical Plants & Refineries' }
  ];

  console.log('🚀 Uploading industry images (non-cover) and saving URLs to MongoDB...');
  console.log(`📁 Uploads directory: ${uploadsRoot}`);

  await connectToDatabase();

  for (const { folder, name } of targets) {
    const absFolder = path.join(uploadsRoot, folder);
    console.log(`\n🔍 Processing: ${name}`);

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
    const urls = await uploadImagesForIndustry(name, files);
    console.log(`  ✅ Uploaded ${urls.length} images.`);

    const updated = await updateSectionImagesInDb(name, urls);
    if (updated) {
      console.log(`  🗄️  Saved to DB: images updated for section '${updated.title}'.`);
    } else {
      console.log(`  ❓ Section not found in DB for title '${name}'.`);
    }
  }

  console.log('\n🎉 Done. URLs are stored in MongoDB. Detail pages will fetch images from DB.');
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});


