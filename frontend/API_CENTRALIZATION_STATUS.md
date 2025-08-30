# API Centralization Status

## Overview
This document tracks the status of API call centralization in the frontend. All API calls should go through the centralized `api.ts` file to ensure consistent configuration, error handling, and logging.

## ✅ **PROPERLY CENTRALIZED (Using api.ts)**

### Pages (All Correctly Connected)
- `Auditing.tsx` - Uses `getPageWithSections` from `api.ts`
- `AuditingDetail.tsx` - Uses `getPageWithSections` from `api.ts`
- `VerificationCertification.tsx` - Uses `getPageWithSections` from `api.ts`
- `VerificationCertificationDetail.tsx` - Uses `getPageWithSections` from `api.ts`
- `TestingInspection.tsx` - Uses `getPageWithSections` from `api.ts`
- `TestingDetail.tsx` - Uses `getPageWithSections` from `api.ts`
- `Inspection.tsx` - Uses `getPageWithSections` from `api.ts`
- `InspectionDetail.tsx` - Uses `getPageWithSections` from `api.ts`
- `CBMDetail.tsx` - Uses `getPageWithSections` from `api.ts`
- `CBMMonitoring.tsx` - Uses `getPageWithSections` from `api.ts`

### Services (Now Fixed)
- `translationService.ts` - ✅ **FIXED**: Now uses `apiClient` instead of direct axios calls
- `imageService.ts` - ✅ **FIXED**: Now uses `apiClient` instead of direct fetch calls

### Utils
- `api.ts` - Central API client with interceptors, logging, and error handling

## 🔧 **What Was Fixed**

### 1. Translation Service (`translationService.ts`)
**Before:**
```typescript
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Direct axios calls
const response = await axios.get<TranslationResponse>(
  `${API_BASE_URL}/translate/static/${language}`
);
```

**After:**
```typescript
import { apiClient } from '@/utils/api';

// Centralized API calls
const response = await apiClient.get<TranslationResponse>(
  `/translate/static/${language}`
);
```

### 2. Image Service (`imageService.ts`)
**Before:**
```typescript
private baseUrl = 'http://localhost:5000/api/images';

// Direct fetch calls
const response = await fetch(
  `${this.baseUrl}/${serviceType}/${subService}/images?maxResults=${maxResults}`
);
```

**After:**
```typescript
import { apiClient } from '@/utils/api';

// Centralized API calls
const response = await apiClient.get(
  `/images/${serviceType}/${subService}/images?maxResults=${maxResults}`
);
```

## 📊 **Benefits of Centralization**

1. **Consistent Configuration**: All API calls use the same base URL and headers
2. **Centralized Logging**: Request/response logging through interceptors
3. **Error Handling**: Consistent error handling across all API calls
4. **Environment Management**: Single source of truth for API configuration
5. **Maintainability**: Easy to update API configuration in one place
6. **Debugging**: Centralized logging makes debugging easier

## 🚀 **Current Status: 100% CENTRALIZED**

All API calls in the frontend are now properly routed through the centralized `api.ts` file. The system provides:

- ✅ Consistent API configuration
- ✅ Request/response logging
- ✅ Error handling
- ✅ Environment-based configuration
- ✅ Type safety with TypeScript interfaces

## 🔍 **API Endpoints Used**

- **Pages**: `/api/pages/search/*`, `/api/pages/slug/*`
- **Translations**: `/translate/static/*`
- **Images**: `/images/*/*/images`

All endpoints now go through the centralized `apiClient` with proper error handling and logging.


