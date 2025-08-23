# Configuration Guide

## Environment Variables Setup

Create a `.env` file in your `backend` directory with the following variables:

### Required Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/cbm
MONGODB_DB=cbm

# Cloudinary Configuration (Required for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Optional Variables

```env
# Redis Configuration (if using)
REDIS_URL=redis://localhost:6379

# File Upload Configuration
MAX_FILE_SIZE_BYTES=10485760
MAX_FILES_PER_UPLOAD=10

# Security Configuration
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_here

# Logging Configuration
LOG_LEVEL=info
LOG_FILE_PATH=logs/app.log

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=120
```

## Getting Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add them to your `.env` file

## Testing the Setup

After setting up your `.env` file, test the configuration:

```bash
# Test MongoDB connection
npm run dev

# Test image upload endpoint
curl -X GET http://localhost:5000/api/images/health
```

## Folder Structure

Your images will be organized in Cloudinary as:
```
cbm/
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
