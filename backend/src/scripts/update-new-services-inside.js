'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const Section = require('../models/Section');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listInsideUrls(serviceType, slug) {
  const prefix = `cbm/${serviceType}/${slug}`;
  const res = await cloudinary.api.resources({ type: 'upload', prefix, max_results: 500 });
  return res.resources
    .filter(r => !/\/cover-photo$/.test(r.public_id))
    .map(r => r.secure_url);
}

async function main() {
  const configPath = path.join(__dirname, './new-services.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  await mongoose.connect(MONGODB_URI);
  try {
    for (const [serviceType, slugs] of Object.entries(config)) {
      for (const slug of slugs) {
        const urls = await listInsideUrls(serviceType, slug);
        if (!urls || urls.length === 0) {
          console.log(`⚠️  No inside images found for ${serviceType}/${slug}`);
          continue;
        }
        const res = await Section.updateOne(
          { page: serviceType, sectionId: slug },
          { $set: { images: urls } },
          { runValidators: false }
        );
        if (res.matchedCount === 0) {
          console.log(`⚠️  Section not found: ${serviceType}/${slug}`);
        } else {
          console.log(`✅ Updated images (${urls.length}) for ${serviceType}/${slug}`);
        }
      }
    }
  } catch (err) {
    console.error('Update inside images failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  main();
}


