CBM Backend (Express + MongoDB)

Express.js backend with MVC structure providing CRUD for PDF sections, pagination, image uploads, and hybrid multilingual translations (English as source with pre-stored and on-demand translations via Google/DeepL). Optional Redis caching.

## Features
- Sections stored with `title`, `bodyText`, `images[]`, `language`, `translations{}`
- Pagination and querying by `sectionId` and `pageNumber`
- Multer-based image uploads served under `/uploads`
- Translation endpoint with hybrid approach and DB persistence
- Rate limiting, security headers, structured errors

## Endpoints
- POST `/api/sections` (multipart/form-data)
  - fields: `title`, `bodyText`, `pageNumber?`, `sectionId?`, `language?`, `translations?` (JSON string), `images[]`
- GET `/api/sections/:id`
- GET `/api/sections?page=n&limit=m&lang=xx&sectionId=...&pageNumber=...`
- PUT `/api/sections/:id` (multipart/form-data)
  - fields same as POST; new `images[]` will be appended
- DELETE `/api/sections/:id`
- GET `/api/translate/:id?lang=xx`

## Getting Started
1. Create `.env` in this directory (use the keys below). If available, copy `.env.example`.
2. Install dependencies:
```bash
npm install
```
3. Run in dev mode:
```bash
npm run dev
```
4. Production:
```bash
npm start
```

## Environment
- `PORT=4000`
- `MONGODB_URI=mongodb://localhost:27017/cbm`
- `TRANSLATION_PROVIDER=google|deepl`
- `GOOGLE_TRANSLATE_API_KEY=...` or `DEEPL_API_KEY=...`
- `REDIS_URL=redis://localhost:6379` (optional)
- `UPLOAD_DIR=uploads`
- `MAX_FILE_SIZE_BYTES=10485760`

## Folder Structure
```
src/
  controllers/
  middlewares/
  models/
  routes/
  services/
  setup/
  utils/
  server.js
```

## Notes
- For dev without API keys, translations fall back to prefixing `[lang]`.
- Ensure MongoDB is running locally or provide a cloud URI.

