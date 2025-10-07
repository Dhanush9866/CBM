'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_UPLOADS_DIR = path.join(__dirname, '../../../uploads');
const CONFIG_PATH = path.join(__dirname, './new-services.config.json');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createServiceFolderStructure(serviceType, slug) {
  // uploads/cover-images/<serviceType>/<slug>/ and uploads/inside-images/<serviceType>/<slug>/
  const coverDir = path.join(ROOT_UPLOADS_DIR, 'cover-images', serviceType, slug);
  const insideDir = path.join(ROOT_UPLOADS_DIR, 'inside-images', serviceType, slug);
  ensureDir(coverDir);
  ensureDir(insideDir);
}

function main() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

  const categories = Object.keys(config);
  if (categories.length === 0) {
    console.log('No categories found in config.');
    return;
  }

  ensureDir(ROOT_UPLOADS_DIR);
  ensureDir(path.join(ROOT_UPLOADS_DIR, 'cover-images'));
  ensureDir(path.join(ROOT_UPLOADS_DIR, 'inside-images'));

  categories.forEach((category) => {
    const slugs = config[category] || [];
    if (!Array.isArray(slugs)) return;
    slugs.forEach((slug) => {
      createServiceFolderStructure(category, slug);
      console.log(`✅ Created folders for ${category}/${slug}`);
    });
  });

  console.log('\n📁 Folder scaffolding complete.');
  console.log('Place cover image files inside: uploads/cover-images/<category>/<slug>/');
  console.log('Place inside images inside: uploads/inside-images/<category>/<slug>/');
}

if (require.main === module) {
  main();
}

module.exports = { createServiceFolderStructure };


