'use strict';

const mongoose = require('mongoose');

const SupportedLanguages = ['en', 'fr', 'pt', 'es', 'ru', 'zh'];

const IndustryStatTranslationSchema = new mongoose.Schema(
  {
    label: { type: String },
    description: { type: String }
  },
  { _id: false }
);

const IndustryStatSchema = new mongoose.Schema(
  {
    number: { 
      type: String, 
      required: true,
      trim: true
    },
    label: { 
      type: String, 
      required: true,
      trim: true,
      index: true
    },
    description: { 
      type: String, 
      required: true,
      trim: true
    },
    order: {
      type: Number,
      default: 0,
      index: true
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    translations: {
      type: Map,
      of: IndustryStatTranslationSchema,
      default: {},
    }
  },
  { timestamps: true }
);

// Indexes for better query performance
IndustryStatSchema.index({ order: 1, isActive: 1 });
IndustryStatSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('IndustryStat', IndustryStatSchema);





