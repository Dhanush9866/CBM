
import { HeroSection } from '@/components/Common/HeroSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Globe, 
  Award, 
  Target, 
  Heart, 
  Eye,
  TrendingUp,
  Calendar,
  MapPin
} from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="150+ Years of Excellence in Safety & Quality"
        subtitle="Since 1866"
        description="From our founding in Germany to our global presence today, CBM has been at the forefront of safety, security, and sustainability."
        primaryCTA={{
          text: "Our Story",
          href: "#story"
        }}
        secondaryCTA={{
          text: "Join Our Team",
          href: "/careers"
        }}
      />

      {/* Company Story */}
      <section className="section" id="story">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                Our Heritage
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                A Legacy of Trust and Innovation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Founded in 1866 as a steam boiler inspection company in Munich, Germany, 
                CBM has evolved into one of the world's leading technical service 
                organizations. Our journey from local inspector to global partner reflects 
                our commitment to adapting with the times while maintaining unwavering 
                standards of excellence.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Calendar, label: "Founded", value: "1866" },
                  { icon: MapPin, label: "Countries", value: "150+" },
                  { icon: Users, label: "Employees", value: "25,000+" },
                  { icon: Globe, label: "Locations", value: "1,000+" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-3 bg-primary/10 rounded-full mb-3">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="btn-primary" asChild>
                <Link to="/services">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-tuv-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Key Milestones</h3>
              <div className="space-y-6">
                {[
                  {
                    year: "1866",
                    title: "Foundation",
                    description: "Established as steam boiler inspection association in Munich"
                  },
                  {
                    year: "1960s",
                    title: "International Expansion", 
                    description: "Began global expansion with focus on automotive testing"
                  },
                  {
                    year: "1990s",
                    title: "Service Diversification",
                    description: "Expanded into IT, telecommunications, and management systems"
                  },
                  {
                    year: "2000s",
                    title: "Digital Innovation",
                    description: "Pioneered digital solutions and Industry 4.0 services"
                  },
                  {
                    year: "Today",
                    title: "Global Leadership",
                    description: "Leading provider across all major industry sectors worldwide"
                  }
                ].map((milestone, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 w-16 text-sm font-bold text-primary">
                      {milestone.year}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section bg-tuv-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Purpose & Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Guided by our mission to add tangible value to society, business, and the environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: "Mission",
                description: "To add tangible value to society, business, and the environment by enabling progress through testing, inspection, certification, and knowledge services.",
                color: "bg-primary"
              },
              {
                icon: Eye,
                title: "Vision", 
                description: "To be recognized as the global partner of choice for safety, security, and sustainability solutions that add tangible value.",
                color: "bg-accent"
              },
              {
                icon: Heart,
                title: "Values",
                description: "Excellence, Independence, Passion, and Honesty guide everything we do, ensuring we deliver services with integrity and commitment.",
                color: "bg-tuv-blue-600"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex p-6 ${item.color} rounded-full mb-6`}>
                  <item.icon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Expertise */}
      <section className="section">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-primary text-white rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-6">
                Global Leadership Team
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Our experienced leadership team brings together decades of industry expertise, 
                technical knowledge, and strategic vision to guide CBM's continued growth 
                and innovation.
              </p>
              
              <div className="space-y-6">
                {[
                  "Strategic vision and direction",
                  "Technical excellence and innovation", 
                  "Global market understanding",
                  "Sustainable business practices"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="mt-8 bg-white text-primary hover:bg-white/90">
                Meet Our Leaders
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Expertise That Drives Innovation
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                With 25,000+ experts across diverse disciplines, we combine deep technical 
                knowledge with practical experience to solve complex challenges and drive 
                innovation in every industry we serve.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "1,000+", label: "PhD Holders", description: "Advanced technical expertise" },
                  { number: "500+", label: "Industry Sectors", description: "Comprehensive coverage" },
                  { number: "50+", label: "Service Categories", description: "Complete solutions" },
                  { number: "99%", label: "Client Satisfaction", description: "Proven excellence" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-tuv-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="font-medium mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability & Innovation */}
      <section className="section bg-tuv-blue-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Commitment to Sustainability
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just testing for today's standards – we're helping shape 
              tomorrow's sustainable future through innovation and responsibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Carbon Neutral Operations",
                description: "Committed to achieving carbon neutrality across all operations by 2030 through renewable energy and efficiency improvements."
              },
              {
                icon: Globe,
                title: "Sustainable Innovation",
                description: "Developing new testing methods and certification schemes that support the transition to a sustainable economy."
              },
              {
                icon: Users,
                title: "Social Responsibility",
                description: "Investing in communities, education, and diversity initiatives to create positive social impact worldwide."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-responsive text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Partner with Excellence?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join thousands of companies worldwide who trust CBM for their 
            testing, inspection, and certification needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary" asChild>
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/careers">
                Join Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
