'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const Section = require('../models/Section');
const Page = require('../models/Page');

const MONGODB_URI = "mongodb+srv://cbm360tiv:MiiFze4xYGr6XNji@cluster0.sf6iagh.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster" || 'mongodb://localhost:27017/cbm';

const PAGE_SLUG = 'innovation-rd';
const SECTION_ID = 'section-3';

const DATA = {
  service: 'Future Roadmap – Smart Industry 4.0 Transformation',
  sections: [
    {
      heading: 'Future Roadmap – Smart Industry 4.0 Transformation',
      content: 'We continuously invest in R&D and emerging technologies to stay ahead of industrial challenges.'
    },
    {
      heading: 'Our Focus Areas',
      content: [
        '**5G-Enabled Remote Monitoring:** Ultra-fast, low-latency inspection networks.',
        '**Digital Twin Ecosystems:** Advanced asset lifecycle & failure prediction.',
        '**Smart Factories:** End-to-end IoT integration for predictive maintenance.',
        '**Green Energy & Sustainability:** CBM solutions for wind, solar, and hydrogen plants.'
      ]
    },
    {
      heading: 'Value Proposition',
      content: [
        '**24/7 Global Reach:** Inspectors & Experts across all continents.',
        '**Certified Professionals:** Compliance with ISO, ASME, API, ASTM, EN standards.',
        '**Industry Coverage:** Oil & Gas (Onshore/Offshore), Mining, Marine, FPSO/FSO, Power, and Infrastructure.',
        '**Innovation Driven:** IoT, AI, Robotics, Digital Twin, and Industry 4.0.'
      ]
    },
    {
      heading: 'Tagline',
      content: '"360° Worldwide – Redefining Testing, Inspection, and Monitoring through IoT, AI & Robotics."'
    }
  ]
};

function toMarkdown(data) {
  const lines = [];
  lines.push(`# ${data.service}`);
  for (const section of data.sections) {
    if (section.heading) lines.push(`\n## ${section.heading}`);
    if (Array.isArray(section.content)) {
      for (const bullet of section.content) {
        lines.push(`- ${bullet}`);
      }
    } else if (typeof section.content === 'string') {
      lines.push(section.content);
    }
  }
  return lines.join('\n\n');
}

async function ensurePage() {
  let page = await Page.findOne({ slug: PAGE_SLUG });
  if (!page) {
    page = await Page.create({ title: 'Innovation & R&D', slug: PAGE_SLUG, language: 'en', isActive: true });
  }
  return page;
}

async function upsertSection() {
  await ensurePage();
  const existing = await Section.findOne({ sectionId: SECTION_ID, language: 'en' });
  const update = {
    title: DATA.service,
    bodyText: toMarkdown(DATA),
    page: PAGE_SLUG,
    isActive: true
  };
  if (existing) {
    await Section.updateOne({ _id: existing._id }, { $set: update });
    return existing._id;
  }
  const created = await Section.create({ ...update, sectionId: SECTION_ID, language: 'en' });
  return created._id;
}

async function linkSectionToPage(sectionId) {
  const page = await Page.findOne({ slug: PAGE_SLUG }).populate('sections');
  const already = (page.sections || []).some((s) => String(s._id) === String(sectionId));
  if (!already) {
    page.sections = [...(page.sections || []).map((s) => s._id), sectionId];
    await page.save();
  }
}

async function main() {
  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected');
  try {
    const sectionId = await upsertSection();
    await linkSectionToPage(sectionId);
    console.log(`✅ ${DATA.service} section upserted`);
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected');
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
