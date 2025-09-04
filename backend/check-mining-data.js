const mongoose = require('mongoose');
const Section = require('./src/models/Section');
require('dotenv').config();

async function checkMiningMetalsData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cbm');
    
    const miningSection = await Section.findOne({ 
      title: { $regex: /Mining.*Metals/i } 
    });
    
    if (miningSection) {
      console.log('=== MINING & METALS SECTION DATA ===');
      console.log('Title:', miningSection.title);
      console.log('Section ID:', miningSection.sectionId);
      console.log('Page:', miningSection.page);
      console.log('Language:', miningSection.language);
      console.log('Images:', miningSection.images);
      console.log('\n=== BODY TEXT FORMAT ===');
      console.log('Body Text Length:', miningSection.bodyText.length);
      console.log('\n=== BODY TEXT CONTENT ===');
      console.log(miningSection.bodyText);
      console.log('\n=== BODY TEXT STRUCTURE ===');
      const paragraphs = miningSection.bodyText.split('\n\n');
      console.log('Number of paragraphs:', paragraphs.length);
      paragraphs.forEach((p, i) => {
        console.log(`Paragraph ${i + 1} (length: ${p.length}):`, p.substring(0, 100) + '...');
      });
    } else {
      console.log('Mining & Metals section not found');
    }
    
    // Check all industries sections
    const allIndustries = await Section.find({ page: 'industries' });
    console.log('\n=== ALL INDUSTRIES SECTIONS ===');
    allIndustries.forEach((section, i) => {
      console.log(`${i + 1}. ${section.title} (ID: ${section.sectionId})`);
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkMiningMetalsData();
