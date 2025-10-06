'use strict';

/**
 * Translate specific sections by sectionId(s)
 * - Translates EN sections into fr/pt/es/ru
 * - Merges into `translations` Map without overwriting other languages
 *
 * Usage:
 *   node src/scripts/translate-sections-by-id.js translate <sectionId> [moreIds...] [--langs=fr,pt,es,ru]
 *   node src/scripts/translate-sections-by-id.js status <sectionId> [moreIds...]
 *
 * Examples:
 *   node src/scripts/translate-sections-by-id.js translate section-1 section-3
 *   node src/scripts/translate-sections-by-id.js translate section-2 --langs=fr,es
 *   node src/scripts/translate-sections-by-id.js status section-1 section-2
 */

const mongoose = require('mongoose');
require('dotenv').config();

const { connectToDatabase } = require('../setup/database');
const Section = require('../models/Section');
const { translateText } = require('../services/translation');

const DEFAULT_LANGS = ['fr', 'pt', 'es', 'ru' , 'zh'];

function parseLangsArg(args) {
  const langsArg = args.find(a => a.startsWith('--langs='));
  if (!langsArg) return DEFAULT_LANGS;
  const list = langsArg.split('=')[1];
  if (!list) return DEFAULT_LANGS;
  return list.split(',').map(s => s.trim()).filter(Boolean);
}

function extractIds(args) {
  return args.filter(a => !a.startsWith('--'));
}

async function fetchEnglishSectionsByIds(sectionIds) {
  const sections = await Section.find({
    sectionId: { $in: sectionIds },
    language: 'en',
    isActive: true,
  }).sort({ pageNumber: 1, sectionId: 1 });

  const foundIds = new Set(sections.map(s => s.sectionId));
  const missing = sectionIds.filter(id => !foundIds.has(id));
  if (missing.length > 0) {
    console.warn(`⚠️  Not found (EN/active): ${missing.join(', ')}`);
  }
  return sections;
}

async function translateAndSaveSection(section, targetLangs) {
  console.log(`\n🔄 Translating section: ${section.title} (sectionId: ${section.sectionId})`);
  // Prepare existing translations as plain object to merge
  const existingTranslations = section.translations && section.translations.size
    ? Object.fromEntries(section.translations)
    : {};

  for (const lang of targetLangs) {
    try {
      console.log(`   📝 ${lang.toUpperCase()}`);
      const translatedTitle = await translateText(section.title, lang);
      const translatedBody = await translateText(section.bodyText, lang);
      existingTranslations[lang] = { title: translatedTitle, bodyText: translatedBody };
      // small delay per language to be gentle on the API
      await new Promise(r => setTimeout(r, 400));
    } catch (err) {
      console.error(`   ❌ Failed ${lang}: ${err.message}`);
    }
  }

  const updated = await Section.findByIdAndUpdate(
    section._id,
    { translations: existingTranslations, updatedAt: new Date() },
    { new: true }
  );
  console.log(`💾 Saved translations for sectionId: ${section.sectionId}`);
  return updated;
}

function summarizeStatusForSections(sections, targetLangs) {
  console.log('\n📊 Translation Status');
  console.log('=====================');
  let full = 0; let partial = 0; let none = 0;
  for (const s of sections) {
    const tr = s.translations ? (s.translations.size ? Object.fromEntries(s.translations) : s.translations) : {};
    const present = Object.keys(tr || {}).filter(k => targetLangs.includes(k));
    const status = present.length === targetLangs.length ? '✅ Fully translated'
      : present.length > 0 ? '⚠️  Partially translated'
      : '❌ Not translated';
    if (status.startsWith('✅')) full++; else if (status.startsWith('⚠️')) partial++; else none++;
    console.log(`- ${s.sectionId} • ${s.title} → ${status} (${present.length}/${targetLangs.length})`);
  }
  console.log(`\nSummary → ✅ ${full} | ⚠️ ${partial} | ❌ ${none}`);
}

async function runTranslate(ids, targetLangs) {
  const sections = await fetchEnglishSectionsByIds(ids);
  if (sections.length === 0) {
    console.log('⚠️  No sections found to translate.');
    return;
  }

  let success = 0; let failed = 0;
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i];
    try {
      await translateAndSaveSection(s, targetLangs);
      success++;
      if (i < sections.length - 1) {
        console.log('⏳ Waiting 1.5s before next section...');
        await new Promise(r => setTimeout(r, 1500));
      }
    } catch (err) {
      console.error(`❌ Failed sectionId=${s.sectionId}: ${err.message}`);
      failed++;
    }
  }

  console.log('\n📈 Result');
  console.log('==========');
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📄 Total:  ${sections.length}`);
}

async function runStatus(ids, targetLangs) {
  const sections = await fetchEnglishSectionsByIds(ids);
  if (sections.length === 0) {
    console.log('⚠️  No sections found.');
    return;
  }
  summarizeStatusForSections(sections, targetLangs);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const rest = args.slice(1);
  const langs = parseLangsArg(rest);
  const ids = extractIds(rest);

  if (!command || (command !== 'translate' && command !== 'status')) {
    console.log('🚀 Translate Sections by ID');
    console.log('===========================');
    console.log('\nUsage:');
    console.log('  node src/scripts/translate-sections-by-id.js translate <sectionId> [moreIds...] [--langs=fr,pt,es,ru]');
    console.log('  node src/scripts/translate-sections-by-id.js status    <sectionId> [moreIds...] [--langs=fr,pt,es,ru]');
    console.log('\nExamples:');
    console.log('  node src/scripts/translate-sections-by-id.js translate section-1 section-3');
    console.log('  node src/scripts/translate-sections-by-id.js translate section-2 --langs=fr,es');
    console.log('  node src/scripts/translate-sections-by-id.js status section-1 section-2');
    console.log('\nDefault languages: fr, pt, es, ru');
    return;
  }

  if (ids.length === 0) {
    console.error('❌ Please provide at least one sectionId');
    process.exit(1);
  }

  try {
    await connectToDatabase();
    if (command === 'translate') {
      await runTranslate(ids, langs);
    } else {
      await runStatus(ids, langs);
    }
  } catch (err) {
    console.error('❌ Script failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { runTranslate, runStatus };


