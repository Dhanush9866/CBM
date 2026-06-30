require('dotenv').config();
const mongoose = require('mongoose');
const Section = require('./src/models/Section');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    const sections = await Section.find({ 
      $or: [
        { title: { $regex: /Health, Safety/i } },
        { title: { $regex: /HSE/i } }
      ]
    });

    console.log(JSON.stringify(sections.map(s => ({ 
      title: s.title, 
      coverPhoto: s.coverPhoto, 
      images: s.images 
    })), null, 2));

    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
