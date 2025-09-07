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
        includeUnpublished: true // Include content and unpublished blogs for admin
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

  const handleCreateBlog = async (blogData: CreateBlogData | UpdateBlogData, featuredImageFile?: File) => {
    try {
      setFormLoading(true);
      await blogService.createBlog(blogData, featuredImageFile);
      setViewMode('list');
      loadBlogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateBlog = async (blogData: UpdateBlogData, featuredImageFile?: File) => {
    try {
      setFormLoading(true);
      
      // Ensure we have the blog ID from selectedBlog
      if (!selectedBlog?._id) {
        throw new Error('No blog selected for update');
      }
      
      console.log('Updating blog with ID:', selectedBlog._id);
      console.log('Update data:', blogData);
      
      await blogService.updateBlog(selectedBlog._id, blogData, featuredImageFile);
      setViewMode('list');
      setSelectedBlog(null);
      loadBlogs();
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
      loadBlogs();
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
      day: 'numeric'
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
              marginBottom: '16px'
            }}
          >
            ← Back to Blogs
          </button>
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>
            {selectedBlog.title}
          </h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: `${getStatusColor(selectedBlog.isPublished)}20`,
              color: getStatusColor(selectedBlog.isPublished)
            }}>
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
                borderRadius: '8px'
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '24px' }}>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '16px' }}>
            {selectedBlog.content}
          </div>
        </div>

        {selectedBlog.tags.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>Tags</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedBlog.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    fontSize: '12px',
                    borderRadius: '4px'
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
              cursor: 'pointer'
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
              cursor: 'pointer'
            }}
          >
            Delete Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
            Blogs
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Manage your blog posts and content.
          </p>
        </div>
        <button 
          onClick={handleNewBlog}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          + New Blog Post
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '24px'
        }}>
          {error}
        </div>
      )}


      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 8px 0' }}>Loading blogs...</h3>
          <p style={{ margin: 0 }}>Please wait while we fetch your blog posts.</p>
        </div>
      )}

      {/* Blog Posts Table */}
      {!loading && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Blog Posts</h2>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Title
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Status
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Views
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Published
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog._id} style={{ borderBottom: index < blogs.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div>
                        <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>{blog.title}</div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{blog.excerpt}</div>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {blog.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} style={{
                              padding: '2px 6px',
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              fontSize: '12px',
                              borderRadius: '4px'
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: `${getStatusColor(blog.isPublished)}20`,
                        color: getStatusColor(blog.isPublished)
                      }}>
                        {getStatusText(blog.isPublished)}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#6b7280' }}>
                      {blog.viewCount.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#6b7280' }}>
                      {formatDate(blog.publishedAt)}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => handleEditBlog(blog)}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleViewBlog(blog)}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12px',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          View
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(blog._id)}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

       {/* Empty State Message */}
       {!loading && blogs.length === 0 && (
         <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
           <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
           <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 8px 0' }}>No blog posts yet</h3>
           <p style={{ margin: 0 }}>Create your first blog post to get started.</p>
         </div>
       )}

       {/* Pagination */}
       {!loading && totalPages > 1 && (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
           <button
             onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
             disabled={currentPage === 1}
             style={{
               padding: '8px 16px',
               backgroundColor: currentPage === 1 ? '#f3f4f6' : '#3b82f6',
               color: currentPage === 1 ? '#9ca3af' : 'white',
               border: 'none',
               borderRadius: '6px',
               fontSize: '14px',
               cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
             }}
           >
             Previous
           </button>
           
           <div style={{ display: 'flex', gap: '4px' }}>
             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
               const pageNum = i + 1;
               return (
                 <button
                   key={pageNum}
                   onClick={() => setCurrentPage(pageNum)}
                   style={{
                     padding: '8px 12px',
                     backgroundColor: currentPage === pageNum ? '#3b82f6' : '#f3f4f6',
                     color: currentPage === pageNum ? 'white' : '#374151',
                     border: 'none',
                     borderRadius: '6px',
                     fontSize: '14px',
                     cursor: 'pointer'
                   }}
                 >
                   {pageNum}
                 </button>
               );
             })}
           </div>
           
           <button
             onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
             disabled={currentPage === totalPages}
             style={{
               padding: '8px 16px',
               backgroundColor: currentPage === totalPages ? '#f3f4f6' : '#3b82f6',
               color: currentPage === totalPages ? '#9ca3af' : 'white',
               border: 'none',
               borderRadius: '6px',
               fontSize: '14px',
               cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
             }}
           >
             Next
           </button>
         </div>
       )}

       {/* Delete Confirmation Modal */}
       {showDeleteConfirm && (
         <div style={{
           position: 'fixed',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           backgroundColor: 'rgba(0, 0, 0, 0.5)',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           zIndex: 1000
         }}>
           <div style={{
             backgroundColor: 'white',
             padding: '24px',
             borderRadius: '8px',
             maxWidth: '400px',
             width: '90%',
             boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
           }}>
             <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
               Delete Blog Post
             </h3>
             <p style={{ color: '#6b7280', margin: '0 0 24px 0' }}>
               Are you sure you want to delete this blog post? This action cannot be undone.
             </p>
             <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
               <button
                 onClick={() => setShowDeleteConfirm(null)}
                 style={{
                   padding: '8px 16px',
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
                 onClick={() => handleDeleteBlog(showDeleteConfirm)}
                 style={{
                   padding: '8px 16px',
                   backgroundColor: '#ef4444',
                   color: 'white',
                   border: 'none',
                   borderRadius: '6px',
                   fontSize: '14px',
                   cursor: 'pointer'
                 }}
               >
                 Delete
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 }
