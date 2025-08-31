# Service Detail Pages Migration Guide

## Overview
All individual service detail pages have been consolidated into a single, reusable `ServiceDetail` component to eliminate code duplication and simplify maintenance.

## What Changed

### 1. New Unified Component
- **File**: `frontend/src/pages/ServiceDetail.tsx`
- **Purpose**: Single component that handles all service detail pages
- **Parameters**: 
  - `serviceType`: The type of service (e.g., 'testing', 'cbm', 'inspection', 'auditing', 'verification-certification')
  - `slug`: The specific item slug

### 2. Updated Routing
- **Before**: Individual routes for each service detail page
  ```tsx
  <Route path="/services/testing/:slug" element={<TestingDetail />} />
  <Route path="/services/cbm/:slug" element={<CBMDetail />} />
  <Route path="/services/inspection/:slug" element={<InspectionDetail />} />
  <Route path="/services/auditing/:slug" element={<AuditingDetail />} />
  <Route path="/services/verification-certification/:slug" element={<VerificationCertificationDetail />} />
  ```
- **After**: Single unified route
  ```tsx
  <Route path="/services/:serviceType/:slug" element={<ServiceDetail />} />
  ```

### 3. Service Configuration
The component uses a configuration object to determine how to handle each service type:

```tsx
const serviceConfigs: Record<string, ServiceConfig> = {
  'verification-certification': {
    type: 'verification-certification',
    displayName: 'Verification & Certification (VC)',
    route: '/services/verification-certification',
    getItemBySlug: getVerificationCertificationItemBySlug,
    getImages: (slug: string) => imageService.getVerificationCertificationImages(slug)
  },
  // ... other services
};
```

## Benefits

1. **Single Source of Truth**: All detail page logic is now in one place
2. **Easier Maintenance**: Changes to detail page behavior only need to be made once
3. **Consistent Behavior**: All detail pages now behave identically
4. **Reduced Bundle Size**: Eliminates duplicate component code
5. **Easier Testing**: Only one component to test instead of five

## How It Works

1. **Route Parameters**: The component extracts `serviceType` and `slug` from the URL
2. **Service Lookup**: It looks up the appropriate service configuration based on `serviceType`
3. **Data Fetching**: It uses the service-specific functions to fetch data and images
4. **Dynamic Rendering**: It renders the appropriate breadcrumbs, content, and images based on the service type

## Migration Steps Completed

1. ✅ Created unified `ServiceDetail` component
2. ✅ Updated `App.tsx` routing to use the new component
3. ✅ Removed individual detail page imports
4. ✅ Consolidated all service configurations

## Files Modified

- `frontend/src/pages/ServiceDetail.tsx` - New unified component
- `frontend/src/App.tsx` - Updated routing

## Files That Can Now Be Removed

The following individual detail page files are no longer needed:
- `frontend/src/pages/TestingDetail.tsx`
- `frontend/src/pages/CBMDetail.tsx`
- `frontend/src/pages/InspectionDetail.tsx`
- `frontend/src/pages/AuditingDetail.tsx`
- `frontend/src/pages/VerificationCertificationDetail.tsx`

## Adding New Services

To add a new service type:

1. Add the service configuration to `serviceConfigs` in `ServiceDetail.tsx`
2. Import the necessary data functions
3. The routing will automatically work with the pattern `/services/:serviceType/:slug`

## Testing

Test the following URLs to ensure they all work correctly:
- `/services/testing/[any-slug]`
- `/services/cbm/[any-slug]`
- `/services/inspection/[any-slug]`
- `/services/auditing/[any-slug]`
- `/services/verification-certification/[any-slug]`

## Rollback Plan

If issues arise, you can quickly rollback by:
1. Reverting the routing changes in `App.tsx`
2. Re-importing the individual detail page components
3. Restoring the individual routes

The individual detail page files are still available and can be restored if needed.
