import React, { useState, useEffect } from 'react';
import { Blog, CreateBlogData, UpdateBlogData } from '../services/blogService';

interface BlogFormProps {
  blog?: Blog;
  onSave: (blogData: CreateBlogData | UpdateBlogData, featuredImageFile?: File) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function BlogForm({ blog, onSave, onCancel, isLoading = false }: BlogFormProps) {
  const [formData, setFormData] = useState<CreateBlogData>({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    featuredImage: '',
    images: [],
    isPublished: true,
    isFeatured: false,
    metaDescription: '',
    slug: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState({ url: '', alt: '', caption: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>('');

  useEffect(() => {
    console.log('BlogForm useEffect triggered:', { blog, blogId: blog?._id });
    
    if (blog) {
      const initialFormData = {
        title: blog.title || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        tags: blog.tags || [],
        featuredImage: blog.featuredImage || '',
        images: blog.images || [],
        isPublished: blog.isPublished ?? true,
        isFeatured: blog.isFeatured ?? false,
        metaDescription: blog.metaDescription || '',
        slug: blog.slug || ''
      };
      
      console.log('Setting form data for edit mode:', initialFormData);
      setFormData(initialFormData);
      setFeaturedImagePreview(blog.featuredImage || '');
      setFeaturedImageFile(null); // Reset file when editing
    } else {
      console.log('Resetting form data for create mode');
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        tags: [],
        featuredImage: '',
        images: [],
        isPublished: true,
        isFeatured: false,
        metaDescription: '',
        slug: ''
      });
      setFeaturedImagePreview('');
      setFeaturedImageFile(null);
    }
    
    // Clear any existing errors when form data changes
    setErrors({});
  }, [blog]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Auto-generate slug when title changes (for new blogs or when slug is empty)
      if (name === 'title' && (!blog || !formData.slug.trim())) {
        setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
      }
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddImage = () => {
    if (imageInput.url.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, {
          url: imageInput.url.trim(),
          alt: imageInput.alt.trim(),
          caption: imageInput.caption.trim(),
          order: prev.images.length
        }]
      }));
      setImageInput({ url: '', alt: '', caption: '' });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFeaturedImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFeaturedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFeaturedImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    console.log('Validating form:', { 
      title: formData.title, 
      excerpt: formData.excerpt, 
      content: formData.content,
      featuredImage: formData.featuredImage,
      featuredImageFile,
      blogFeaturedImage: blog?.featuredImage,
      slug: formData.slug,
      isEditMode: !!blog
    });

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    // For featured image validation:
    // - If editing existing blog: either new file OR existing image URL OR existing blog image
    // - If creating new blog: either new file OR image URL
    const hasNewFile = !!featuredImageFile;
    const hasImageUrl = !!formData.featuredImage?.trim();
    const hasExistingImage = !!(blog && blog.featuredImage);
    
    console.log('Featured image validation check:', {
      hasNewFile,
      hasImageUrl,
      hasExistingImage,
      formDataFeaturedImage: formData.featuredImage,
      blogFeaturedImage: blog?.featuredImage,
      isEditMode: !!blog
    });
    
    // Only require featured image if we don't have any of the three options
    if (!hasNewFile && !hasImageUrl && !hasExistingImage) {
      newErrors.featuredImage = 'Featured image is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started', { 
      blog, 
      formData, 
      featuredImageFile,
      isLoading,
      errors 
    });
    
    // Prevent double submission
    if (isLoading) {
      console.log('Form is already submitting, ignoring click');
      return;
    }
    
    const isValid = validateForm();
    console.log('Form validation result:', isValid);
    
    if (!isValid) {
      console.log('Form validation failed, errors:', errors);
      alert('Please fix the form errors before submitting');
      return;
    }

    try {
      // Create a modified form data that includes the file
      const submitData = {
        ...formData,
        // If we have a new file, clear the URL (backend will use the uploaded file)
        // If no new file, keep the existing URL
        featuredImage: featuredImageFile ? '' : formData.featuredImage
      };
      
      console.log('Submitting data:', submitData);
      console.log('Calling onSave with:', { submitData, featuredImageFile, isEditMode: !!blog });
      
      // Pass the file to the onSave function
      await onSave(submitData, featuredImageFile);
      console.log('Blog saved successfully');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', margin: '0 0 8px 0' }}>
          {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        <p style={{ color: '#6b7280', margin: 0 }}>
          {blog ? 'Update your blog post details' : 'Fill in the details to create a new blog post'}
        </p>
      </div>

      {/* Validation Errors Summary */}
      {Object.keys(errors).length > 0 && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
            Please fix the following errors:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {Object.entries(errors).map(([field, error]) => (
              <li key={field} style={{ fontSize: '12px', marginBottom: '4px' }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}: {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        {/* Title */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.title ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
            placeholder="Enter blog post title"
          />
          {errors.title && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.title}</p>}
        </div>

        {/* Slug */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.slug ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
            placeholder="blog-post-slug"
          />
          {errors.slug && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.slug}</p>}
        </div>

        {/* Excerpt */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
            Excerpt *
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.excerpt ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical'
            }}
            placeholder="Brief description of the blog post"
          />
          {errors.excerpt && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.excerpt}</p>}
        </div>

        {/* Content */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
            Content *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={10}
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${errors.content ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical'
            }}
            placeholder="Write your blog post content here..."
          />
          {errors.content && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.content}</p>}
        </div>

        {/* Featured Image */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
            Featured Image *
          </label>
          
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${errors.featuredImage ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#f9fafb',
              cursor: 'pointer',
              transition: 'border-color 0.2s'
            }}
            onClick={() => document.getElementById('featured-image-input')?.click()}
          >
            {featuredImagePreview ? (
              <div>
                <img
                  src={featuredImagePreview}
                  alt="Featured image preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginBottom: '10px'
                  }}
                />
                <p style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '14px' }}>
                  Click to change image or drag and drop a new one
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeaturedImageFile(null);
                    setFeaturedImagePreview('');
                    setFormData(prev => ({ ...prev, featuredImage: '' }));
                  }}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
                <p style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '14px' }}>
                  Drag and drop an image here, or click to select
                </p>
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '12px' }}>
                  Supports JPG, PNG, GIF formats
                </p>
              </div>
            )}
          </div>
          
          <input
            id="featured-image-input"
            type="file"
            accept="image/*"
            onChange={handleFeaturedImageChange}
            style={{ display: 'none' }}
          />
          
          {/* URL Input as fallback */}
          <div style={{ marginTop: '10px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
              Or enter image URL:
          </label>
          <input
            type="url"
            name="featuredImage"
            value={formData.featuredImage}
            onChange={handleInputChange}
            style={{
              width: '100%',
                padding: '8px',
              border: `1px solid ${errors.featuredImage ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '4px',
                fontSize: '12px',
              outline: 'none'
            }}
            placeholder="https://example.com/image.jpg"
          />
          </div>
          
          {errors.featuredImage && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.featuredImage}</p>}
        </div>

        {/* Tags */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
            Tags
          </label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  fontSize: '12px',
                  borderRadius: '4px'
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Additional Images */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
            Additional Images
          </label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <input
              type="url"
              value={imageInput.url}
              onChange={(e) => setImageInput(prev => ({ ...prev, url: e.target.value }))}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Image URL"
            />
            <input
              type="text"
              value={imageInput.alt}
              onChange={(e) => setImageInput(prev => ({ ...prev, alt: e.target.value }))}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Alt text"
            />
            <button
              type="button"
              onClick={handleAddImage}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
          {formData.images.map((image, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', flex: 1 }}>
                {image.url} {image.alt && `(${image.alt})`}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Meta Description */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleInputChange}
            rows={2}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical'
            }}
            placeholder="SEO meta description (optional)"
          />
        </div>


        {/* Status Options */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
              />
              <span style={{ fontSize: '14px', color: '#374151' }}>Published</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
              />
              <span style={{ fontSize: '14px', color: '#374151' }}>Featured</span>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '12px 24px',
              backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Saving...' : (blog ? 'Update Blog Post' : 'Create Blog Post')}
          </button>
        </div>
      </form>
    </div>
  );
}







