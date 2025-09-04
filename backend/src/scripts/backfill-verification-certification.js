'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const Section = require('../models/Section');
const Page = require('../models/Page');

const MONGODB_URI = "mongodb+srv://cbm360tiv:MiiFze4xYGr6XNji@cluster0.sf6iagh.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster" || 'mongodb://localhost:27017/cbm';

const PAGE_SLUG = 'cbm';
const SECTION_ID = 'lubrication-oil-analysis';

const DATA = {
  service: 'Lubrication & Transformer Oil Analysis',
  sections: [
    {
      heading: 'Lubrication & Transformer Oil Analysis',
      content:
        'From CBM 360 TIV - Known as Condition Based Monitoring 360° Technical Industrial Verification – Ensure optimal machinery performance and extended asset life for Mining and Metal Plants, Oil & Gas Facilities, FPSO/FSO Vessels, Industrial Plants, and Power & Utility Infrastructure. Proper oil and lubrication condition is critical for preventing equipment failure and maximizing operational efficiency. CBM 360 TIV\'s Oil & Lubrication Analysis Services provide comprehensive testing and monitoring of lubricant health, contamination, and wear, ensuring your rotating and electrical equipment operates reliably in the most demanding environments.'
    },
    {
      heading: 'Why Choose Oil & Lubrication and Transformer Oil Analysis from CBM 360 TIV?',
      content: [
        'Monitor lubricant condition and contamination levels to optimize maintenance schedules',
        'Detect wear debris and particle contamination indicating internal component degradation',
        'Analyse viscosity, acid number (TAN), base number (TBN), and water content to ensure lubricant integrity',
        'Perform transformer oil testing to assess dielectric strength, moisture content, and dissolved gases for electrical asset health',
        'Prevent catastrophic failures and unplanned downtime by early detection of oil degradation',
        'Support condition-based maintenance (CBM) programs and reduce operational costs',
        'Comply with international standards and client-specific lubricant monitoring requirements'
      ]
    },
    {
      heading: 'Trusted Oil Analysis by Industry Experts',
      content:
        'CBM 360 TIV operates state-of-the-art laboratories with certified technicians and experts in oil condition monitoring (OCM). Our detailed reports deliver actionable insights to maintenance and reliability teams, enabling informed decision-making to safeguard your critical assets.'
    },
    {
      heading: 'Global Support Across All Industries',
      content: [
        'Mining and Metal Plants – Gearboxes, hydraulic systems, crushers, conveyors',
        'Industrial Manufacturing & Processing – Compressors, turbines, pumps',
        'Oil & Gas Onshore/Offshore Facilities – Drilling rigs, rotary equipment, turbines',
        'FPSO & FSO Vessels – Marine engines, thrusters, hydraulic systems',
        'Power & Utilities (Hydro, Thermal, Coal, Gas, Geo Thermal) – Generators, transformers, turbine lubricants'
      ]
    },
    {
      heading: 'Our Oil & Lubrication and Transformer Oil Analysis Services Include:',
      content: [
        'Viscosity testing and oxidation stability',
        'Particle count and wear debris analysis using ferrograph',
        'Water content determination by Karl Fischer titration',
        'Total Acid Number (TAN) and Total Base Number (TBN) measurements',
        'Dielectric breakdown voltage and moisture content testing for transformer oils',
        'Dissolved Gas Analysis (DGA) for early fault detection in transformers',
        'Customized sampling and laboratory testing with rapid turnaround',
        'Detailed reporting and recommendations for lubricant change-out or equipment inspection'
      ]
    },
    {
      heading: 'Standards We Follow:',
      content: [
        'ASTM D445, ASTM D4310, ASTM D974 – Oil viscosity, TAN, and TBN testing',
        'ISO 4406 / ISO 11171 – Particle contamination and cleanliness',
        'ASTM D3612 / IEC 60567 – Dissolved gas analysis (DGA)',
        'ASTM D1816 / IEC 60156 – Dielectric strength testing for transformer oils',
        'NACE TM 0386 – Water content in oil',
        'Project-specific OEM or EPC client standards and industry best practices'
      ]
    },
    {
      heading: 'Ready to Maximize Equipment Reliability?',
      content:
        'Partner with CBM 360 TIV to leverage expert oil and lubrication analysis for your critical assets — reducing downtime, extending service intervals, and improving plant performance. To discuss how our Oil & Lubrication and Transformer Oil Analysis Services can support your maintenance strategy, contact CBM 360 TIV today.'
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
    page = await Page.create({ title: 'CBM', slug: PAGE_SLUG, language: 'en', isActive: true });
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


