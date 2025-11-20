'use strict';

/**
 * Utility script to remove legacy `pdfUrl` fields from all blog documents.
 *
 * Usage:
 *   node src/scripts/remove-blog-pdf-urls.js           # destructive run
 *   node src/scripts/remove-blog-pdf-urls.js --dry-run # preview only
 */

const mongoose = require('mongoose');
require('dotenv').config();

const Blog = require('../models/Blog');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cbm';
const isDryRun = process.argv.includes('--dry-run') || process.argv.includes('-d');

async function connectDB() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

async function removePdfUrls() {
  const filter = { pdfUrl: { $exists: true } };

  const totalWithPdf = await Blog.countDocuments(filter);
  console.log(`📄 Blogs containing pdfUrl field: ${totalWithPdf}`);

  if (totalWithPdf === 0) {
    console.log('✅ No documents require cleanup.');
    return;
  }

  if (isDryRun) {
    const samples = await Blog.find(filter)
      .select('_id title pdfUrl')
      .limit(5)
      .lean();

    console.log('🔍 Dry run mode — sample documents with pdfUrl:');
    samples.forEach(doc => {
      console.log(` - ${doc._id}: "${doc.title}" → ${doc.pdfUrl || '(empty string)'}`);
    });
    console.log('\nRun without --dry-run to remove these fields.');
    return;
  }

  const result = await Blog.updateMany(filter, { $unset: { pdfUrl: '' } });

  console.log('🧹 Cleanup complete.');
  console.log(`   Matched documents: ${result.matchedCount ?? result.n}`);
  console.log(`   Modified documents: ${result.modifiedCount ?? result.nModified}`);
}

async function main() {
  await connectDB();
  try {
    await removePdfUrls();
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

main();

