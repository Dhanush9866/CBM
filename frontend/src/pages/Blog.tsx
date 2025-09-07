
import { HeroSection } from '@/components/Common/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  Loader2
} from 'lucide-react';
import { getBlogs, getBlogTags, getBlogById, BlogPostDto } from '@/services/blogService';

// State for blog data
interface BlogState {
  posts: BlogPostDto[];
  loading: boolean;
  error: string | null;
  tags: string[];
  currentPage: number;
  totalPages: number;
}

export default function Blog() {
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [postsWithContent, setPostsWithContent] = useState<Map<string, string>>(new Map());
  const [loadingContent, setLoadingContent] = useState<Set<string>>(new Set());
  const [blogState, setBlogState] = useState<BlogState>({
    posts: [],
    loading: true,
    error: null,
    tags: [],
    currentPage: 1,
    totalPages: 1
  });

  // Load blog data on component mount
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setBlogState(prev => ({ ...prev, loading: true, error: null }));
        
        // Load blog posts and tags in parallel
        const [blogsResponse, tags] = await Promise.all([
          getBlogs({ page: 1, limit: 10 }),
          getBlogTags()
        ]);

        console.log('Blog API Response:', blogsResponse);
        console.log('Blog posts:', blogsResponse.blogs);

        setBlogState(prev => ({
          ...prev,
          posts: blogsResponse.blogs,
          tags,
          currentPage: blogsResponse.pagination.currentPage,
          totalPages: blogsResponse.pagination.totalPages,
          loading: false
        }));
      } catch (error) {
        console.error('Error loading blog data:', error);
        setBlogState(prev => ({
          ...prev,
          error: 'Failed to load blog posts. Please try again later.',
          loading: false
        }));
      }
    };

    loadBlogData();
  }, []);

  const toggleExpanded = async (postId: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
      
      // Load full content if not already loaded
      if (!postsWithContent.has(postId) && !loadingContent.has(postId)) {
        setLoadingContent(prev => new Set(prev).add(postId));
        try {
          const fullPost = await getBlogById(postId);
          setPostsWithContent(prev => new Map(prev).set(postId, fullPost.content));
        } catch (error) {
          console.error('Error loading blog content:', error);
        } finally {
          setLoadingContent(prev => {
            const newSet = new Set(prev);
            newSet.delete(postId);
            return newSet;
          });
        }
      }
    }
    setExpandedPosts(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading component
  if (blogState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Error component
  if (blogState.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{blogState.error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const formatContent = (content: string | undefined) => {
    if (!content) {
      return <p className="text-muted-foreground">Content not available.</p>;
    }
    
    return content.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      if (line.startsWith('•')) {
        return (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <span className="text-primary mt-1">•</span>
            <span>{line.substring(1).trim()}</span>
          </div>
        );
      }
      return <p key={index} className="mb-3">{line}</p>;
    });
  };

  return (
    <div>
      

      {/* Blog Posts Section */}
      <section className="section" id="blog-posts">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Technical insights and industry updates from our team of experts.
            </p>
          </div>
          
          <div className="space-y-8">
            {blogState.posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No blog posts available at the moment.</p>
              </div>
            ) : (
              blogState.posts.map((post) => {
                const isExpanded = expandedPosts.has(post._id);
              
              return (
                  <Card key={post._id} className="w-full overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/3">
                      <div className="aspect-video lg:aspect-square overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-2/3 p-6 lg:p-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-sm text-muted-foreground">{formatDate(post.publishedAt)}</span>
                          {post.isFeatured && (
                            <Badge variant="default" className="text-xs">
                              Featured
                            </Badge>
                          )}
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                        {post.excerpt}
                      </p>
                      
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Toggle Button and Actions */}
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="outline" 
                            onClick={() => toggleExpanded(post._id)}
                          className="flex items-center space-x-2"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show Less</span>
                              <ChevronUp className="h-4 w-4" />
                            </>
                          ) : (
                            <>
                              <span>Read Full Article</span>
                              <ChevronDown className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                        
                      </div>
                      
                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="mt-8 pt-6 border-t border-border">
                          <div className="prose prose-lg max-w-none">
                            {loadingContent.has(post._id) ? (
                              <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                <span className="text-muted-foreground">Loading content...</span>
                              </div>
                            ) : (
                              formatContent(postsWithContent.get(post._id) || post.content)
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
              })
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section bg-primary text-white" id="newsletter">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Stay Updated with Industry Insights
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Subscribe to our newsletter and receive the latest technical articles, 
              industry updates, and expert insights directly in your inbox.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-md border-0 text-tuv-gray-900 placeholder:text-tuv-gray-500"
                />
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Subscribe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="text-sm text-white/70">
                <label className="flex items-center justify-center space-x-2">
                  <input type="checkbox" className="rounded border-white/30" />
                  <span>I agree to receive marketing communications from CBM</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Experts */}
      <section className="section">
        <div className="container-responsive text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Need Expert Consultation?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Our technical experts are available to provide personalized guidance 
            and answer your specific questions about NDT methods and industry standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary" asChild>
              <Link to="/contact">
                Speak with an Expert
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
