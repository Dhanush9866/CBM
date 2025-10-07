'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Page = require('../models/Page');
const Section = require('../models/Section');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm';

// Map page slugs to category names
const PAGE_SLUG_MAP = {
  'testing': 'testing',
  'inspection': 'inspection',
  'auditing': 'auditing',
  'verification-certification': 'verification-certification'
};

async function main() {
  const configPath = path.join(__dirname, './new-services.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  await mongoose.connect(MONGODB_URI);
  try {
    for (const [pageSlug, slugs] of Object.entries(config)) {
      const page = await Page.findOne({ slug: pageSlug }).exec();
      if (!page) {
        console.warn(`⚠️  Page not found for slug: ${pageSlug}. Skipping.`);
        continue;
      }

      const sections = await Section.find({ page: PAGE_SLUG_MAP[pageSlug], sectionId: { $in: slugs } }).select('_id sectionId').exec();
      if (sections.length === 0) {
        console.warn(`⚠️  No sections found to attach for page ${pageSlug}`);
        continue;
      }

      const sectionIdsToAdd = sections
        .map(s => s._id)
        .filter((_id) => !page.sections.some((existingId) => existingId.equals(_id)));

      if (sectionIdsToAdd.length === 0) {
        console.log(`ℹ️  All sections already attached to page ${pageSlug}`);
        continue;
      }

      page.sections.push(...sectionIdsToAdd);
      await page.save();
      console.log(`✅ Attached ${sectionIdsToAdd.length} sections to page ${pageSlug}`);
    }
  } catch (err) {
    console.error('Attach failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  main();
}


