# Image Upload System Guide

## Overview

This system provides a structured way to upload, organize, and manage images for your 5 main services and their sub-services. Images are automatically organized in Cloudinary with a clear folder structure.

## Services Structure

### 1. Testing Services (15 sub-services)
- `visual-testing`
- `drone-inspection`
- `borescope-inspection`
- `ultrasonic-testing`
- `phased-array-ut`
- `guided-wave-lrut`
- `liquid-penetrant-testing`
- `radiographic-testing`
- `magnetic-particle-testing`
- `eddy-current-testing`
- `time-of-flight-diffraction`
- `hardness-testing`
- `lifting-gear-load-testing`
- `leak-testing`
- `positive-material-identification`

### 2. Inspection Services (14 sub-services)
- `third-party-inspection`
- `asset-integrity-inspection`
- `environmental-monitoring-inspection`
- `risk-based-inspection`
- `welding-inspection`
- `electrical-instrumentation-inspection`
- `painting-inspection`
- `gearbox-inspection`
- `hse-inspection`
- `topside-fitness-inspection`
- `marine-inspection`
- `pre-shipment-inspection`
- `underground-mine-shaft-safety-inspection`
- `on-site-laboratory-sampling`

### 3. Other Services (Placeholder)
- `auditing`
- `cbm`
- `verification-certification`

## API Endpoints

### Upload Images
```http
POST /api/images/{serviceType}/{subService}/upload
Content-Type: multipart/form-data

Body: images[] (multiple image files)
```

**Examples:**
```bash
# Upload images for visual testing
curl -X POST http://localhost:5000/api/images/testing/visual-testing/upload \
  -F "images=@image1.jpg" \
  -F "images=@image2.png"

# Upload images for welding inspection
curl -X POST http://localhost:5000/api/images/inspection/welding-inspection/upload \
  -F "images=@welding1.jpg" \
  -F "images=@welding2.jpg"
```

### Get Images
```http
GET /api/images/{serviceType}/{subService}/images?maxResults=50
```

**Examples:**
```bash
# Get all images for ultrasonic testing
curl http://localhost:5000/api/images/testing/ultrasonic-testing/images

# Get limited images for drone inspection
curl "http://localhost:5000/api/images/testing/drone-inspection/images?maxResults=10"
```

### Delete Image
```http
DELETE /api/images/image/{publicId}
```

### Get Usage Statistics
```http
GET /api/images/usage-stats
```

### Health Check
```http
GET /api/images/health
```

## Usage Examples

### Frontend Integration

```javascript
// Upload images for a specific service
const uploadImages = async (serviceType, subService, files) => {
  const formData = new FormData();
  
  files.forEach(file => {
    formData.append('images', file);
  });

  const response = await fetch(
    `/api/images/${serviceType}/${subService}/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  return response.json();
};

// Get images for display
const getImages = async (serviceType, subService) => {
  const response = await fetch(
    `/api/images/${serviceType}/${subService}/images`
  );
  
  return response.json();
};

// Usage example
uploadImages('testing', 'visual-testing', selectedFiles)
  .then(result => {
    console.log('Uploaded:', result.data.images);
  })
  .catch(error => {
    console.error('Upload failed:', error);
  });
```

### Backend Integration

```javascript
const cloudinaryService = require('./services/cloudinary');

// Upload single image
const uploadResult = await cloudinaryService.uploadImage(
  filePath,
  'testing',
  'ultrasonic-testing',
  'thickness-measurement'
);

// Upload multiple images
const uploadResults = await cloudinaryService.uploadMultipleImages(
  files,
  'inspection',
  'welding-inspection'
);

// Get images from folder
const images = await cloudinaryService.getImagesFromFolder(
  'testing',
  'drone-inspection',
  20
);
```

## Image Organization

### Local Folder Structure
```
backend/uploads/
├── testing/
│   ├── visual-testing/
│   ├── drone-inspection/
│   └── ...
├── inspection/
│   ├── third-party-inspection/
│   ├── asset-integrity-inspection/
│   └── ...
├── auditing/
├── cbm/
└── verification-certification/
```

### Cloudinary Organization
```
cbm/
├── testing/
│   ├── visual-testing/
│   │   ├── visual-testing-equipment-1234567890.jpg
│   │   └── visual-testing-process-1234567891.png
│   ├── drone-inspection/
│   │   ├── drone-inspection-aerial-1234567892.jpg
│   │   └── drone-inspection-thermal-1234567893.jpg
│   └── ...
├── inspection/
│   ├── third-party-inspection/
│   ├── asset-integrity-inspection/
│   └── ...
└── ...
```

## File Naming Convention

Images are automatically named using the pattern:
```
{subService}-{originalName}-{timestamp}.{extension}
```

**Examples:**
- `visual-testing-equipment-1234567890.jpg`
- `drone-inspection-aerial-1234567891.png`
- `ultrasonic-testing-thickness-1234567892.jpg`

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

## File Size Limits

- Maximum file size: 10MB per image
- Maximum files per upload: 10 images
- Automatic image optimization and format conversion

## Error Handling

The system provides comprehensive error handling:

```json
{
  "success": false,
  "message": "Image upload failed",
  "error": "Detailed error message"
}
```

## Security Features

- File type validation
- File size limits
- Rate limiting
- Secure file naming
- Automatic cleanup of temporary files

## Monitoring and Logging

- Upload success/failure logging
- Cloudinary usage statistics
- File cleanup tracking
- Error logging with stack traces

## Best Practices

1. **Organize Images**: Place images in appropriate service subfolders
2. **Descriptive Names**: Use meaningful filenames for easier management
3. **Batch Uploads**: Upload multiple related images together
4. **Regular Cleanup**: Monitor usage and clean up unused images
5. **Backup Strategy**: Keep local copies of important images

## Troubleshooting

### Common Issues

1. **Upload Fails**: Check file size and format
2. **Folder Not Found**: Ensure sub-service folder exists
3. **Cloudinary Errors**: Verify API credentials in .env file
4. **File Not Found**: Check file path and permissions

### Debug Mode

Enable detailed logging by setting:
```env
LOG_LEVEL=debug
```

## Next Steps

1. Set up your `.env` file with Cloudinary credentials
2. Test the health endpoint: `GET /api/images/health`
3. Start uploading images to your organized folders
4. Integrate with your frontend for image display
5. Monitor usage and optimize as needed
