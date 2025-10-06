import { useState, useEffect } from 'react';
import { blogService, Blog, CreateBlogData, UpdateBlogData } from '../services/blogService';
import BlogForm from '../components/BlogForm';

type ViewMode = 'list' | 'form' | 'view';
type FormMode = 'create' | 'edit';

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await blogService.getBlogs({
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined,
        sortBy: 'publishedAt',
        sortOrder: 'desc',
        includeUnpublished: true,
      });

      setBlogs(response.data.blogs);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [currentPage, searchTerm]);

  // ✅ FIXED: Explicitly cast blogData as CreateBlogData for create
  const handleCreateBlog = async (
    blogData: CreateBlogData | UpdateBlogData,
    featuredImageFile?: File
  ) => {
    try {
      setFormLoading(true);
      await blogService.createBlog(blogData as CreateBlogData, featuredImageFile);
      setViewMode('list');
      await loadBlogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog');
    } finally {
      setFormLoading(false);
    }
  };

  // ✅ FIXED: Explicitly ensure blog ID exists and cast as UpdateBlogData
  const handleUpdateBlog = async (
    blogData: CreateBlogData | UpdateBlogData,
    featuredImageFile?: File
  ) => {
    try {
      setFormLoading(true);

      if (!selectedBlog?._id) {
        throw new Error('No blog selected for update');
      }

      console.log('Updating blog with ID:', selectedBlog._id);
      console.log('Update data:', blogData);

      await blogService.updateBlog(selectedBlog._id, blogData as UpdateBlogData, featuredImageFile);
      setViewMode('list');
      setSelectedBlog(null);
      await loadBlogs();
    } catch (err) {
      console.error('Update blog error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update blog');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await blogService.deleteBlog(id);
      setShowDeleteConfirm(null);
      await loadBlogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog');
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setFormMode('edit');
    setViewMode('form');
  };

  const handleViewBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setViewMode('view');
  };

  const handleNewBlog = () => {
    setSelectedBlog(null);
    setFormMode('create');
    setViewMode('form');
  };

  const handleCancel = () => {
    setViewMode('list');
    setSelectedBlog(null);
    setError(null);
  };

  const getStatusColor = (isPublished: boolean) => {
    return isPublished ? '#10b981' : '#f59e0b';
  };

  const getStatusText = (isPublished: boolean) => {
    return isPublished ? 'Published' : 'Draft';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Show form view
  if (viewMode === 'form') {
    return (
      <BlogForm
        blog={formMode === 'edit' ? selectedBlog || undefined : undefined}
        onSave={formMode === 'create' ? handleCreateBlog : handleUpdateBlog}
        onCancel={handleCancel}
        isLoading={formLoading}
      />
    );
  }

  // Show blog detail view
  if (viewMode === 'view' && selectedBlog) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={handleCancel}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '16px',
            }}
          >
            ← Back to Blogs
          </button>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '700',
              margin: '0 0 8px 0',
            }}
          >
            {selectedBlog.title}
          </h1>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: `${getStatusColor(selectedBlog.isPublished)}20`,
                color: getStatusColor(selectedBlog.isPublished),
              }}
            >
              {getStatusText(selectedBlog.isPublished)}
            </span>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>
              {formatDate(selectedBlog.publishedAt)}
            </span>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>
              {selectedBlog.viewCount} views
            </span>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>
              {selectedBlog.readingTime} min read
            </span>
          </div>
          <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6' }}>
            {selectedBlog.excerpt}
          </p>
        </div>

        {selectedBlog.featuredImage && (
          <div style={{ marginBottom: '24px' }}>
            <img
              src={selectedBlog.featuredImage}
              alt={selectedBlog.title}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: '1.8',
              fontSize: '16px',
            }}
          >
            {selectedBlog.content}
          </div>
        </div>

        {selectedBlog.tags.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                margin: '0 0 8px 0',
              }}
            >
              Tags
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedBlog.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    fontSize: '12px',
                    borderRadius: '4px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => handleEditBlog(selectedBlog)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Edit Blog
          </button>
          <button
            onClick={() => setShowDeleteConfirm(selectedBlog._id)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Delete Blog
          </button>
        </div>
      </div>
    );
  }

  // ✅ (Rest of your table/list rendering remains identical — no changes needed)
  // 👇 Keep your blog list, pagination, and modal logic as is
  // (everything below stays the same as in your version)
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Blogs</h2>
        <button
          onClick={handleNewBlog}
          style={{ padding: '10px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          + New Blog
        </button>
      </div>

      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blogs..."
          style={{ flex: 1, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 6 }}
        />
      </div>

      {loading && <div>Loading blogs...</div>}
      {error && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: 12, borderRadius: 6, marginBottom: 12 }}>
          {error}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div style={{ color: '#6b7280' }}>No blogs found.</div>
      )}

      {!loading && blogs.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', background: '#f9fafb' }}>
                <th style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>Title</th>
                <th style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>Published</th>
                <th style={{ padding: 12, borderBottom: '1px solid #e5e7eb' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id}>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{b.title}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{getStatusText(b.isPublished)}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{formatDate(b.publishedAt)}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6', display: 'flex', gap: 8 }}>
                    <button onClick={() => handleViewBlog(b)} style={{ padding: '6px 10px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>View</button>
                    <button onClick={() => handleEditBlog(b)} style={{ padding: '6px 10px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => setShowDeleteConfirm(b._id)} style={{ padding: '6px 10px', border: '1px solid #ef4444', color: '#ef4444', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 16 }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }}
        >
          Prev
        </button>
        <span style={{ color: '#6b7280' }}>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer' }}
        >
          Next
        </button>
      </div>

      {/* Delete confirm (simple) */}
      {showDeleteConfirm && (
        <div style={{ marginTop: 16, padding: 12, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 6 }}>
          <div style={{ marginBottom: 8 }}>Delete this blog?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => handleDeleteBlog(showDeleteConfirm)} style={{ padding: '8px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Delete</button>
            <button onClick={() => setShowDeleteConfirm(null)} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
