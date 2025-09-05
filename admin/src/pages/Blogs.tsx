import { useState } from 'react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  views: number;
}

export default function Blogs() {
  const [blogs] = useState<Blog[]>([
    {
      id: '1',
      title: 'The Future of Non-Destructive Testing',
      slug: 'future-of-ndt',
      excerpt: 'Exploring emerging technologies and trends in the NDT industry.',
      content: 'Non-destructive testing (NDT) is evolving rapidly with new technologies...',
      author: 'John Doe',
      publishedAt: '2024-01-15',
      status: 'published',
      tags: ['NDT', 'Technology', 'Innovation'],
      views: 1250
    },
    {
      id: '2',
      title: 'Ultrasonic Testing Best Practices',
      slug: 'ultrasonic-testing-best-practices',
      excerpt: 'A comprehensive guide to ultrasonic testing methodologies.',
      content: 'Ultrasonic testing is one of the most widely used NDT methods...',
      author: 'Jane Smith',
      publishedAt: '2024-01-10',
      status: 'published',
      tags: ['Ultrasonic', 'Testing', 'Best Practices'],
      views: 890
    },
    {
      id: '3',
      title: 'Industry Safety Standards Update',
      slug: 'industry-safety-standards-update',
      excerpt: 'Latest updates to industry safety standards and regulations.',
      content: 'The industry has seen significant updates to safety standards...',
      author: 'Mike Johnson',
      publishedAt: '2024-01-05',
      status: 'draft',
      tags: ['Safety', 'Standards', 'Regulations'],
      views: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#f59e0b';
      case 'published': return '#10b981';
      case 'archived': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'published': return 'Published';
      case 'archived': return 'Archived';
      default: return status;
    }
  };

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
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          + New Blog Post
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
            {blogs.filter(b => b.status === 'published').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Published</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
            {blogs.filter(b => b.status === 'draft').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Drafts</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
            {blogs.reduce((sum, blog) => sum + blog.views, 0)}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Views</div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6' }}>
            {blogs.length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Posts</div>
        </div>
      </div>

      {/* Blog Posts */}
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
                  Author
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
                <tr key={blog.id} style={{ borderBottom: index < blogs.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div>
                      <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>{blog.title}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{blog.excerpt}</div>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {blog.tags.map(tag => (
                          <span key={tag} style={{
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
                  <td style={{ padding: '16px 20px', color: '#374151' }}>
                    {blog.author}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: `${getStatusColor(blog.status)}20`,
                      color: getStatusColor(blog.status)
                    }}>
                      {getStatusText(blog.status)}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#6b7280' }}>
                    {blog.views.toLocaleString()}
                  </td>
                  <td style={{ padding: '16px 20px', color: '#6b7280' }}>
                    {blog.publishedAt}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        Edit
                      </button>
                      <button style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        View
                      </button>
                      <button style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
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

      {/* Empty State Message */}
      {blogs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
          <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 8px 0' }}>No blog posts yet</h3>
          <p style={{ margin: 0 }}>Create your first blog post to get started.</p>
        </div>
      )}
    </div>
  );
}
