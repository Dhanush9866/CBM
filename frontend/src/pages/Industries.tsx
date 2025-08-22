
import { HeroSection } from '@/components/Common/HeroSection';
import { IndustryCard } from '@/components/Common/IndustryCard';
import { industries, industryStats } from '@/data/industries';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Shield } from 'lucide-react';

export default function Industries() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Industry Expertise Across All Sectors"
        subtitle="Specialized Solutions"
        description="Deep industry knowledge and specialized services tailored to meet the unique challenges and regulatory requirements of your sector."
        primaryCTA={{
          text: "Find Your Industry",
          href: "#industries"
        }}
        secondaryCTA={{
          text: "Contact Expert",
          href: "/contact"
        }}
      />

      {/* Industry Overview */}
      <section className="section">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">
                Sector-Specific Solutions
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Each industry has unique challenges, regulatory requirements, and quality standards. 
                Our deep sector expertise ensures you receive the most relevant and effective 
                testing, inspection, and certification services for your specific needs.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: Target,
                    title: "Focused Expertise",
                    description: "Industry-specific knowledge and experience"
                  },
                  {
                    icon: TrendingUp,
                    title: "Market Leadership",
                    description: "Helping leaders stay ahead of regulations"
                  },
                  {
                    icon: Shield,
                    title: "Risk Mitigation",
                    description: "Identifying and preventing industry risks"
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-tuv-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Industry Insights</h3>
              <div className="space-y-6">
                {industryStats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-primary">
                      {stat.number}
                    </div>
                    <div>
                      <div className="font-medium">{stat.label}</div>
                      <div className="text-sm text-muted-foreground">{stat.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section bg-tuv-gray-50" id="industries">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From automotive to aerospace, healthcare to energy - we provide specialized 
              services across all major industry sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <IndustryCard key={industry.id} {...industry} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Benefits */}
      <section className="section">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Benefits Across All Industries
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Regardless of your sector, our services deliver consistent value and 
              competitive advantages for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Market Access",
                description: "Open doors to new markets with internationally recognized certifications",
                number: "01"
              },
              {
                title: "Risk Reduction",
                description: "Identify and mitigate potential risks before they impact your business",
                number: "02"
              },
              {
                title: "Quality Assurance",
                description: "Ensure consistent quality that meets or exceeds customer expectations",
                number: "03"
              },
              {
                title: "Regulatory Compliance",
                description: "Stay compliant with evolving regulations and industry standards",
                number: "04"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl font-bold text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">
                  {benefit.number}
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-white">
        <div className="container-responsive text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Advance Your Industry Leadership?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Connect with our industry specialists to explore how our services 
            can help you achieve your business objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/contact">
                Speak with an Expert
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
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
