'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const cloudinaryService = require('../services/cloudinary');
const Section = require('../models/Section');

const ROOT_UPLOADS_DIR = path.join(__dirname, '../../../uploads');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm';

function findCoverPhotoFile(dir) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
  // Prefer a specifically named cover-photo.*, else fall back to the first image
  const preferred = files.find((f) => /^cover-photo\.(jpg|jpeg|png|webp)$/i.test(f));
  const pick = preferred || files[0];
  return pick ? path.join(dir, pick) : null;
}

function listInsideImages(imagesDir) {
  if (!fs.existsSync(imagesDir)) return [];
  return fs
    .readdirSync(imagesDir)
    .filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .map((f) => path.join(imagesDir, f));
}

async function connect() {
  await mongoose.connect(MONGODB_URI);
}

async function disconnect() {
  await mongoose.disconnect();
}

async function uploadForService(serviceType, slug) {
  const coverDir = path.join(ROOT_UPLOADS_DIR, 'cover-images', serviceType, slug);
  const imagesDir = path.join(ROOT_UPLOADS_DIR, 'inside-images', serviceType, slug);

  const coverFile = findCoverPhotoFile(coverDir);
  const insideFiles = listInsideImages(imagesDir);

  const subServiceFolder = slug; // keep slug as folder name in Cloudinary

  let coverUrl = null;
  if (coverFile) {
    const res = await cloudinaryService.uploadImage(coverFile, serviceType, subServiceFolder, 'cover-photo');
    coverUrl = res.url;
    console.log(`✅ Uploaded cover: ${serviceType}/${slug}`);
  } else {
    console.log(`⚠️  No cover-photo found for ${serviceType}/${slug}`);
  }

  const insideUrls = [];
  for (const filePath of insideFiles) {
    const filename = path.basename(filePath);
    const res = await cloudinaryService.uploadImage(filePath, serviceType, subServiceFolder, filename.replace(/\.[^.]+$/, ''));
    insideUrls.push(res.url);
  }
  if (insideUrls.length) {
    console.log(`✅ Uploaded ${insideUrls.length} inside images: ${serviceType}/${slug}`);
  }

  // Ensure Section document exists for this service
  await Section.findOneAndUpdate(
    { page: serviceType, sectionId: slug },
    { $setOnInsert: { title: slug, bodyText: '', isActive: true, page: serviceType } },
    { upsert: true }
  );

  // Update Section: identify by page (serviceType) and sectionId (slug)
  const update = { $set: { page: serviceType } };
  if (coverUrl) update.coverPhoto = coverUrl;
  if (insideUrls.length) update.$addToSet = { images: { $each: insideUrls } };

  if (Object.keys(update).length) {
    await Section.updateMany({ page: serviceType, sectionId: slug }, update);
    console.log(`🗄️  Updated DB for ${serviceType}/${slug}`);
  } else {
    console.log(`ℹ️  Nothing to update in DB for ${serviceType}/${slug}`);
  }
}

async function main() {
  const configPath = path.join(__dirname, './new-services.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  await connect();
  try {
    for (const [serviceType, slugs] of Object.entries(config)) {
      if (!Array.isArray(slugs)) continue;
      for (const slug of slugs) {
        await uploadForService(serviceType, slug);
      }
    }
    console.log('\n🎉 Upload complete');
  } finally {
    await disconnect();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Upload failed', err);
    process.exit(1);
  });
}

module.exports = { uploadForService };


