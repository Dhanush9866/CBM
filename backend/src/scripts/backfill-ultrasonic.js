'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const Section = require('../models/Section');
const Page = require('../models/Page');

const MONGODB_URI = "mongodb+srv://cbm360tiv:MiiFze4xYGr6XNji@cluster0.sf6iagh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  || process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm';

const PAGE_SLUG = 'inspection';
const SECTION_ID = 'it-maintenance-services';

const DATA = {
  "service": "IT Maintenance Services",
  "sections": [
    {
      "heading": "Overview",
      "content": "At CBM 360 TIV, we deliver comprehensive inspection, monitoring, and verification solutions for IT infrastructure and data systems, ensuring continuous uptime, cybersecurity integrity, and compliance with global IT service standards. Our services cover the full lifecycle of data centres, servers, networking systems, communication lines, and control centres—supporting mission-critical digital operations for industrial, defence, and enterprise clients worldwide."
    },
    {
      "heading": "Industry Focus",
      "content": [
        "Data Centres",
        "Control Rooms",
        "Communication Systems",
        "Cloud Infrastructure",
        "Networking Equipment",
        "Industrial Automation Systems",
        "Edge Computing Units",
        "Server Farms",
        "SCADA & PLC Systems",
        "Cybersecurity Monitoring"
      ]
    },
    {
      "heading": "About the Sector",
      "content": "Modern industries rely on digital connectivity and uninterrupted IT systems to maintain safety, production, and operational control. Unplanned downtime, hardware degradation, or security breaches can disrupt operations and lead to major financial and compliance risks. Through Condition-Based Monitoring (CBM), Preventive Maintenance, and Infrastructure Verification, CBM 360 TIV ensures IT systems perform reliably, efficiently, and securely—minimizing failures and extending equipment lifespan."
    },
    {
      "heading": "Key Benefits of CBM 360 TIV IT Services",
      "content": [
        "Operational Continuity: Ensures 24/7 system reliability through proactive health checks and performance monitoring.",
        "Predictive Maintenance: Utilizes data-driven insights (vibration, thermal, and electrical analysis) to forecast hardware or cooling failures.",
        "Cyber-Physical Integrity: Monitors both digital and physical layers for threats, electrical anomalies, or equipment degradation.",
        "Regulatory Compliance: Aligns with ISO 20000 (IT Service Management), ISO 27001 (Information Security), and ISO 22301 (Business Continuity).",
        "Energy Efficiency & Sustainability: Implements optimized cooling, power usage, and environmental monitoring strategies to reduce carbon footprint.",
        "Independent Third-Party Verification: Provides unbiased inspection and validation of IT hardware, UPS systems, data cabling, and environmental controls.",
        "Lifecycle Assurance: Manages continuous performance verification and upgrade audits for long-term infrastructure reliability."
      ]
    },
    {
      "heading": "Service Scope",
      "content": [
        "Data Centre Inspection & Certification: Environmental, power, and redundancy audits for Tier I–IV data centres.",
        "Condition-Based Monitoring (CBM 360°): Real-time monitoring of electrical systems, cooling fans, UPS units, and server performance parameters.",
        "Thermal & Electrical Analysis: Thermal imaging, electrical load testing, and harmonic distortion monitoring to detect overheating or imbalance.",
        "Network Infrastructure Testing: Cable certification, connectivity audits, and latency verification for high-availability networks.",
        "Server & Hardware Maintenance: Component-level testing, firmware verification, and lifecycle management of servers and storage systems.",
        "Power & Cooling System Verification: UPS, HVAC, and backup generator performance assessment to ensure stable IT operations.",
        "Cybersecurity & Compliance Audits: Review of system integrity, access control, and disaster recovery readiness.",
        "Calibration & Measurement Assurance: Precision calibration of sensors, meters, and environmental monitoring equipment."
      ]
    },
    {
      "heading": "Our Commitment",
      "content": "CBM 360 TIV – Ensuring Reliable, Secure, and Efficient IT Infrastructure Through Technical Verification and Predictive Maintenance."
    }
  ]
}



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
    page = await Page.create({ title: 'Testing & Inspection', slug: PAGE_SLUG, language: 'en', isActive: true });
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
    console.log('✅ Ultrasonic testing section upserted');
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
