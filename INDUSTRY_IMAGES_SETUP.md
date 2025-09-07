# Industry Cover Images Setup

This document explains how to set up and use the industry cover images system with Cloudinary integration.

## Folder Structure

The system expects industry cover images to be placed in the following structure:

```
frontend/uploads/
├── Automotive cover-pic/
├── Healthcare & Medical Devices cover-pic/
├── Energy & Utilities cover-pic/
├── Manufacturing cover-pic/
├── Construction & Infrastructure cover-pic/
├── Food & Agriculture cover-pic/
├── Aerospace & Defense cover-pic/
└── Technology & Electronics cover-pic/
```

## How to Add Cover Images

1. **Add Images to Folders**: Place your industry cover images (PNG, JPG, JPEG, WEBP) in the respective industry folders with the "cover-pic" suffix.

2. **Upload to Cloudinary**: Run the upload script to upload all images to Cloudinary:
   ```bash
   cd backend
   node src/scripts/upload-industry-cover-images.js
   ```

3. **Frontend Integration**: The frontend will automatically use the cover images from Cloudinary. The system will:
   - First try to use cover images from Cloudinary
   - Fall back to regular images if no cover images are available
   - Use placeholder image if no images are found

## API Endpoints

The system provides the following API endpoints for industry images:

- `POST /api/images/industries/:subService/upload` - Upload regular industry images
- `GET /api/images/industries/:subService/images` - Get industry images
- `POST /api/images/industries/:subService/cover-upload` - Upload cover images specifically
- `GET /api/images/industries/:subService/cover-images` - Get cover images

## Frontend Usage

The frontend automatically uses cover images through the `getIndustryCoverImage()` utility function:

```typescript
import { getIndustryCoverImage } from '@/utils/industryImages';

// Get cover image for an industry
const coverImageUrl = getIndustryCoverImage('Automotive');
```

## File Naming Convention

- Industry folders should end with " cover-pic"
- Image files can be any of: PNG, JPG, JPEG, WEBP
- The system will automatically generate Cloudinary URLs and organize them in folders

## Cloudinary Organization

Images are organized in Cloudinary with the following structure:
```
cbm/industries/
├── automotive/covers/
├── healthcare-medical-devices/covers/
├── energy-utilities/covers/
├── manufacturing/covers/
├── construction-infrastructure/covers/
├── food-agriculture/covers/
├── aerospace-defense/covers/
└── technology-electronics/covers/
```

## Troubleshooting

1. **Images not showing**: Make sure the images are uploaded to Cloudinary by running the upload script
2. **Wrong images**: Check that the industry names match exactly between the folder names and the data
3. **Upload errors**: Verify that Cloudinary credentials are properly configured in the backend environment variables

## Environment Variables Required

Make sure these environment variables are set in your backend:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
