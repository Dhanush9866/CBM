# How to Add Your Data

## 🎯 **Quick Start: English First, Translations Later**

### **Step 1: Add English Content Only**

You can start with just English content and add translations later. Here's how:

#### **Option A: Edit Sample Files (Easiest)**

**1. Edit `backend/src/data/sample-sections.js`**
```javascript
// Add your sections with English only
const sampleSections = {
  myCustomPage: [
    {
      title: "My Custom Section",
      bodyText: "Your English content here...",
      sectionId: "my-custom-section",
      pageNumber: 1,
      language: "en"
      // No translations needed initially
    }
  ]
};
```

**2. Edit `backend/src/data/sample-pages.js`**
```javascript
const samplePages = [
  {
    title: "My Custom Page",
    description: "Your English page description",
    slug: "my-custom-page",
    sections: ["my-custom-section"],
    language: "en"
    // No translations needed initially
  }
];
```

#### **Option B: Use Custom Files**

**1. Edit `backend/src/data/my-custom-sections.js`**
```javascript
const myCustomSections = {
  myPage: [
    {
      title: "Welcome to My Site",
      bodyText: "This is my English content...",
      sectionId: "my-welcome",
      pageNumber: 1,
      language: "en"
    },
    {
      title: "About My Services",
      bodyText: "I provide amazing services...",
      sectionId: "my-services",
      pageNumber: 2,
      language: "en"
    }
  ]
};
```

**2. Edit `backend/src/data/my-custom-pages.js`**
```javascript
const myCustomPages = [
  {
    title: "My Home Page",
    description: "Welcome to my website",
    slug: "my-home",
    sections: ["my-welcome", "my-services"],
    language: "en"
  }
];
```

### **Step 2: Run the Seeder**

```bash
# Seed with your custom data
npm run seed:custom

# Or seed with sample data only
npm run seed
```

### **Step 3: Add Translations Later**

Once your English content is working, you can add translations:

#### **Method 1: Update via API**
```bash
# Update section with translations
curl -X PUT http://localhost:4000/api/sections/SECTION_ID \
  -H "Content-Type: application/json" \
  -d '{
    "translations": {
      "fr": {
        "title": "Ma Section",
        "bodyText": "Mon contenu en français..."
      },
      "es": {
        "title": "Mi Sección",
        "bodyText": "Mi contenido en español..."
      }
    }
  }'
```

#### **Method 2: Update Data Files**
```javascript
// Add translations to your sections
{
  title: "My Section",
  bodyText: "English content...",
  sectionId: "my-section",
  language: "en",
  translations: {
    fr: {
      title: "Ma Section",
      bodyText: "Contenu français..."
    },
    pt: {
      title: "Minha Seção",
      bodyText: "Conteúdo português..."
    },
    es: {
      title: "Mi Sección",
      bodyText: "Contenido español..."
    },
    ru: {
      title: "Моя секция",
      bodyText: "Русский контент..."
    }
  }
}
```

## 🚀 **Complete Workflow Example**

### **Phase 1: English Content Only**

**1. Create your sections:**
```javascript
// In my-custom-sections.js
const myCustomSections = {
  products: [
    {
      title: "Product Overview",
      bodyText: "Our amazing product solves real problems...",
      sectionId: "product-overview",
      pageNumber: 1,
      language: "en"
    },
    {
      title: "Key Features",
      bodyText: "Advanced features include...",
      sectionId: "product-features",
      pageNumber: 2,
      language: "en"
    }
  ]
};
```

**2. Create your pages:**
```javascript
// In my-custom-pages.js
const myCustomPages = [
  {
    title: "Products",
    description: "Explore our product line",
    slug: "products",
    sections: ["product-overview", "product-features"],
    language: "en"
  }
];
```

**3. Seed the data:**
```bash
npm run seed:custom
```

