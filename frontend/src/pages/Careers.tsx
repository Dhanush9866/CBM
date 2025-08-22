
import { HeroSection } from '@/components/Common/HeroSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  MapPin, 
  Clock, 
  GraduationCap,
  Heart,
  Globe,
  TrendingUp,
  Award,
  Coffee,
  Briefcase
} from 'lucide-react';

const jobListings = [
  {
    id: 1,
    title: "Senior Test Engineer - Automotive",
    department: "Engineering",
    location: "Detroit, MI",
    type: "Full-time",
    level: "Senior Level",
    description: "Lead automotive testing projects for major OEMs. Experience with crash testing and vehicle safety systems required."
  },
  {
    id: 2,
    title: "Medical Device Certification Specialist",
    department: "Healthcare",
    location: "San Diego, CA", 
    type: "Full-time",
    level: "Mid Level",
    description: "Support medical device manufacturers through FDA and international certification processes."
  },
  {
    id: 3,
    title: "Cybersecurity Consultant",
    department: "Technology",
    location: "Austin, TX",
    type: "Full-time",
    level: "Senior Level", 
    description: "Provide cybersecurity assessments and consulting for enterprise clients across industries."
  },
  {
    id: 4,
    title: "Quality Assurance Inspector",
    department: "Manufacturing",
    location: "Phoenix, AZ",
    type: "Full-time",
    level: "Entry Level",
    description: "Conduct quality inspections and audits for manufacturing facilities. Travel required."
  },
  {
    id: 5,
    title: "Environmental Testing Technician",
    department: "Environmental",
    location: "Seattle, WA",
    type: "Full-time", 
    level: "Mid Level",
    description: "Perform environmental testing and analysis for compliance with environmental regulations."
  },
  {
    id: 6,
    title: "Business Development Manager",
    department: "Sales",
    location: "New York, NY",
    type: "Full-time",
    level: "Senior Level",
    description: "Drive new business growth in the Northeast region. Technical background preferred."
  }
];

export default function Careers() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Build Your Career with Global Impact"
        subtitle="Join Our Team"
        description="Advance your career with a world leader in testing, inspection, and certification. Make a difference in safety, security, and sustainability."
        primaryCTA={{
          text: "View Open Positions",
          href: "#jobs"
        }}
        secondaryCTA={{
          text: "Learn About Culture",
          href: "#culture"
        }}
      />

      {/* Why CBM */}
      <section className="section">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose CBM?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join a company where your expertise drives innovation and your work 
              makes the world safer, more secure, and sustainable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Opportunities",
                description: "Work on international projects with career mobility across 150+ countries worldwide."
              },
              {
                icon: TrendingUp,
                title: "Professional Growth",
                description: "Continuous learning opportunities, mentorship programs, and clear advancement paths."
              },
              {
                icon: Award,
                title: "Industry Recognition",
                description: "Be part of an award-winning organization recognized for excellence and innovation."
              },
              {
                icon: Heart,
                title: "Purpose-Driven Work",
                description: "Make a meaningful impact on safety, security, and sustainability around the world."
              },
              {
                icon: Users,
                title: "Collaborative Culture", 
                description: "Work with diverse, talented teams in an inclusive environment that values every voice."
              },
              {
                icon: Coffee,
                title: "Work-Life Balance",
                description: "Flexible work arrangements, comprehensive benefits, and wellness programs."
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-tuv-gray-50 rounded-lg">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-6">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="section bg-primary text-white" id="culture">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our Culture & Values
              </h2>
              <p className="text-white/90 text-lg mb-8">
                At CBM, we foster an environment where excellence thrives, 
                innovation flourishes, and every team member can reach their full potential.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Excellence",
                    description: "We set the highest standards and continuously strive to exceed expectations."
                  },
                  {
                    title: "Independence", 
                    description: "We maintain objectivity and integrity in all our decisions and actions."
                  },
                  {
                    title: "Passion",
                    description: "We are passionate about our work and committed to making a positive impact."
                  },
                  {
                    title: "Honesty",
                    description: "We conduct business with transparency, fairness, and ethical principles."
                  }
                ].map((value, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-white rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{value.title}</h3>
                      <p className="text-white/80">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Employee Benefits</h3>
              <div className="space-y-4">
                {[
                  "Competitive salary and performance bonuses",
                  "Comprehensive health and wellness programs", 
                  "Professional development and training opportunities",
                  "Flexible work arrangements and remote options",
                  "Generous vacation and personal time off",
                  "Employee recognition and awards programs",
                  "Retirement planning and financial wellness",
                  "Global mobility and international assignments"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section" id="jobs">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Current Openings</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore exciting career opportunities across our global organization. 
              Find the perfect role to advance your career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {jobListings.map((job) => (
              <div key={job.id} className="bg-white border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {job.level}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <Button className="w-full lg:w-auto">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Don't see the right role? We're always looking for talented individuals.
            </p>
            <Button variant="outline" size="lg">
              Submit General Application
            </Button>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section bg-tuv-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Hiring Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've designed our process to be transparent, efficient, and 
              focused on finding the right mutual fit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Application Review",
                description: "Our talent team reviews your application and qualifications against role requirements."
              },
              {
                step: "02", 
                title: "Initial Interview",
                description: "Phone or video interview to discuss your background, interests, and fit for the role."
              },
              {
                step: "03",
                title: "Technical Assessment",
                description: "Role-specific technical evaluation or case study to assess your capabilities."
              },
              {
                step: "04",
                title: "Final Interview",
                description: "Meet with hiring managers and team members to discuss collaboration and next steps."
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-4">{process.step}</div>
                <h3 className="text-xl font-semibold mb-4">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-responsive text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Make Your Impact?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join our team of experts and contribute to making the world safer, 
            more secure, and sustainable. Your career growth starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary">
              Browse All Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">
                Contact HR Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
