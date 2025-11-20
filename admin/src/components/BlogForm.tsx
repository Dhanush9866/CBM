import React, { useState, useEffect } from 'react';
import { Blog, CreateBlogData, UpdateBlogData } from '../services/blogService';

interface BlogFormProps {
  blog?: Blog;
  onSave: (
    blogData: CreateBlogData | UpdateBlogData,
    files?: { featuredImageFile?: File }
  ) => Promise<void>;
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
    if (blog) {
      const initialFormData: CreateBlogData = {
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
      setFormData(initialFormData);
      setFeaturedImagePreview(blog.featuredImage || '');
      setFeaturedImageFile(null);
    } else {
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
      if (name === 'title' && (!blog || !formData.slug?.trim())) {
        setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
      }
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags ?? []), tagInput.trim().toLowerCase()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags ?? []).filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddImage = () => {
    if (imageInput.url.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images ?? []), {
          url: imageInput.url.trim(),
          alt: imageInput.alt.trim(),
          caption: imageInput.caption.trim(),
          order: (prev.images?.length ?? 0)
        }]
      }));
      setImageInput({ url: '', alt: '', caption: '' });
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images ?? []).filter((_, i) => i !== index)
    }));
  };

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFeaturedImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFeaturedImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFeaturedImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';

    const hasNewFile = !!featuredImageFile;
    const hasImageUrl = !!formData.featuredImage?.trim();
    const hasExistingImage = !!(blog && blog.featuredImage);

    if (!hasNewFile && !hasImageUrl && !hasExistingImage) {
      newErrors.featuredImage = 'Featured image is required';
    }

    if (!formData.slug?.trim()) newErrors.slug = 'Slug is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const isValid = validateForm();
    if (!isValid) {
      alert('Please fix the form errors before submitting');
      return;
    }

    try {
      const submitData = {
        ...formData,
        featuredImage: featuredImageFile ? '' : formData.featuredImage
      };

      await onSave(submitData, {
        featuredImageFile: featuredImageFile ?? undefined
      });
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600 }}>
          {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        <p style={{ color: '#6b7280' }}>
          {blog ? 'Update your blog post details' : 'Fill in the details to create a new blog post'}
        </p>
      </div>

      {Object.keys(errors).length > 0 && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
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
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Post title"
            style={{ width: '100%', padding: '10px 12px', border: `1px solid ${errors.title ? '#fecaca' : '#e5e7eb'}`, borderRadius: 6 }}
          />
        </div>

        {/* Slug */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>Slug</label>
          <input
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            placeholder="auto-generated from title, or edit"
            style={{ width: '100%', padding: '10px 12px', border: `1px solid ${errors.slug ? '#fecaca' : '#e5e7eb'}`, borderRadius: 6 }}
          />
        </div>

        {/* Excerpt */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            placeholder="Short summary"
            style={{ width: '100%', padding: '10px 12px', border: `1px solid ${errors.excerpt ? '#fecaca' : '#e5e7eb'}`, borderRadius: 6 }}
          />
        </div>

        {/* Content */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={10}
            placeholder="Write your content here..."
            style={{ width: '100%', padding: '10px 12px', border: `1px solid ${errors.content ? '#fecaca' : '#e5e7eb'}`, borderRadius: 6 }}
          />
        </div>

        {/* Tags */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>Tags</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add a tag and press Add"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6 }}
            />
            <button type="button" onClick={handleAddTag} style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>Add</button>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(formData.tags ?? []).map((tag) => (
              <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px', background: '#f3f4f6', borderRadius: 999 }}>
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Featured image */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>Featured Image</label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ border: `1px dashed ${errors.featuredImage ? '#fecaca' : '#d1d5db'}`, padding: 16, borderRadius: 8, textAlign: 'center', marginBottom: 8 }}
          >
            <input type="file" accept="image/*" onChange={handleFeaturedImageChange} />
            <div style={{ color: '#6b7280', fontSize: 12, marginTop: 6 }}>Drag and drop an image or click to select</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <input
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleInputChange}
              placeholder="...or paste image URL"
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6 }}
            />
          </div>
          {featuredImagePreview && (
            <div style={{ marginTop: 8 }}>
              <img src={featuredImagePreview} alt="Preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
            </div>
          )}
        </div>

        {/* Gallery images */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>Gallery Images</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              value={imageInput.url}
              onChange={(e) => setImageInput({ ...imageInput, url: e.target.value })}
              placeholder="Image URL"
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6 }}
            />
            <input
              value={imageInput.alt}
              onChange={(e) => setImageInput({ ...imageInput, alt: e.target.value })}
              placeholder="Alt text"
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6 }}
            />
            <input
              value={imageInput.caption}
              onChange={(e) => setImageInput({ ...imageInput, caption: e.target.value })}
              placeholder="Caption"
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6 }}
            />
            <button type="button" onClick={handleAddImage} style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>Add</button>
          </div>
          {(formData.images ?? []).length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
              {(formData.images ?? []).map((img, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f3f4f6', borderRadius: 6, padding: 8 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: 12, color: '#111827' }}>{img.url}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{img.alt} {img.caption ? `• ${img.caption}` : ''}</div>
                  </div>
                  <button type="button" onClick={() => handleRemoveImage(idx)} style={{ padding: '6px 10px', border: '1px solid #ef4444', color: '#ef4444', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Flags */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" name="isPublished" checked={!!formData.isPublished} onChange={handleInputChange} />
            Published
          </label>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" name="isFeatured" checked={!!formData.isFeatured} onChange={handleInputChange} />
            Featured
          </label>
        </div>

        {/* Meta description */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6 }}>Meta Description</label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleInputChange}
            rows={3}
            placeholder="SEO description"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6 }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={isLoading} style={{ padding: '12px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            {isLoading ? 'Saving...' : (blog ? 'Save Changes' : 'Create Blog')}
          </button>
          <button type="button" onClick={onCancel} disabled={isLoading} style={{ padding: '12px 20px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
