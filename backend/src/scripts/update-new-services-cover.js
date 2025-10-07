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

async function findCoverUrl(serviceType, slug) {
  // Look for a resource with public_id ending in '/cover-photo'
  const prefix = `cbm/${serviceType}/${slug}`;
  const result = await cloudinary.api.resources({ type: 'upload', prefix, max_results: 100 });
  const cover = result.resources.find(r => /\/cover-photo$/.test(r.public_id))
    || result.resources.find(r => /cover.*photo/i.test(r.public_id))
    || result.resources[0];
  return cover ? cover.secure_url : null;
}

async function main() {
  const configPath = path.join(__dirname, './new-services.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  await mongoose.connect(MONGODB_URI);
  try {
    for (const [serviceType, slugs] of Object.entries(config)) {
      for (const slug of slugs) {
        const url = await findCoverUrl(serviceType, slug);
        if (!url) {
          console.log(`⚠️  No cover found in Cloudinary for ${serviceType}/${slug}`);
          continue;
        }
        // Try exact match first
        let res = await Section.updateOne(
          { page: serviceType, sectionId: slug },
          { $set: { coverPhoto: url } },
          { runValidators: false }
        );
        // If not matched, try with suffix trimmed (e.g., remove trailing -cei/-aci etc.)
        if (res.matchedCount === 0) {
          const trimmed = slug.replace(/-[a-z]{2,5}$/i, '');
          res = await Section.updateOne(
            { page: serviceType, sectionId: trimmed },
            { $set: { coverPhoto: url } },
            { runValidators: false }
          );
        }
        if (res.matchedCount === 0) {
          // As a last resort, set an empty coverPhoto field on any likely section by title contains first words
          const titleStarts = slug.split('-').slice(0, 3).join(' ');
          await Section.updateMany(
            { page: serviceType, coverPhoto: { $exists: false }, title: new RegExp(titleStarts.replace(/[-/\\]/g, ' '), 'i') },
            { $set: { coverPhoto: url } },
            { runValidators: false }
          );
        }
        console.log(`✅ Set coverPhoto for ${serviceType}/${slug}`);
      }
    }
  } catch (err) {
    console.error('Update covers failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  main();
}


