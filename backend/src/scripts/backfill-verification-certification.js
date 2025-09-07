'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const Section = require('../models/Section');
const Page = require('../models/Page');

const MONGODB_URI = "mongodb+srv://cbm360tiv_db_user:ghtVDlZZEZRwzGOW@cluster0.wizvkjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || 'mongodb://localhost:27017/cbm';

const PAGE_SLUG = 'about';
const SECTION_ID = 'main';

const ABOUT_US = {
  service: 'About Us',
  sections: [
    {
      heading: 'INSPECTORS 360 – Company Profile',
      content: [
        'Head Office: United Kingdom',
        'Branch Offices: Dubai (UAE) | Hong Kong',
        'Established: 18 Years Ago'
      ]
    },
    {
      heading: 'Who We Are',
      content: 'INSPECTORS 360 is a trusted global partner in Recruitment, Contract Staffing, Payroll, HR, and Technical Support Solutions for the world\'s most demanding industries. With 18 years of proven expertise, we specialize in connecting clients with certified inspectors, technical staff, and industrial equipment—ensuring operational excellence, compliance, and safety across every project.'
    },
    {
      heading: 'Our Mission',
      content: 'Our core mission is to deliver flexible, reliable, and industry-compliant workforce solutions that meet the unique needs of Oil & Gas, Mining, FPSO/FSO, and Industrial Sectors worldwide.'
    },
    {
      heading: 'Our Services',
      content: [
        'Recruitment & Selection',
        'Contract Staffing',
        'Technical Staff & Industrial Equipment Supply',
        'Payroll & HR Administration',
        'Background Verification (BGV) Services',
        'Mobilization & Logistics Support',
        'Training & Certification Support'
      ]
    },
    {
      heading: 'Why Choose INSPECTORS 360?',
      content: [
        '18 Years of Global Experience in inspection workforce solutions',
        'Worldwide Talent Pool of certified inspectors & technical staff',
        'Comprehensive Service Coverage – recruitment, staffing, payroll, logistics, equipment, and training under one provider',
        'International Compliance with ISO, API, ASME, AWS, and industry standards',
        'Fast Deployment for urgent projects, shutdowns, and audits'
      ]
    },
    {
      heading: 'Industries We Serve',
      content: [
        'Oil & Gas (Onshore & Offshore)',
        'FPSO / FSO Vessels',
        'Mining & Metals'
      ]
    },
    {
      heading: 'Our Commitment',
      content: 'At INSPECTORS 360, we believe inspection is more than compliance—it is the backbone of safety, reliability, and operational success. By combining expert people, precision tools, and strong global support, we ensure our clients achieve excellence in every project.'
    },
    {
      heading: 'Tagline',
      content: '"INSPECTORS 360 – Global Workforce. Local Expertise. Guaranteed Compliance."'
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
    title: ABOUT_US.service,
    bodyText: toMarkdown(ABOUT_US),
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
    console.log(`✅ ${ABOUT_US.service} section upserted`);
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