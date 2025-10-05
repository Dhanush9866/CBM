import { industryImages } from '@/images';

// Define types for better TypeScript support
interface IndustryImage {
  file: string;
  url: string;
  publicId: string;
}

interface IndustryData {
  name: string;
  images: IndustryImage[];
  coverImages: IndustryImage[];
}

/**
 * Get the cover image URL for a specific industry
 * @param industryName - The name of the industry
 * @returns The cover image URL or null if not found
 */
export function getIndustryCoverImage(industryName: string): string | null {
  // Try direct key match first (useful when callers pass sectionId/slug)
  const directKey = (industryImages as Record<string, IndustryData>)[industryName];
  if (directKey) {
    if (directKey.coverImages && directKey.coverImages.length > 0) return directKey.coverImages[0].url;
    if (directKey.images && directKey.images.length > 0) return directKey.images[0].url;
  }

  // Then try exact name match
  const exactMatch = Object.values(industryImages as Record<string, IndustryData>).find(
    industry => industry.name.toLowerCase() === industryName.toLowerCase()
  );
  if (exactMatch) {
    if (exactMatch.coverImages && exactMatch.coverImages.length > 0) return exactMatch.coverImages[0].url;
    if (exactMatch.images && exactMatch.images.length > 0) return exactMatch.images[0].url;
  }

  // Finally, try sanitized key
  const sanitizedKey = industryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const keyMatch = (industryImages as Record<string, IndustryData>)[sanitizedKey];
  if (keyMatch) {
    if (keyMatch.coverImages && keyMatch.coverImages.length > 0) return keyMatch.coverImages[0].url;
    if (keyMatch.images && keyMatch.images.length > 0) return keyMatch.images[0].url;
  }

  return null;
}

/**
 * Get all cover images for a specific industry
 * @param industryName - The name of the industry
 * @returns Array of cover image URLs
 */
export function getIndustryCoverImages(industryName: string): string[] {
  // First try to find by exact name match
  const exactMatch = Object.values(industryImages as Record<string, IndustryData>).find(
    industry => industry.name.toLowerCase() === industryName.toLowerCase()
  );
  
  if (exactMatch && exactMatch.coverImages && exactMatch.coverImages.length > 0) {
    return exactMatch.coverImages.map(img => img.url);
  }

  // If no exact match, try to find by sanitized key
  const sanitizedKey = industryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const keyMatch = (industryImages as Record<string, IndustryData>)[sanitizedKey];
  if (keyMatch && keyMatch.coverImages && keyMatch.coverImages.length > 0) {
    return keyMatch.coverImages.map(img => img.url);
  }

  return [];
}

/**
 * Get all images (regular + cover) for a specific industry
 * @param industryName - The name of the industry
 * @returns Array of all image URLs
 */
export function getAllIndustryImages(industryName: string): string[] {
  const images: string[] = [];
  
  // First try to find by exact name match
  const exactMatch = Object.values(industryImages as Record<string, IndustryData>).find(
    industry => industry.name.toLowerCase() === industryName.toLowerCase()
  );
  
  if (exactMatch) {
    if (exactMatch.images) {
      images.push(...exactMatch.images.map(img => img.url));
    }
    if (exactMatch.coverImages) {
      images.push(...exactMatch.coverImages.map(img => img.url));
    }
    return images;
  }

  // If no exact match, try to find by sanitized key
  const sanitizedKey = industryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const keyMatch = (industryImages as Record<string, IndustryData>)[sanitizedKey];
  if (keyMatch) {
    if (keyMatch.images) {
      images.push(...keyMatch.images.map(img => img.url));
    }
    if (keyMatch.coverImages) {
      images.push(...keyMatch.coverImages.map(img => img.url));
    }
  }

  return images;
}

/**
 * Check if an industry has cover images
 * @param industryName - The name of the industry
 * @returns Boolean indicating if cover images exist
 */
export function hasIndustryCoverImages(industryName: string): boolean {
  return getIndustryCoverImages(industryName).length > 0;
}
