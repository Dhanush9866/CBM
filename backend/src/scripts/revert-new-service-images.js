'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Page = require('../models/Page');
const Section = require('../models/Section');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm';

async function main() {
  const configPath = path.join(__dirname, './new-services.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  await mongoose.connect(MONGODB_URI);
  try {
    // For each category/page slug
    for (const [pageSlug, slugs] of Object.entries(config)) {
      // 1) Find target sections by page and sectionId list
      const sections = await Section.find({ page: pageSlug, sectionId: { $in: slugs } }).select('_id sectionId').exec();
      const sectionIds = sections.map(s => s._id);

      // 2) Detach from Page.sections
      const page = await Page.findOne({ slug: pageSlug }).exec();
      if (page && sectionIds.length) {
        page.sections = page.sections.filter((id) => !sectionIds.some(rem => rem.equals(id)));
        await page.save();
        console.log(`✅ Detached ${sectionIds.length} sections from page '${pageSlug}'`);
      } else {
        console.log(`ℹ️  No page or no sections to detach for '${pageSlug}'`);
      }

      // 3) Mark sections inactive and clear images
      if (sectionIds.length) {
        const res = await Section.updateMany(
          { _id: { $in: sectionIds } },
          { 
            $set: { isActive: false },
            $unset: { coverPhoto: "" },
            $setOnInsert: {}
          }
        );
        // Clear images array separately
        await Section.updateMany(
          { _id: { $in: sectionIds } },
          { $set: { images: [] } }
        );
        console.log(`✅ Marked ${res.modifiedCount} sections inactive and cleared images for '${pageSlug}'`);
      }
    }
  } catch (err) {
    console.error('Revert failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  main();
}


