
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
        title="CBM 360° TIV™ - Global Leader in Testing, Inspection & Verification"
        subtitle="Since 1992"
        description="Founded in the United Kingdom, CBM 360 TIV has grown into a trusted global partner in Testing, Inspection, Certification, Condition-Based Monitoring, and Verification services across 72 countries."
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
                Founded in 1992 in the United Kingdom, CBM 360 TIV has grown into a trusted global partner 
                in Testing, Inspection, Certification, Condition-Based Monitoring, and Verification services. 
                With regional headquarters in Dubai (Middle East & Africa), Hong Kong (Asia), and Brazil 
                (North & South America), we support industries across 72 countries, driven by a commitment 
                to safety, quality, and sustainability.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Calendar, label: "Founded", value: "1992" },
                  { icon: MapPin, label: "Countries", value: "72" },
                  { icon: Users, label: "Professionals", value: "7,000+" },
                  { icon: Globe, label: "Branch Offices", value: "72" }
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
                    year: "1992",
                    title: "Foundation",
                    description: "Established in the United Kingdom as a testing and inspection company"
                  },
                  {
                    year: "2000s",
                    title: "Regional Expansion", 
                    description: "Opened regional headquarters in Dubai, Hong Kong, and Brazil"
                  },
                  {
                    year: "2010s",
                    title: "Global Network",
                    description: "Expanded to 72 countries with 72 branch offices worldwide"
                  },
                  {
                    year: "2020s",
                    title: "Advanced Capabilities",
                    description: "Built 23 advanced laboratories and 7,000+ professional team"
                  },
                  {
                    year: "Today",
                    title: "Industry Leadership",
                    description: "Leading provider across oil & gas, mining, power, and infrastructure sectors"
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
              Our brand is built on trust, integrity, and technical excellence. By combining global expertise with local presence, we help organizations achieve the highest standards of quality, safety, environmental protection, and social responsibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: "Mission",
                description: "To deliver innovative solutions that address the evolving challenges of industries including oil & gas, mining, power generation, petrochemicals, manufacturing, marine, and infrastructure development.",
                color: "bg-primary"
              },
              {
                icon: Eye,
                title: "Vision", 
                description: "To be the global leader in Testing, Inspection, Certification, Condition-Based Monitoring, and Verification services, ensuring reliability, driving innovation, and building confidence worldwide.",
                color: "bg-accent"
              },
              {
                icon: Heart,
                title: "Values",
                description: "Trust, integrity, and technical excellence guide everything we do. We go beyond compliance to deliver innovative solutions that enhance operational performance and extend asset life.",
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
                Our team of 7,000 professionals, backed by a network of 23 advanced laboratories 
                and 72 branch offices worldwide, works closely with clients to enhance operational 
                performance, extend asset life, and ensure compliance with international standards 
                and regulations.
              </p>
              
              <div className="space-y-6">
                {[
                  "Regional headquarters in Dubai, Hong Kong, and Brazil",
                  "Advanced laboratories and testing facilities", 
                  "Global market expertise across 72 countries",
                  "Innovative solutions beyond compliance"
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
                At CBM 360 TIV, we go beyond compliance—delivering innovative solutions that address 
                the evolving challenges of industries including oil & gas (onshore/offshore), mining, 
                power generation, petrochemicals, manufacturing, marine, and infrastructure development.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "7,000+", label: "Professionals", description: "Expert technical team" },
                  { number: "23", label: "Advanced Labs", description: "State-of-the-art facilities" },
                  { number: "72", label: "Countries", description: "Global presence" },
                  { number: "72", label: "Branch Offices", description: "Local expertise" }
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
            CBM 360 TIV – Ensuring Reliability. Driving Innovation. Building Confidence.
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join thousands of companies worldwide who trust CBM 360 TIV for their 
            testing, inspection, certification, condition-based monitoring, and verification needs.
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
