'use strict';

const Page = require('../models/Page');
const Section = require('../models/Section');
const { ApiError } = require('../utils/error');
const { translateText } = require('../services/translation');

async function createPage(req, res, next) {
  try {
    const { 
      title, 
      description, 
      slug, 
      language = 'en', 
      pageNumber, 
      isActive = true, 
      sections = [], 
      translations = {},
      metadata = {}
    } = req.body;

    if (!title || !slug) {
      throw new ApiError(400, 'title and slug are required');
    }

    // Check if slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      throw new ApiError(400, 'Page with this slug already exists');
    }

    const page = await Page.create({
      title,
      description,
      slug,
      language,
      pageNumber,
      isActive,
      sections,
      translations,
      metadata
    });

    res.status(201).json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
}

async function getPageById(req, res, next) {
  try {
    const { id } = req.params;
    const { populate = 'true' } = req.query;
    
    let query = Page.findById(id);
    
    if (populate === 'true') {
      query = query.populate({
        path: 'sections',
        select: 'title bodyText images language pageNumber sectionId translations'
      });
    }

    const page = await query;
    if (!page) {
      throw new ApiError(404, 'Page not found');
    }

    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
}

async function getPageBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const { populate = 'true', lang } = req.query;
    
    let query = Page.findOne({ slug, isActive: true });
    
    if (populate === 'true') {
      query = query.populate({
        path: 'sections',
        select: 'title bodyText images language pageNumber sectionId translations',
        match: { isActive: true }
      });
    }

    const page = await query;
    if (!page) {
      throw new ApiError(404, 'Page not found');
    }

    // Handle language translation
    if (lang && lang !== 'en' && lang !== page.language) {
      const fromDb = page.translations && page.translations[lang];
      if (fromDb && (fromDb.title || fromDb.description)) {
        page.title = fromDb.title || page.title;
        page.description = fromDb.description || page.description;
        page.language = lang;
      } else {
        // Dynamic translation
        const [tTitle, tDescription] = await Promise.all([
          translateText(page.title, lang),
          translateText(page.description || '', lang)
        ]);
        page.title = tTitle;
        page.description = tDescription;
        page.language = lang;
      }

      // Translate sections if populated
      if (page.sections && page.sections.length > 0) {
        for (const section of page.sections) {
          const sectionFromDb = section.translations && section.translations[lang];
          if (sectionFromDb && (sectionFromDb.title || sectionFromDb.bodyText)) {
            section.title = sectionFromDb.title || section.title;
            section.bodyText = sectionFromDb.bodyText || section.bodyText;
            section.language = lang;
          } else {
            const [sTitle, sBody] = await Promise.all([
              translateText(section.title, lang),
              translateText(section.bodyText, lang)
            ]);
            section.title = sTitle;
            section.bodyText = sBody;
            section.language = lang;
          }
        }
      }
    }

    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
}

async function getPages(req, res, next) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Math.min(Number(req.query.limit || 10), 100);
    const skip = (page - 1) * limit;
    const lang = (req.query.lang || 'en').toLowerCase();
    const { populate = 'false', isActive, language, search } = req.query;

    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (language) filter.language = language;
    if (search) {
      filter.$text = { $search: search };
    }

    let query = Page.find(filter).sort({ pageNumber: 1, createdAt: -1 }).skip(skip).limit(limit);
    
    if (populate === 'true') {
      query = query.populate({
        path: 'sections',
        select: 'title bodyText images language pageNumber sectionId',
        options: { limit: 5 } // Limit sections for list view
      });
    }

    const [items, total] = await Promise.all([
      query.lean(),
      Page.countDocuments(filter)
    ]);

    // Handle language translation for list
    if (lang && lang !== 'en') {
      for (const item of items) {
        const fromDb = item.translations && item.translations[lang];
        if (fromDb && (fromDb.title || fromDb.description)) {
          item.title = fromDb.title || item.title;
          item.description = fromDb.description || item.description;
          item.language = lang;
        } else {
          const [tTitle, tDescription] = await Promise.all([
            translateText(item.title, lang),
            translateText(item.description || '', lang)
          ]);
          item.title = tTitle;
          item.description = tDescription;
          item.language = lang;
        }
      }
    }

    res.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      lang
    });
  } catch (err) {
    next(err);
  }
}