**4. Test your content:**
```bash
# Test English content
curl "http://localhost:4000/api/pages/slug/products?populate=true"

# Test with language parameter (will use English as fallback)
curl "http://localhost:4000/api/pages/slug/products?lang=fr&populate=true"
```

### **Phase 2: Add Translations**

**1. Update your sections with translations:**
```javascript
{
  title: "Product Overview",
  bodyText: "Our amazing product solves real problems...",
  sectionId: "product-overview",
  pageNumber: 1,
  language: "en",
  translations: {
    fr: {
      title: "Aperçu du produit",
      bodyText: "Notre produit incroyable résout de vrais problèmes..."
    },
    es: {
      title: "Descripción del producto",
      bodyText: "Nuestro increíble producto resuelve problemas reales..."
    }
  }
}
```

**2. Update your pages with translations:**
```javascript
{
  title: "Products",
  description: "Explore our product line",
  slug: "products",
  sections: ["product-overview", "product-features"],
  language: "en",
  translations: {
    fr: {
      title: "Produits",
      description: "Explorez notre gamme de produits"
    },
    es: {
      title: "Productos",
      description: "Explora nuestra línea de productos"
    }
  }
}
```

**3. Update via API or re-seed:**
```bash
# Option A: Update via API
curl -X PUT http://localhost:4000/api/sections/SECTION_ID -H "Content-Type: application/json" -d '{"translations": {...}}'

# Option B: Re-seed (will update existing data)
npm run seed:custom
```

## 📝 **Data Structure Templates**

### **Minimal Section (English Only)**
```javascript
{
  title: "Your Section Title",
  bodyText: "Your section content...",
  sectionId: "unique-section-id",
  language: "en"
}
```

### **Complete Section (With Translations)**
```javascript
{
  title: "Your Section Title",
  bodyText: "Your section content...",
  sectionId: "unique-section-id",
  pageNumber: 1,
  language: "en",
  images: ["/uploads/image.jpg"],
  isActive: true,
  translations: {
    fr: { title: "...", bodyText: "..." },
    pt: { title: "...", bodyText: "..." },
    es: { title: "...", bodyText: "..." },
    ru: { title: "...", bodyText: "..." }
  }
}
```

### **Minimal Page (English Only)**
```javascript
{
  title: "Your Page Title",
  slug: "your-page-slug",
  sections: ["section-id-1", "section-id-2"],
  language: "en"
}
```

### **Complete Page (With Translations)**
```javascript
{
  title: "Your Page Title",
  description: "Your page description",
  slug: "your-page-slug",
  pageNumber: 1,
  isActive: true,
  sections: ["section-id-1", "section-id-2"],
  language: "en",
  translations: {
    fr: { title: "...", description: "..." },
    pt: { title: "...", description: "..." },
    es: { title: "...", description: "..." },
    ru: { title: "...", description: "..." }
  },
  metadata: {
    keywords: ["keyword1", "keyword2"],
    author: "Your Name",
    lastModified: new Date()
  }
}
```

## 🔄 **Available Commands**

```bash
# Seed with sample data only
npm run seed

# Seed with sample + custom data
npm run seed:custom

# Clear all data
npm run seed:clear

# Start development server
npm run dev
```

## 🌍 **Language Support**

The system supports 5 languages:
- `en` - English (default)
- `fr` - French
- `pt` - Portuguese
- `es` - Spanish
- `ru` - Russian

When translations are missing, the system will:
1. Use English content as fallback
2. Try dynamic translation if available
3. Return the original English content

## 🎯 **Best Practices**

1. **Start Simple**: Begin with English-only content
2. **Use Descriptive IDs**: Make `sectionId` values meaningful
3. **Plan Structure**: Organize sections by page/category
4. **Test Incrementally**: Add content in small batches
5. **Add Translations Gradually**: Translate one language at a time
6. **Keep Backups**: Version control your data files

This approach lets you get your content up and running quickly with English, then add translations as needed!
