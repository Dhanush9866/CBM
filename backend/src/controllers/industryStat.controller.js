'use strict';

const IndustryStat = require('../models/IndustryStat');
const { translateText } = require('../services/translation');
const { logger } = require('../setup/logger');

/**
 * Get all industry stats (active only, sorted by order)
 */
async function getAllIndustryStats(req, res) {
  try {
    const { lang, includeInactive } = req.query;
    
    const query = includeInactive === 'true' ? {} : { isActive: true };
    
    const stats = await IndustryStat.find(query).sort({ order: 1, createdAt: -1 });
    const statsObj = stats.map(stat => stat.toObject());

    // Handle language translation
    if (lang && lang !== 'en' && ['fr', 'pt', 'es', 'ru', 'zh'].includes(lang)) {
      const translatedStats = statsObj.map(stat => {
        let translations = null;
        
        // Handle Map format
        if (stat.translations && stat.translations instanceof Map) {
          translations = stat.translations.get(lang);
        } 
        // Handle Object format
        else if (stat.translations && typeof stat.translations === 'object') {
          translations = stat.translations[lang];
        }

        if (translations) {
          return {
            ...stat,
            label: translations.label || stat.label,
            description: translations.description || stat.description,
            translations: stat.translations
          };
        }
        return stat;
      });

      res.json({ success: true, data: translatedStats });
    } else {
      res.json({ success: true, data: statsObj });
    }
  } catch (error) {
    logger.error('Error fetching industry stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch industry stats' });
  }
}

/**
 * Get a single industry stat by ID
 */
async function getIndustryStatById(req, res) {
  try {
    const { id } = req.params;
    const { lang } = req.query;
    
    const stat = await IndustryStat.findById(id);
    if (!stat) {
      return res.status(404).json({ success: false, message: 'Industry stat not found' });
    }

    const statObj = stat.toObject();

    // Handle language translation
    if (lang && lang !== 'en' && ['fr', 'pt', 'es', 'ru', 'zh'].includes(lang)) {
      let translations = null;
      
      if (stat.translations instanceof Map) {
        translations = stat.translations.get(lang);
      } else if (statObj.translations && typeof statObj.translations === 'object') {
        translations = statObj.translations[lang];
      }

      if (translations) {
        return res.json({
          success: true,
          data: {
            ...statObj,
            label: translations.label || statObj.label,
            description: translations.description || statObj.description,
            translations: statObj.translations
          }
        });
      }
    }

    res.json({ success: true, data: statObj });
  } catch (error) {
    logger.error('Error fetching industry stat:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch industry stat' });
  }
}

/**
 * Create a new industry stat (auto-translates content)
 */
async function createIndustryStat(req, res) {
  try {
    const payload = req.body;
    const TARGET_LANGUAGES = ['fr', 'pt', 'es', 'ru', 'zh'];
    const translations = {};

    for (const lang of TARGET_LANGUAGES) {
      try {
        const [labelT, descriptionT] = await Promise.all([
          translateText(payload.label, lang),
          translateText(payload.description, lang)
        ]);

        translations[lang] = {
          label: labelT,
          description: descriptionT
        };

        logger.info(`✅ Translated industry stat to ${lang}`);
      } catch (e) {
        logger.warn(`❌ Failed to translate industry stat to ${lang}: ${e.message}`);
      }
    }

    if (Object.keys(translations).length > 0) {
      payload.translations = translations;
    }

    const created = await IndustryStat.create(payload);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    logger.error('Error creating industry stat:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to create industry stat' });
  }
}

/**
 * Update an industry stat
 */
async function updateIndustryStat(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;

    const stat = await IndustryStat.findById(id);
    if (!stat) {
      return res.status(404).json({ success: false, message: 'Industry stat not found' });
    }

    // Prepare translations if any field is updated
    const TARGET_LANGUAGES = ['fr', 'pt', 'es', 'ru', 'zh'];
    if (!stat.translations) stat.translations = new Map();

    for (const lang of TARGET_LANGUAGES) {
      try {
        const [labelT, descriptionT] = await Promise.all([
          payload.label ? translateText(payload.label, lang) : stat.translations?.get(lang)?.label || stat.label,
          payload.description ? translateText(payload.description, lang) : stat.translations?.get(lang)?.description || stat.description
        ]);

        if (!stat.translations) stat.translations = {};
        stat.translations[lang] = {
          label: labelT,
          description: descriptionT
        };

        logger.info(`✅ Translated industry stat to ${lang}`);
      } catch (e) {
        logger.warn(`❌ Failed to translate industry stat to ${lang}: ${e.message}`);
      }
    }

    // Merge updates
    Object.assign(stat, payload);
    const updatedStat = await stat.save();

    res.json({ success: true, data: updatedStat, message: 'Industry stat updated successfully' });
  } catch (error) {
    logger.error('Error updating industry stat:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to update industry stat' });
  }
}

/**
 * Delete an industry stat
 */
async function deleteIndustryStat(req, res) {
  try {
    const { id } = req.params;
    const deleted = await IndustryStat.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Industry stat not found' });
    }
    res.json({ success: true, data: { id }, message: 'Industry stat deleted successfully' });
  } catch (error) {
    logger.error('Error deleting industry stat:', error);
    res.status(400).json({ success: false, message: error.message || 'Failed to delete industry stat' });
  }
}

module.exports = {
  getAllIndustryStats,
  getIndustryStatById,
  createIndustryStat,
  updateIndustryStat,
  deleteIndustryStat
};





