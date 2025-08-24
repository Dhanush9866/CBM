# Data Management Workflow

## Overview

This document explains the recommended workflow for managing content in your CBM backend system. The approach follows a **Section-First, Page-Second** methodology for optimal content organization and management.

## 🎯 Recommended Workflow

### Step 1: Create Sections First
1. **Plan your content structure** - Identify what sections you need for each page
2. **Create sections with content** - Add sections with full multi-language support
3. **Organize by categories** - Group sections logically (home, about, services, etc.)
4. **Test section content** - Verify translations and content quality

### Step 2: Create Pages with Sections
1. **Reference existing sections** - Use section IDs to link sections to pages
2. **Add page metadata** - Include SEO information, translations, etc.
3. **Validate relationships** - Ensure all referenced sections exist
4. **Test page functionality** - Verify sections load correctly

## 📁 File Structure

```
backend/src/
├── data/
│   ├── sample-sections.js    # Section templates by category
│   └── sample-pages.js       # Page templates with section references
├── scripts/
│   └── seed-data.js          # Automated seeding script
├── utils/
│   └── seeder.js             # Data seeding utilities
└── models/
    ├── Section.js            # Section model
    └── Page.js               # Page model
```

## 🚀 Quick Start

### 1. Run the Seeder
```bash
# Seed with sample data
npm run seed

# Clear all data (for testing)
npm run seed:clear
```

### 2. Manual Data Creation
```javascript
const DataSeeder = require('./src/utils/seeder');
const seeder = new DataSeeder();

// Create sections first
const sections = await seeder.createSections([
  {
    title: "My Section",
    bodyText: "Section content...",
    sectionId: "my-section",
    language: "en",
    translations: {
      fr: { title: "Ma Section", bodyText: "Contenu..." }
    }
  }
]);

// Then create pages with section references
const pages = await seeder.createPages([
  {
    title: "My Page",
    slug: "my-page",
    sections: ["my-section"], // Reference by sectionId
    language: "en"
  }
]);
```

## 📝 Section Data Structure

### Required Fields
```javascript
{
  title: "Section Title",           // Required
  bodyText: "Section content...",   // Required
  sectionId: "unique-id",          // Required - for referencing
  language: "en"                   // Default: "en"
}
```

### Optional Fields
```javascript
{
  pageNumber: 1,                   // For ordering
  images: ["/uploads/image.jpg"],  // Array of image paths
  isActive: true,                  // Default: true
  translations: {                  // Multi-language support
    fr: { title: "...", bodyText: "..." },
    pt: { title: "...", bodyText: "..." },
    es: { title: "...", bodyText: "..." },
    ru: { title: "...", bodyText: "..." }
  }
}
```

## 📄 Page Data Structure

### Required Fields
```javascript
{
  title: "Page Title",             // Required
  slug: "page-slug",              // Required - unique URL identifier
  language: "en"                  // Default: "en"
}
```

### Optional Fields
```javascript
{
  description: "Page description",
  pageNumber: 1,                  // For ordering
  isActive: true,                 // Default: true
  sections: ["section1", "section2"], // Array of section IDs
  translations: {                 // Multi-language support
    fr: { title: "...", description: "..." },
    pt: { title: "...", description: "..." },
    es: { title: "...", description: "..." },
    ru: { title: "...", description: "..." }
  },
  metadata: {                     // SEO and additional info
    keywords: ["keyword1", "keyword2"],
    author: "Author Name",
    lastModified: new Date()
  }
}
```

## 🔄 API Endpoints for Data Management

### Sections
```bash
# Create section
POST /api/sections

# Get all sections
GET /api/sections?lang=fr&page=1&limit=10

# Get section by ID
GET /api/sections/:id

# Update section
PUT /api/sections/:id

# Delete section
DELETE /api/sections/:id
```

### Pages
```bash
# Create page
POST /api/pages

# Get all pages
GET /api/pages?lang=fr&populate=true

# Get page by slug
GET /api/pages/slug/:slug?lang=fr&populate=true

# Search pages by name
GET /api/pages/search/:pageName?lang=fr

# Add section to page
POST /api/pages/:id/sections

# Remove section from page
DELETE /api/pages/:id/sections/:sectionId
```

## 🌍 Multi-Language Support

The system supports 5 languages:
- `en` - English (default)
- `fr` - French
- `pt` - Portuguese
- `es` - Spanish
- `ru` - Russian

### Translation Strategy
1. **Pre-stored translations** - Store common translations in the database
2. **Dynamic translation** - Use translation service for missing content
3. **Fallback** - Use English content if translation is unavailable

### Example Usage
```bash
# Get page in French
GET /api/pages/slug/home?lang=fr&populate=true

# Get sections in Portuguese
GET /api/sections?lang=pt
```

## 🛠️ Best Practices

### 1. Section Management
- Use descriptive `sectionId` values for easy reference
- Group related sections in the same category
- Maintain consistent translation structure
- Use `pageNumber` for logical ordering

### 2. Page Management
- Create SEO-friendly slugs
- Reference sections by `sectionId` for maintainability
- Include comprehensive metadata for SEO
- Use translations for all major content

### 3. Content Organization
- Plan your content structure before creating data
- Use consistent naming conventions
- Test content in multiple languages
- Keep sections modular and reusable

### 4. Performance
- Use `populate=true` only when needed
- Implement pagination for large datasets
- Cache frequently accessed content
- Optimize database queries

## 🔧 Development Workflow

### 1. Content Planning
```javascript
// Plan your sections
const sectionPlan = {
  home: ["welcome", "services", "testimonials"],
  about: ["story", "team", "values"],
  services: ["web-dev", "mobile", "consulting"]
};
```

### 2. Section Creation
```javascript
// Create sections for each category
const homeSections = await seeder.createSections([
  // Welcome section
  {
    title: "Welcome",
    bodyText: "Welcome content...",
    sectionId: "welcome",
    translations: { /* ... */ }
  },
  // Services section
  {
    title: "Our Services",
    bodyText: "Services content...",
    sectionId: "services",
    translations: { /* ... */ }
  }
]);
```

### 3. Page Creation
```javascript
// Create pages with section references
const pages = await seeder.createPages([
  {
    title: "Home",
    slug: "home",
    sections: ["welcome", "services", "testimonials"],
    translations: { /* ... */ }
  }
]);
```

### 4. Testing
```bash
# Test API endpoints
curl "http://localhost:4000/api/pages/slug/home?lang=fr&populate=true"
curl "http://localhost:4000/api/pages/search/home?lang=es"
```

## 📊 Monitoring and Maintenance

### Data Validation
- Regularly check for orphaned sections
- Validate translation completeness
- Monitor page performance
- Review content quality

### Backup Strategy
- Export data regularly
- Version control your content
- Test data migrations
- Maintain content backups

## 🎯 Conclusion

This workflow ensures:
- **Organized content structure**
- **Efficient data management**
- **Multi-language support**
- **Scalable architecture**
- **Easy maintenance**

Follow this approach to build a robust, maintainable content management system for your CBM backend.

