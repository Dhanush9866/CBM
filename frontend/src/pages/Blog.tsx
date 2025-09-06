
import { HeroSection } from '@/components/Common/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  ArrowRight, 
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark
} from 'lucide-react';

// Blog post data structure
interface BlogPost {
  id: number;
  title: string;

  excerpt: string;
  content: string;

  publishedAt: string;

 
  tags: string[];
  featuredImage: string;
  
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Non-Destructive Testing: AI and Machine Learning Integration",
    excerpt: "Explore how artificial intelligence and machine learning are revolutionizing non-destructive testing methodologies, improving accuracy and efficiency across industries.",
    content: "Artificial intelligence and machine learning are transforming the landscape of non-destructive testing (NDT) in unprecedented ways. These technologies are enabling more accurate defect detection, faster analysis, and improved reliability across various industries including aerospace, automotive, and manufacturing.\n\nKey benefits include:\n• Automated defect recognition with 95% accuracy\n• Real-time analysis and reporting\n• Reduced human error and inspection time\n• Predictive maintenance capabilities\n• Enhanced data visualization and interpretation\n\nThe integration of AI in NDT processes allows for continuous learning and improvement, making inspections more efficient and reliable than ever before.",
    publishedAt: "2024-03-15",
    tags: ["AI", "Machine Learning", "NDT", "Innovation"],
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Understanding ISO 9712:2021 - Latest Updates in NDT Personnel Certification",
    excerpt: "A comprehensive guide to the latest ISO 9712:2021 standard updates and their impact on NDT personnel certification requirements worldwide.",
    content: "The ISO 9712:2021 standard represents a significant update to NDT personnel certification requirements, introducing new competency frameworks and assessment methods. This revision emphasizes practical skills, theoretical knowledge, and continuous professional development.\n\nMajor changes include:\n• Updated qualification requirements for Level I, II, and III personnel\n• Enhanced practical examination procedures\n• New digital certification management systems\n• Improved international recognition and portability\n• Stricter continuing education requirements\n\nThese updates ensure that NDT professionals maintain the highest standards of competency and stay current with evolving industry practices and technologies.",
    publishedAt: "2024-03-12",
    tags: ["ISO 9712", "Certification", "Standards", "Training"],
    featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Ultrasonic Testing in Aerospace: Ensuring Safety in Critical Applications",
    excerpt: "Discover how ultrasonic testing plays a crucial role in aerospace safety, from component inspection to structural integrity assessment.",
    content: "Ultrasonic testing (UT) is a cornerstone of aerospace safety, providing critical insights into the structural integrity of aircraft components. This non-destructive method uses high-frequency sound waves to detect internal flaws, cracks, and material discontinuities that could compromise flight safety.\n\nApplications in aerospace include:\n• Engine component inspection\n• Wing and fuselage structural assessment\n• Landing gear integrity verification\n• Composite material evaluation\n• Weld quality assurance\n\nAdvanced UT techniques such as phased array and time-of-flight diffraction (TOFD) enable precise defect characterization and sizing, ensuring that aircraft meet the stringent safety standards required for commercial and military aviation.",
    publishedAt: "2024-03-10",
    tags: ["Ultrasonic Testing", "Aerospace", "Safety", "Inspection"],
    featuredImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Radiographic Testing: Digital Revolution in Industrial Inspection",
    excerpt: "Learn about the digital transformation in radiographic testing and how it's improving inspection capabilities in industrial applications.",
    content: "The digital revolution in radiographic testing has transformed traditional film-based methods into sophisticated digital systems that offer superior image quality, faster processing, and enhanced analysis capabilities. Digital radiography (DR) and computed radiography (CR) are now standard in many industrial applications.\n\nKey advantages of digital radiography:\n• Immediate image availability and review\n• Enhanced image processing and analysis tools\n• Reduced chemical waste and environmental impact\n• Improved image storage and retrieval systems\n• Remote inspection capabilities\n• Better defect detection sensitivity\n\nThese technological advances have made radiographic testing more efficient, cost-effective, and environmentally friendly while maintaining the high standards required for critical industrial inspections.",
    publishedAt: "2024-03-08",
    tags: ["Radiographic Testing", "Digital", "Industrial", "Innovation"],
    featuredImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Magnetic Particle Testing: Best Practices for Surface Crack Detection",
    excerpt: "Master the fundamentals of magnetic particle testing with our comprehensive guide to surface crack detection techniques and best practices.",
    content: "Magnetic particle testing (MPT) is one of the most effective methods for detecting surface and near-surface discontinuities in ferromagnetic materials. This reliable technique is widely used across industries for quality assurance and safety-critical applications.\n\nBest practices for effective MPT include:\n• Proper surface preparation and cleaning\n• Correct magnetization technique selection\n• Appropriate particle type and application method\n• Adequate lighting conditions for inspection\n• Proper interpretation of indications\n• Documentation and reporting standards\n\nUnderstanding the physics behind magnetic particle testing and following established procedures ensures reliable defect detection and helps maintain the highest quality standards in manufacturing and maintenance operations.",
    publishedAt: "2024-03-05",
    tags: ["Magnetic Particle", "Surface Testing", "Crack Detection", "Best Practices"],
    featuredImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop"
  }
];

export default function Blog() {
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());

  const toggleExpanded = (postId: number) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
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

  const formatContent = (content: string) => {
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
      {/* Hero Section */}
      <HeroSection
        title="Technical Blog & Industry Insights"
        subtitle="Expert Knowledge"
        description="Stay informed with the latest insights, technical articles, and industry updates from our team of NDT and testing experts."
        primaryCTA={{
          text: "Explore Articles",
          href: "#blog-posts"
        }}
        secondaryCTA={{
          text: "Subscribe to Updates",
          href: "#newsletter"
        }}
      />

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
            {blogPosts.map((post) => {
              const isExpanded = expandedPosts.has(post.id);
              
              return (
                <Card key={post.id} className="w-full overflow-hidden hover:shadow-lg transition-all duration-300">
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
                          onClick={() => toggleExpanded(post.id)}
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
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="mt-8 pt-6 border-t border-border">
                          <div className="prose prose-lg max-w-none">
                            {formatContent(post.content)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
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
