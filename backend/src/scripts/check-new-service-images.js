'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Section = require('../models/Section');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm';

async function main() {
  const configPath = path.join(__dirname, './new-services.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  await mongoose.connect(MONGODB_URI);
  try {
    const results = [];
    for (const [page, slugs] of Object.entries(config)) {
      for (const sectionId of slugs) {
        const doc = await Section.findOne({ page, sectionId }).lean();
        results.push({
          page,
          sectionId,
          found: !!doc,
          coverPhoto: doc?.coverPhoto || null,
          imagesCount: Array.isArray(doc?.images) ? doc.images.length : 0,
        });
      }
    }

    console.table(results.map(r => ({
      page: r.page,
      sectionId: r.sectionId,
      found: r.found,
      hasCover: !!r.coverPhoto,
      images: r.imagesCount,
    })));

  } catch (err) {
    console.error('Check failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  main();
}


