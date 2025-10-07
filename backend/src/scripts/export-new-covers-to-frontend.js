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
    const output = {};
    for (const [category, slugs] of Object.entries(config)) {
      output[category] = {};
      for (const slug of slugs) {
        const s = await Section.findOne({ page: category, sectionId: slug }).lean();
        output[category][slug] = s?.coverPhoto || '';
      }
    }

    const targetPath = path.join(__dirname, '../../../frontend/coverimages.js');
    const fileContent = `// Auto-generated: Cover image URLs for new services\n` +
      `// Generated at ${new Date().toISOString()}\n` +
      `export default ${JSON.stringify(output, null, 2)};\n`;
    fs.writeFileSync(targetPath, fileContent, 'utf8');
    console.log(`✅ Wrote cover images to ${targetPath}`);
  } catch (err) {
    console.error('Export failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  main();
}


