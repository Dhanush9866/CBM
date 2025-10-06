# Industry Cover Images Setup Guide

This guide will help you upload cover images for the two industries that are currently showing wrong images:
- **Mining & Metals Plants & Refineries**
- **Petrochemical Plants & Refineries**

## 📁 Folder Structure Created

The following folders have been created in `frontend/uploads/`:
```
frontend/uploads/
├── Mining & Metals Plants & Refineries cover-pic/
└── Petrochemical Plants & Refineries cover-pic/
```

## 🖼️ How to Add Cover Images

### Step 1: Add Your Images
1. Place your cover images (PNG, JPG, JPEG, WEBP) in the respective folders:
   - `frontend/uploads/Mining & Metals Plants & Refineries cover-pic/`
   - `frontend/uploads/Petrochemical Plants & Refineries cover-pic/`

### Step 2: Upload to Cloudinary
Run the upload script from the backend directory:
```bash
cd backend
node src/scripts/upload-industry-covers-simple.js
```

This script will:
- ✅ Upload all images from the cover-pic folders to Cloudinary
- ✅ Update `frontend/src/images.js` with the new Cloudinary URLs
- ✅ Organize images in Cloudinary under `cbm/industries/[industry-name]/covers/`

### Step 3: Verify the Results
After running the script:
1. Check that the images appear correctly on the industries page
2. The frontend will automatically use the new cover images
3. The system prioritizes cover images over regular images

## 🔧 Technical Details

### How It Works
1. **Database**: Industry data is stored as sections in the database with `page: 'industries'`
2. **Frontend Images**: Cover image URLs are managed in `frontend/src/images.js`
3. **Cloudinary**: Images are uploaded to organized folders in Cloudinary
4. **Frontend Display**: The `getIndustryCoverImage()` utility fetches the correct cover image

### File Naming
- Industry folders must end with " cover-pic"
- Image files can be: PNG, JPG, JPEG, WEBP
- The script automatically generates Cloudinary URLs

### Cloudinary Organization
Images are organized in Cloudinary as:
```
cbm/industries/
├── mining-metals-plants-refineries/covers/
└── petrochemical-plants-refineries/covers/
```

## 🚨 Troubleshooting

### Images Not Showing
1. Make sure images are uploaded to Cloudinary by running the script
2. Check that the industry names match exactly between folder names and database
3. Verify Cloudinary credentials are configured in backend environment variables

### Upload Errors
1. Ensure Cloudinary environment variables are set:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
2. Check that the upload folders exist and contain valid image files

### Wrong Images Still Showing
1. Clear browser cache
2. Verify the `frontend/src/images.js` file was updated with new URLs
3. Check that the frontend is using the updated images file

## 📋 Environment Variables Required

Make sure these are set in your backend `.env` file:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🎯 Expected Results

After successful upload:
- Mining & Metals Plants & Refineries will show your new cover image
- Petrochemical Plants & Refineries will show your new cover image
- Images will be optimized and served from Cloudinary
- The frontend will automatically use the new cover images

## 📞 Support

If you encounter any issues:
1. Check the console output from the upload script
2. Verify all environment variables are set correctly
3. Ensure the image files are valid and in supported formats
4. Check that the folder names match exactly as specified
