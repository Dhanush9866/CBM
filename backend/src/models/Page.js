'use strict';

const mongoose = require('mongoose');

const SupportedLanguages = ['en', 'fr', 'pt', 'es', 'ru'];

const TranslationSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const PageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true, index: true },
    language: { type: String, enum: SupportedLanguages, default: 'en', index: true },
    pageNumber: { type: Number, index: true },
    isActive: { type: Boolean, default: true, index: true },
    sections: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Section' 
    }],
    translations: {
      // Pre-stored translations for static content
      type: Map,
      of: TranslationSchema,
      default: {},
    },
    metadata: {
      keywords: [{ type: String }],
      author: { type: String },
      lastModified: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
PageSchema.index({ language: 1, isActive: 1 });
PageSchema.index({ createdAt: -1 });
PageSchema.index({ title: 'text', description: 'text' });

// Virtual for getting sections count
PageSchema.virtual('sectionsCount').get(function() {
  return this.sections ? this.sections.length : 0;
});

// Ensure virtual fields are serialized
PageSchema.set('toJSON', { virtuals: true });
PageSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Page', PageSchema);
