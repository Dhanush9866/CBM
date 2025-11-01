'use strict';

const Section = require('../models/Section');
const IndustryStat = require('../models/IndustryStat');
const { ApiError } = require('../utils/error');
const { translateText } = require('../services/translation');
const translations = require('../transalations/static.transalations.js');

async function translateSection(req, res, next) {
  try {
    const { id } = req.params;
    const lang = (req.query.lang || 'en').toLowerCase();
    if (!['en', 'fr', 'pt', 'es', 'ru', 'zh'].includes(lang)) throw new ApiError(400, 'Unsupported lang');

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

async function getStaticTranslations(req, res, next) {
  try {
    console.log(req.params.lang);
    const lang = req.params.lang || 'en';
    
    if (!['en', 'fr', 'pt', 'es', 'ru', 'zh'].includes(lang)) {
      throw new ApiError(400, 'Unsupported language. Supported languages: en, fr, pt, es, ru, zh');
    }

    const staticTexts = translations[lang];
    if (!staticTexts) {
      throw new ApiError(404, 'Translations not found for the specified language');
    }

    // Fetch industry stats from database
    try {
      const stats = await IndustryStat.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
      const statsObj = stats.map(stat => {
        const statObj = stat.toObject();
        
        // Handle language translation for stats
        if (lang !== 'en') {
          let translations = null;
          
          if (stat.translations instanceof Map) {
            translations = stat.translations.get(lang);
          } else if (statObj.translations && typeof statObj.translations === 'object') {
            translations = statObj.translations[lang];
          }

          if (translations) {
            return {
              number: statObj.number,
              label: translations.label || statObj.label,
              description: translations.description || statObj.description
            };
          }
        }
        
        return {
          number: statObj.number,
          label: statObj.label,
          description: statObj.description
        };
      });

      // Merge industry stats into translations object
      const result = {
        ...staticTexts,
        industryStats: statsObj.length > 0 ? statsObj : (staticTexts.industryStats || [])
      };

      res.json({
        success: true,
        data: {
          language: lang,
          translations: result,
          timestamp: new Date().toISOString()
        }
      });
    } catch (statsError) {
      console.error('Error fetching industry stats:', statsError);
      // Fallback to static translations if DB fetch fails
      res.json({
        success: true,
        data: {
          language: lang,
          translations: staticTexts,
          timestamp: new Date().toISOString()
        }
      });
    }
  } catch (err) {
    next(err);
  }
}

async function getAllStaticTranslations(req, res, next) {
  try {
    res.json({
      success: true,
      data: {
        supportedLanguages: ['en', 'fr', 'pt', 'es', 'ru', 'zh'],
        translations: translations,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getSlidesData(req, res, next) {
  try {
    const lang = req.params.lang || 'en';
    
    if (!['en', 'fr', 'pt', 'es', 'ru', 'zh'].includes(lang)) {
      throw new ApiError(400, 'Unsupported language. Supported languages: en, fr, pt, es, ru, zh');
    }

    const slidesData = translations[lang]?.pages?.services?.slides;
    if (!slidesData) {
      throw new ApiError(404, 'Slides data not found for the specified language');
    }

    res.json({
      success: true,
      data: {
        language: lang,
        slides: slidesData,
        count: slidesData.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { translateSection, getStaticTranslations, getAllStaticTranslations, getSlidesData };


