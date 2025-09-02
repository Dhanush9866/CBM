'use strict';

const { connectToDatabase } = require('../setup/database');
const DataSeeder = require('../utils/seeder');
const { logger } = require('../setup/logger');

// Sample data for the new page and sections
const samplePageData = {
  title: 'Innovation & Research and Development (R&D)',
  description: 'We are pioneers in Condition-Based Monitoring (CBM), Technical Industrial Verification (TIV), and advanced R&D services, delivering next-generation solutions powered by IoT, AI, Robotics, and Industry 4.0 technologies. Our mission is to enhance safety, reliability, and sustainability across industries through intelligent monitoring, inspection, and verification systems.',
  slug: 'innovation-rd',
  language: 'en',
  pageNumber: 1,
  isActive: true,
  metadata: {
    keywords: ['innovation', 'rd', 'iot', 'ai', 'robotics', 'industry-4-0', 'cbm', 'monitoring', 'digital-twin'],
    author: 'Seed Script',
    lastModified: new Date()
  }
};

const sampleSectionsData = [
  {
    title: 'CBM 360° – IoT & AI Condition Monitoring Systems',
    bodyText: "Our Condition-Based Monitoring (CBM 360°) solutions provide realtime asset health insights for rotating machinery, pipelines, offshore structures, and civil infrastructure.\n\nCapabilities\n\n• Wireless CBM Sensor Nodes: Designed with Wi-Fi 6 & Bluetooth 6.0 for industrial rotating equipment & structural health monitoring.\n• Smart Sensor Integration: Embedded vibration, thermal, strain, and acoustic sensors with microcontrollers (ESP32, STM32, nRF).\n• Edge Computing & AI: Deployed AI models directly on sensors for anomaly detection & predictive maintenance.\n• Cloud-Based IoT Pipeline: Implemented MQTT + database infrastructure for remote monitoring, reporting, and trend analysis.\n\nApplications: Power plants, refineries, FPSOs, offshore jackets, mining equipment, and bridges.",
    images: [],
    language: 'en',
    pageNumber: 1,
    sectionId: 'section-1',
    page: 'innovation-rd',
    isActive: true,
    translations: {
    }
  },
  {
    title: 'AI & Robotics in NDT Testing & Inspection',
    bodyText: "We integrate AI and robotics into traditional NDT services for higher accuracy, efficiency, and operator safety.\n\nKey innovations include:\n\n• AI-Powered NDT – Automated flaw detection in ultrasonic, radiographic, thermographic inspections.\n• Robotic Inspection – Crawlers, UAVs, and drones for high-risk inspections in pipelines, tanks, jackets, chimneys, and offshore assets.\n• Digital Twin Technology – Real-time 3D replicas of assets for structural health monitoring and lifecycle management.\n• Augmented Reality (AR) – Remote collaboration and inspection visualization.",
    images: [],
    language: 'en',
    pageNumber: 2,
    sectionId: 'section-2',
    page: 'innovation-rd',
    isActive: true,
    translations: {
    }
  },{
    title: 'Future Roadmap – Smart Industry 4.0 Transformation',
    bodyText: "We continuously invest in R&D and emerging technologies to stay ahead of industrial challenges.\n\nOur Focus Areas\n5G-Enabled Remote Monitoring – ultra-fast, low-latency inspection networks\nDigital Twin Ecosystems – advanced asset lifecycle & failure prediction\nSmart Factories – end-to-end IoT integration for predictive maintenance\nGreen Energy & Sustainability – CBM solutions for wind, solar, and hydrogen plants\n\nValue Proposition\n24/7 Global Reach – Inspectors & Experts across all continents\nCertified Professionals – Compliance with ISO, ASME, API, ASTM, EN standards\nIndustry Coverage – Oil & Gas (Onshore/Offshore), Mining, Marine, FPSO/FSO, Power, and Infrastructure\nInnovation Driven – IoT, AI, Robotics, Digital Twin, and Industry 4.0\n\nTagline:\n“360° Worldwide – Redefining Testing, Inspection, and Monitoring through IoT, AI & Robotics.”",
    images: [],
    language: 'en',
    pageNumber: 2,
    sectionId: 'section-3',
    page: 'innovation-rd',
    isActive: true,
    translations: {
    }
  }
];

