
import { HeroSection } from '@/components/Common/HeroSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Video, 
  Calendar,
  Download,
  Clock,
  User,
  Tag
} from 'lucide-react';

const resources = [
  {
    id: 1,
    title: "Medical Device Regulatory Guide 2024",
    type: "White Paper",
    category: "Healthcare",
    author: "Dr. Sarah Chen",
    date: "March 15, 2024",
    readTime: "12 min read",
    description: "Comprehensive guide to navigating FDA and international medical device regulations, including recent updates and compliance strategies.",
    image: "/api/placeholder/400/240",
    tags: ["FDA", "Medical Devices", "Regulations"]
  },
  {
    id: 2,
    title: "Automotive Cybersecurity Testing Standards",
    type: "Technical Report", 
    category: "Automotive",
    author: "Michael Rodriguez",
    date: "March 10, 2024",
    readTime: "8 min read",
    description: "Latest developments in automotive cybersecurity testing methodologies and ISO/SAE 21434 compliance requirements.",
    image: "/api/placeholder/400/240",
    tags: ["Cybersecurity", "Automotive", "ISO 21434"]
  },
  {
    id: 3,
    title: "Sustainable Energy Certification Trends",
    type: "Industry Report",
    category: "Energy",
    author: "Emma Thompson",
    date: "March 8, 2024", 
    readTime: "15 min read",
    description: "Analysis of emerging trends in renewable energy certification and their impact on global sustainability goals.",
    image: "/api/placeholder/400/240",
    tags: ["Renewable Energy", "Sustainability", "Certification"]
  },
  {
    id: 4,
    title: "AI and Machine Learning in Testing",
    type: "Webinar",
    category: "Technology",
    author: "CBM Experts",
    date: "March 5, 2024",
    readTime: "45 min watch",
    description: "Explore how artificial intelligence is revolutionizing testing methodologies across industries.",
    image: "/api/placeholder/400/240",
    tags: ["AI", "Machine Learning", "Testing"]
  },
  {
    id: 5,
    title: "Supply Chain Risk Assessment Framework",
    type: "Case Study",
    category: "Manufacturing",
    author: "James Wilson",
    date: "March 1, 2024",
    readTime: "10 min read",
    description: "Real-world case study demonstrating effective supply chain risk assessment and mitigation strategies.",
    image: "/api/placeholder/400/240", 
    tags: ["Supply Chain", "Risk Management", "Manufacturing"]
  },
  {
    id: 6,
    title: "Food Safety Testing Innovations",
    type: "Research Article",
    category: "Food & Agriculture",
    author: "Dr. Lisa Park",
    date: "February 28, 2024",
    readTime: "7 min read", 
    description: "Latest innovations in food safety testing technologies and their applications in modern agriculture.",
    image: "/api/placeholder/400/240",
    tags: ["Food Safety", "Innovation", "Testing"]
  }
];

const categories = [
  "All Categories",
  "Healthcare", 
  "Automotive",
  "Energy",
  "Technology",
  "Manufacturing",
  "Food & Agriculture"
];

const resourceTypes = [
  "All Types",
  "White Paper",
  "Technical Report", 
  "Industry Report",
  "Webinar",
  "Case Study",
  "Research Article"
];

export default function Resources() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Knowledge Hub & Industry Insights"
        subtitle="Stay Informed"
        description="Access the latest industry insights, technical resources, and expert knowledge to stay ahead of trends and regulations."
        primaryCTA={{
          text: "Browse Resources",
          href: "#resources"
        }}
        secondaryCTA={{
          text: "Subscribe to Updates",
          href: "#newsletter"
        }}
      />

      {/* Featured Resources */}
      <section className="section">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Resources</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Curated insights from our global team of experts across all major industry sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {resources.slice(0, 2).map((resource) => (
              <div key={resource.id} className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-tuv-gray-100">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {resource.type}
                    </span>
                    <span className="text-muted-foreground text-sm">{resource.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{resource.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{resource.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{resource.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-tuv-gray-100 text-tuv-gray-700 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources */}
      <section className="section bg-tuv-gray-50" id="resources">
        <div className="container-responsive">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg sticky top-24">
                <h3 className="font-bold mb-4">Filter Resources</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Resource Type</h4>
                  <div className="space-y-2">
                    {resourceTypes.map((type, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Clear Filters
                </Button>
              </div>
            </div>
            
            {/* Resources Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold">All Resources</h2>
                  <p className="text-muted-foreground">{resources.length} resources available</p>
                </div>
                <select className="border border-border rounded-md px-4 py-2">
                  <option>Sort by Date</option>
                  <option>Sort by Title</option>
                  <option>Sort by Category</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource) => (
                  <div key={resource.id} className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video bg-tuv-gray-100">
                      <img 
                        src={resource.image} 
                        alt={resource.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                          {resource.type}
                        </span>
                        <span className="text-muted-foreground text-xs">{resource.category}</span>
                      </div>
                      
                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {resource.description.substring(0, 120)}...
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{resource.author}</span>
                        <span>{resource.readTime}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {resource.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="bg-tuv-gray-100 text-tuv-gray-700 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Resources
                </Button>
              </div>
            </div>
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
              Subscribe to our newsletter and receive the latest industry insights, 
              regulatory updates, and expert analysis directly in your inbox.
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
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { icon: BookOpen, label: "Industry Reports", count: "50+ per year" },
                { icon: Video, label: "Expert Webinars", count: "Monthly sessions" },
                { icon: FileText, label: "Technical Papers", count: "Exclusive access" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 bg-white/10 rounded-full mb-3">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="font-medium mb-1">{item.label}</div>
                  <div className="text-sm text-white/70">{item.count}</div>
                </div>
              ))}
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
            and answer your specific questions about regulations and standards.
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
