
import { HeroSection } from '@/components/Common/HeroSection';
import { JobApplicationDialog } from '@/components/Common/JobApplicationDialog';
import { GeneralApplicationDialog } from '@/components/Common/GeneralApplicationDialog';
import { CareersMap, parseCountry } from '@/components/Careers/CareersMap';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listCareers, CareerDto } from '@/services/careersService';
import { useTranslation } from '@/contexts/TranslationContext';
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
  Briefcase,
  Calendar,
  Coins
} from 'lucide-react';

export default function Careers() {
  const [jobs, setJobs] = useState<CareerDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { currentLanguage, translations } = useTranslation();
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        // Pass the current language to get translated career data
        const data = await listCareers({ active: true, lang: currentLanguage });
        if (isMounted) setJobs(data);
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load careers');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [currentLanguage]); // Re-fetch when language changes

  return (
    <div>
      {/* Hero Section */}
      {/* <HeroSection
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
      /> */}

      {/* Why CBM */} 
      {/* <section className="section">
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
      </section> */}

      {/* Culture & Values */}
      {/* <section className="section bg-primary text-white" id="culture">
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
      </section> */}

      {/* Open Positions */}
      <section id="jobs" className="bg-white border-t border-border">
        <div className="flex flex-col lg:flex-row w-full lg:h-[calc(100vh-96px)] lg:min-h-[600px] lg:overflow-hidden bg-white">
          {/* Sidebar: Filtered Jobs list */}
          <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-white flex flex-col h-full order-2 lg:order-1">
            {/* Header with Title */}
            <div className="px-6 py-5 border-b border-border bg-white">
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {translations?.pages?.careers?.title || 'Current Openings'}
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5">
                Explore exciting global opportunities and build your career with us.
              </p>
            </div>

            {/* Stats display */}
            <div className="px-6 py-3.5 bg-gray-50/50 border-b border-border flex items-center justify-between">
              <div className="text-xs text-gray-500 font-medium">
                Displaying <span className="text-primary font-semibold">{jobs.filter((job) => !selectedLocation || job.location === selectedLocation).length}</span>/{jobs.length} results
              </div>
              {selectedLocation && (
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                >
                  Clear Filter
                </button>
              )}
            </div>

            {loading && (
              <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 min-h-[250px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>{translations?.pages?.careers?.currentOpenings?.loadingText || 'Loading careers...'}</span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="flex-1 flex items-center justify-center text-destructive p-8 min-h-[250px]">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="flex-1 overflow-y-auto divide-y divide-border lg:max-h-none max-h-[500px] scrollbar-thin pr-1">
                {jobs.filter((job) => !selectedLocation || job.location === selectedLocation).length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-white">
                    No positions found for this location.
                  </div>
                ) : (
                  jobs
                    .filter((job) => !selectedLocation || job.location === selectedLocation)
                    .map((job) => (
                      <Link key={job._id} to={`/careers/${job._id}`} className="block group">
                        <div className="p-6 bg-white hover:bg-tuv-gray-50/40 transition-colors">
                          <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-500 font-medium">
                              {job.location}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 mt-2">
                              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                <Coins className="h-4 w-4 text-primary/70 shrink-0" />
                                <span>{job.tags && job.tags[0] ? job.tags[0] : 'Competitive'}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                <Clock className="h-4 w-4 text-primary/70 shrink-0" />
                                <span>{job.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                )}
              </div>
            )}
          </div>

          {/* Map: Right side */}
          <div className="flex-1 h-[350px] sm:h-[450px] lg:h-full w-full order-1 lg:order-2 relative bg-gray-50">
            <CareersMap 
              jobs={jobs} 
              selectedLocation={selectedLocation} 
              onSelectLocation={setSelectedLocation} 
            />
          </div>
        </div>
      </section>

      {/* General Application Section */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">
            {translations?.pages?.careers?.currentOpenings?.generalApplicationText || 
              "Don't see the right role? We're always looking for talented individuals."}
          </p>
          <GeneralApplicationDialog>
            <Button 
              variant="outline" 
              size="lg"
            >
              {translations?.pages?.careers?.currentOpenings?.submitGeneralApplication || 'Submit General Application'}
            </Button>
          </GeneralApplicationDialog>
        </div>
      </section>

      {/* Application Process */}
      <section className="section bg-tuv-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {translations?.pages?.careers?.hiringProcess?.title || 'Our Hiring Process'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {translations?.pages?.careers?.hiringProcess?.description || 
                "We've designed our process to be transparent, efficient, and focused on finding the right mutual fit."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: translations?.pages?.careers?.hiringProcess?.steps?.review?.title || "Application Review",
                description: translations?.pages?.careers?.hiringProcess?.steps?.review?.description || "Our talent team reviews your application and qualifications against role requirements."
              },
              {
                step: "02", 
                title: translations?.pages?.careers?.hiringProcess?.steps?.interview?.title || "Initial Interview",
                description: translations?.pages?.careers?.hiringProcess?.steps?.interview?.description || "Phone or video interview to discuss your background, interests, and fit for the role."
              },
              {
                step: "03",
                title: translations?.pages?.careers?.hiringProcess?.steps?.assessment?.title || "Technical Assessment",
                description: translations?.pages?.careers?.hiringProcess?.steps?.assessment?.description || "Role-specific technical evaluation or case study to assess your capabilities."
              },
              {
                step: "04",
                title: translations?.pages?.careers?.hiringProcess?.steps?.final?.title || "Final Interview",
                description: translations?.pages?.careers?.hiringProcess?.steps?.final?.description || "Meet with hiring managers and team members to discuss collaboration and next steps."
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
      {/* <section className="section">
        <div className="container-responsive text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Make Your Impact?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join our team of experts and contribute to making the world safer, 
            more secure, and sustainable. Your career growth starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-primary"
              onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
            >
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
      </section> */}
    </div>
  );
}