async function seedPageWithSections() {
  try {
    // Connect to database
    await connectToDatabase();
    logger.info('🔌 Connected to database');

    // Initialize seeder
    const seeder = new DataSeeder();

    // Step 1: Create sections first
    logger.info('📝 Step 1: Creating sections...');
    const sectionsResult = await seeder.createSections(sampleSectionsData);
    
    if (sectionsResult.some(r => r.error)) {
      logger.error('❌ Some sections failed to create');
      sectionsResult.forEach((result, index) => {
        if (result.error) {
          logger.error(`   Section ${index + 1}: ${result.error}`);
        }
      });
      throw new Error('Section creation failed');
    }
    
    logger.info(`✅ Created ${sectionsResult.length} sections successfully`);

    // Step 2: Create page with references to sections
    logger.info('📄 Step 2: Creating page with sections...');
    
    // Get the created sections to reference them in the page
    const createdSections = sectionsResult.map(section => section._id);
    const pageDataWithSections = {
      ...samplePageData,
      sections: createdSections
    };
    
    const pageResult = await seeder.createPage(pageDataWithSections);
    logger.info(`✅ Page created successfully: ${pageResult.title} (${pageResult.slug})`);

    // Step 3: Display summary
    logger.info('📊 Seeding Summary:');
    logger.info(`   Sections: ${sectionsResult.length}`);
    logger.info(`   Page: 1`);
    logger.info(`   Page Slug: ${pageResult.slug}`);
    logger.info(`   Sections in Page: ${pageResult.sections.length}`);

    // Step 4: Verify the data
    logger.info('🔍 Step 3: Verifying data...');
    await verifyData();

    logger.info('🎉 Page and sections seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    logger.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

async function verifyData() {
  const Section = require('../models/Section');
  const Page = require('../models/Page');

  // Check sections
  const sectionsCount = await Section.countDocuments({ page: 'innovation-rd' });
  logger.info(`   ✅ Found ${sectionsCount} sections for sample-page`);

  // Check page
  const page = await Page.findOne({ slug: 'innovation-rd' }).populate('sections');
  if (page) {
    logger.info(`   ✅ Found page: "${page.title}" with ${page.sections.length} sections`);
    
    // Display section details
    page.sections.forEach((section, index) => {
      logger.info(`     Section ${index + 1}: "${section.title}" (${section.sectionId})`);
      logger.info(`       Language: ${section.language}`);
      logger.info(`       Page Number: ${section.pageNumber}`);
    });
  } else {
    logger.error('   ❌ Page not found');
  }

  // Display sample data
  logger.info('\n📋 Sample Data Preview:');
  logger.info(`   Page Title: ${page.title}`);
  logger.info(`   Page Description: ${page.description}`);
  logger.info(`   Page Slug: ${page.slug}`);
  logger.info(`   Total Sections: ${page.sections.length}`);
}

// Function to clear the seeded data
async function clearSeededData() {
  try {
    await connectToDatabase();
    logger.info('🔌 Connected to database');

    const Section = require('../models/Section');
    const Page = require('../models/Page');

    // Delete the page and its sections
    const page = await Page.findOne({ slug: 'sample-page' });
    if (page) {
      await Page.deleteOne({ slug: 'sample-page' });
      logger.info('🗑️ Deleted sample page');
    }

    const sectionsResult = await Section.deleteMany({ page: 'sample-page' });
    logger.info(`🗑️ Deleted ${sectionsResult.deletedCount} sections`);

    logger.info('✅ Seeded data cleared successfully');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Failed to clear data:', error.message);
    process.exit(1);
  }
}

// Run the seeder if this file is executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('clear')) {
    logger.info('🧹 Clearing seeded data...');
    clearSeededData();
  } else {
    logger.info('🌱 Starting page and sections seeding...');
    seedPageWithSections();
  }
}

module.exports = { seedPageWithSections, clearSeededData };
