import { apiClient } from '@/utils/api';

export type BlogPostDto = {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  tags: string[];
  featuredImage: string;
  images: Array<{
    url: string;
    alt?: string;
    caption?: string;
    order: number;
  }>;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  slug: string;
  metaDescription?: string;
  readingTime: number;
  formattedPublishedAt: string;
  createdAt: string;
  updatedAt: string;
  translations?: {
    [languageCode: string]: {
      title?: string;
      excerpt?: string;
      content?: string;
      tags?: string[];
      metaDescription?: string;
    }
  };
};

export type BlogListParams = {
  page?: number;
  limit?: number;
  featured?: boolean;
  tag?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type BlogListResponse = {
  blogs: BlogPostDto[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export type BlogSearchResponse = {
  blogs: BlogPostDto[];
  query: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

// Get all published blog posts with pagination and filtering
export async function getBlogs(params?: BlogListParams): Promise<BlogListResponse> {
  const { data } = await apiClient.get('/api/blogs', { params });
  // Handle both response formats - direct data or nested under success/data
  if (data.success && data.data) {
    return data.data as BlogListResponse;
  }
  return data as BlogListResponse;
}

// Get featured blog posts
export async function getFeaturedBlogs(limit?: number): Promise<BlogPostDto[]> {
  const { data } = await apiClient.get('/api/blogs/featured', { 
    params: limit ? { limit } : undefined 
  });
  // Handle both response formats
  if (data.success && data.data) {
    return data.data as BlogPostDto[];
  }
  return data as BlogPostDto[];
}

// Get all unique tags from published blogs
export async function getBlogTags(): Promise<string[]> {
  const { data } = await apiClient.get('/api/blogs/tags');
  // Handle both response formats
  if (data.success && data.data) {
    return data.data as string[];
  }
  return data as string[];
}

// Search blog posts
export async function searchBlogs(query: string, page?: number, limit?: number): Promise<BlogSearchResponse> {
  const { data } = await apiClient.get('/api/blogs/search', {
    params: { q: query, page, limit }
  });
  return data.data as BlogSearchResponse;
}

// Get blog posts by specific tag
export async function getBlogsByTag(tag: string, page?: number, limit?: number): Promise<BlogListResponse> {
  const { data } = await apiClient.get(`/api/blogs/tag/${encodeURIComponent(tag)}`, {
    params: { page, limit }
  });
  return data.data as BlogListResponse;
}

// Get a single blog post by ID or slug
export async function getBlogById(id: string): Promise<BlogPostDto> {
  const { data } = await apiClient.get(`/api/blogs/${encodeURIComponent(id)}`);
  return data.data as BlogPostDto;
}

// Increment view count for a blog post
export async function incrementBlogViewCount(id: string): Promise<void> {
  await apiClient.post(`/api/blogs/${encodeURIComponent(id)}/view`);
}