async function updatePage(req, res, next) {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      slug,
      language,
      pageNumber,
      isActive,
      sections,
      translations,
      metadata
    } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (slug !== undefined) updates.slug = slug;
    if (language !== undefined) updates.language = language;
    if (pageNumber !== undefined) updates.pageNumber = pageNumber;
    if (isActive !== undefined) updates.isActive = isActive;
    if (sections !== undefined) updates.sections = sections;
    if (translations !== undefined) updates.translations = translations;
    if (metadata !== undefined) updates.metadata = metadata;

    // Check slug uniqueness if being updated
    if (slug) {
      const existingPage = await Page.findOne({ slug, _id: { $ne: id } });
      if (existingPage) {
        throw new ApiError(400, 'Page with this slug already exists');
      }
    }

    const updatedPage = await Page.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPage) {
      throw new ApiError(404, 'Page not found');
    }

    res.json({ success: true, data: updatedPage });
  } catch (err) {
    next(err);
  }
}

async function deletePage(req, res, next) {
  try {
    const { id } = req.params;
    const page = await Page.findByIdAndDelete(id);
    if (!page) {
      throw new ApiError(404, 'Page not found');
    }
    res.json({ success: true, data: { id } });
  } catch (err) {
    next(err);
  }
}

async function addSectionToPage(req, res, next) {
  try {
    const { id } = req.params;
    const { sectionId } = req.body;

    if (!sectionId) {
      throw new ApiError(400, 'sectionId is required');
    }

    // Check if section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      throw new ApiError(404, 'Section not found');
    }

    // Check if section is already in the page
    const page = await Page.findById(id);
    if (!page) {
      throw new ApiError(404, 'Page not found');
    }

    if (page.sections.includes(sectionId)) {
      throw new ApiError(400, 'Section is already added to this page');
    }

    const updatedPage = await Page.findByIdAndUpdate(
      id,
      { $push: { sections: sectionId } },
      { new: true }
    ).populate({
      path: 'sections',
      select: 'title bodyText images language pageNumber sectionId'
    });

    res.json({ success: true, data: updatedPage });
  } catch (err) {
    next(err);
  }
}

async function removeSectionFromPage(req, res, next) {
  try {
    const { id, sectionId } = req.params;

    const updatedPage = await Page.findByIdAndUpdate(
      id,
      { $pull: { sections: sectionId } },
      { new: true }
    ).populate({
      path: 'sections',
      select: 'title bodyText images language pageNumber sectionId'
    });

    if (!updatedPage) {
      throw new ApiError(404, 'Page not found');
    }

    res.json({ success: true, data: updatedPage });
  } catch (err) {
    next(err);
  }
}

async function getPageWithSectionsByName(req, res, next) {
  try {
    const { pageName, sectionName } = req.params;
    const { lang } = req.query;

    // Find page by name (title or slug)
    let page = await Page.findOne({
      $or: [
        { title: { $regex: pageName, $options: 'i' } },
        { slug: { $regex: pageName, $options: 'i' } }
      ],
      isActive: true
    }).populate({
      path: 'sections',
      select: 'title bodyText images language pageNumber sectionId translations'
    });

    if (!page) {
      throw new ApiError(404, 'Page not found');
    }

    // Filter sections by name if provided
    if (sectionName) {
      page.sections = page.sections.filter(section =>
        section.title.toLowerCase().includes(sectionName.toLowerCase()) ||
        section.sectionId.toLowerCase().includes(sectionName.toLowerCase())
      );
    }

    // Handle language translation
    if (lang && lang !== 'en' && lang !== page.language) {
      const fromDb = page.translations && page.translations[lang];
      if (fromDb && (fromDb.title || fromDb.description)) {
        page.title = fromDb.title || page.title;
        page.description = fromDb.description || page.description;
        page.language = lang;
      } else {
        const [tTitle, tDescription] = await Promise.all([
          translateText(page.title, lang),
          translateText(page.description || '', lang)
        ]);
        page.title = tTitle;
        page.description = tDescription;
        page.language = lang;
      }

      // Translate sections
      for (const section of page.sections) {
        const sectionFromDb = section.translations && section.translations[lang];
        if (sectionFromDb && (sectionFromDb.title || sectionFromDb.bodyText)) {
          section.title = sectionFromDb.title || section.title;
          section.bodyText = sectionFromDb.bodyText || section.bodyText;
          section.language = lang;
        } else {
          const [sTitle, sBody] = await Promise.all([
            translateText(section.title, lang),
            translateText(section.bodyText, lang)
          ]);
          section.title = sTitle;
          section.bodyText = sBody;
          section.language = lang;
        }
      }
    }

    res.json({ success: true, data: page });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPage,
  getPageById,
  getPageBySlug,
  getPages,
  updatePage,
  deletePage,
  addSectionToPage,
  removeSectionFromPage,
  getPageWithSectionsByName
};
