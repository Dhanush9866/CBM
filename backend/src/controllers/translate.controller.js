'use strict';

const Section = require('../models/Section');
const { ApiError } = require('../utils/error');
const { translateText } = require('../services/translation');

async function translateSection(req, res, next) {
  try {
    const { id } = req.params;
    const lang = (req.query.lang || 'en').toLowerCase();
    if (!['en', 'fr', 'pt', 'es', 'ru'].includes(lang)) throw new ApiError(400, 'Unsupported lang');

    const section = await Section.findById(id);
    if (!section) throw new ApiError(404, 'Section not found');

    if (lang === 'en') {
      return res.json({ success: true, data: { title: section.title, bodyText: section.bodyText, images: section.images, language: 'en' } });
    }

    const existing = section.translations?.get?.(lang);
    if (existing && (existing.title || existing.bodyText)) {
      return res.json({ success: true, data: { ...existing, images: section.images, language: lang, source: 'db' } });
    }

    const [tTitle, tBody] = await Promise.all([
      translateText(section.title, lang),
      translateText(section.bodyText, lang),
    ]);

    section.translations.set(lang, { title: tTitle, bodyText: tBody });
    await section.save();

    res.json({ success: true, data: { title: tTitle, bodyText: tBody, images: section.images, language: lang, source: 'api' } });
  } catch (err) {
    next(err);
  }
}

module.exports = { translateSection };


