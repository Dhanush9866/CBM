'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listInsideUrls(serviceType, slug) {
  const prefix = `cbm/${serviceType}/${slug}`;
  const result = await cloudinary.api.resources({ type: 'upload', prefix, max_results: 200 });
  return result.resources
    .filter(r => !/\/cover-photo$/.test(r.public_id))
    .map(r => r.secure_url);
}

async function main() {
  const configPath = path.join(__dirname, './new-services.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // DB not strictly required here, but keep consistency in env usage
  await mongoose.connect(MONGODB_URI).catch(() => {});
  try {
    const output = {};
    for (const [category, slugs] of Object.entries(config)) {
      output[category] = {};
      for (const slug of slugs) {
        try {
          const urls = await listInsideUrls(category, slug);
          output[category][slug] = urls;
        } catch (e) {
          output[category][slug] = [];
        }
      }
    }

    const targetPath = path.join(__dirname, '../../../frontend/insideimages.js');
    const fileContent = `// Auto-generated: Inside image URLs for new services\n` +
      `// Generated at ${new Date().toISOString()}\n` +
      `export default ${JSON.stringify(output, null, 2)};\n`;
    fs.writeFileSync(targetPath, fileContent, 'utf8');
    console.log(`✅ Wrote inside images to ${targetPath}`);
  } catch (err) {
    console.error('Export failed:', err);
    process.exitCode = 1;
  } finally {
    try { await mongoose.disconnect(); } catch (_) {}
  }
}

if (require.main === module) {
  main();
}


