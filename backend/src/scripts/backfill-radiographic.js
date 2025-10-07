'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const Section = require('../models/Section');
const Page = require('../models/Page');

const MONGODB_URI = "mongodb+srv://cbm360tiv:MiiFze4xYGr6XNji@cluster0.sf6iagh.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster"||process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm';

const PAGE_SLUG = 'verification-certification-services';
const SECTION_ID = 'defence-vehicle-fitness-verification-and-certification';

const DATA ={
  "service": "Defence Vehicle Fitness Verification & Certification",
  "sections": [
    {
      "heading": "Overview",
      "content": "From CBM 360 TIV – Condition Based Monitoring 360° Technical Industrial Verification\n\nDefence vehicles operate under extreme terrain, climate, and mission conditions, demanding the highest levels of mechanical integrity, mobility, and safety. Whether deployed on land, amphibious operations, or logistical support, every vehicle must undergo systematic inspection and fitness verification to ensure reliability, safety, and readiness.\n\nCBM 360 TIV provides specialized Defence Vehicle Fitness Verification & Certification Services, combining mechanical inspection, non-destructive testing (NDT), and performance evaluation to verify combat readiness and compliance with defence and international standards."
    },
    {
      "heading": "Why Choose CBM 360 TIV for Defence Vehicle Fitness Verification?",
      "content": [
        "Comprehensive inspection of armoured and tactical vehicles for structural, mechanical, and operational integrity",
        "Ensure compliance with MIL-STD, ISO, ASTM, and national defence authority standards",
        "Conduct NDT, functional testing, and mobility assessments under field conditions",
        "Verify engine, transmission, braking, steering, and suspension performance",
        "Assess fatigue, corrosion, and structural health of armour and frames",
        "Support maintenance, overhaul, and pre-deployment readiness checks",
        "Issue Fitness-for-Service (FFS) and Operational Certification Reports"
      ]
    },
    {
      "heading": "Defence Vehicle Fitness Inspection Coverage",
      "subsections": [
        {
          "title": "A. Structural & Chassis Integrity",
          "content": [
            "Frame, hull, and undercarriage inspection for cracks, fatigue, and corrosion",
            "Weld integrity testing using Magnetic Particle (MPI) or Dye Penetrant (DPI) methods",
            "Armour plate inspection for delamination, distortion, or ballistic damage",
            "Dimensional and alignment verification"
          ]
        },
        {
          "title": "B. Powertrain & Mechanical Systems",
          "content": [
            "Engine performance testing (compression, oil analysis, thermal monitoring)",
            "Transmission, gearbox, and differential condition evaluation",
            "Cooling and lubrication system efficiency verification",
            "Hydraulic and pneumatic system testing"
          ]
        },
        {
          "title": "C. Safety & Functional Systems",
          "content": [
            "Brake system efficiency and emergency brake verification",
            "Steering and suspension functionality under load",
            "Electrical and electronic systems (lighting, sensors, control units)",
            "Fire suppression, exhaust, and air filtration system inspections"
          ]
        },
        {
          "title": "D. Load, Endurance & Mobility Testing",
          "content": [
            "Load carrying and towing capacity evaluation",
            "Endurance testing under operational or simulated conditions",
            "Tire and track system wear and performance analysis",
            "Ground clearance and obstacle negotiation testing"
          ]
        }
      ]
    },
    {
      "heading": "Testing & Verification Techniques",
      "content": [
        "NDT Methods: Ultrasonic (UT), Radiography (RT), MPI, DPI, Eddy Current (ECT)",
        "Vibration & Condition Monitoring: For rotating and drivetrain components",
        "Thermography: Detecting heat buildup in mechanical and electrical systems",
        "Oil & Fluid Analysis: Identifying contamination, metal wear, and degradation",
        "Brake & Suspension Testing: Dynamic and static performance verification",
        "Alignment & Dimensional Check: Ensuring precision and operational readiness"
      ]
    },
    {
      "heading": "Applicable Standards & Guidelines",
      "content": [
        "MIL-STD 810 / 209 / 461 – US Military Standards for environmental and structural performance",
        "ISO 9001 / 45001 / 50001 – Quality, safety, and energy management systems",
        "SAE & ASTM Standards – Vehicle component testing and performance validation",
        "NATO AQAP Series – Allied Quality Assurance publications",
        "OEM & Defence Ministry Specifications – Equipment-specific compliance"
      ]
    },
    {
      "heading": "Types of Defence Vehicles Covered",
      "content": [
        "🪖 Armoured Vehicles – Tanks, APCs, IFVs, MRAPs",
        "🚛 Tactical Transport Vehicles – Troop carriers, supply trucks, refuelers",
        "🚙 Light Utility Vehicles – Patrol jeeps, reconnaissance, and communication vehicles",
        "🚒 Firefighting & Recovery Vehicles – Support and emergency response units",
        "🚜 Engineering & Maintenance Vehicles – Cranes, excavators, loaders, and logistics carriers"
      ]
    },
    {
      "heading": "Deliverables",
      "content": [
        "Structural & mechanical inspection reports",
        "NDT & condition monitoring results",
        "Fitness-for-Service (FFS) certification and compliance summary",
        "Maintenance recommendations and risk evaluation",
        "CBM 360 TIV Defence Vehicle Fitness Certificate – verifying operational readiness and compliance"
      ]
    },
    {
      "heading": "Benefits of CBM 360 TIV Defence Vehicle Fitness Verification",
      "content": [
        "Ensure mission readiness and mechanical reliability",
        "Identify defects early and prevent in-field failures",
        "Comply with military and OEM specifications",
        "Support maintenance, overhaul, and redeployment readiness programs",
        "Extend operational lifespan of defence vehicle fleets"
      ]
    },
    {
      "heading": "Conclusion",
      "content": "Assure Operational Readiness & Mission Safety\n\nCBM 360 TIV Defence Vehicle Fitness Verification & Certification Services ensure that every land, amphibious, or tactical vehicle meets the highest safety, reliability, and performance standards required for mission-critical operations.\n\nContact CBM 360 TIV today to schedule your Defence Vehicle Fitness Verification & Certification Services and ensure your fleet’s operational excellence."
    }
  ]
}





;

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
    console.log('✅ Radiographic Testing section upserted');
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
