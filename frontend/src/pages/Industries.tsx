
import { HeroSection } from '@/components/Common/HeroSection';
import { IndustryCard } from '@/components/Common/IndustryCard';
import { industries, industryStats } from '@/data/industries';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPageWithSections, SectionDto } from '@/utils/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/contexts/TranslationContext';
import { getIndustryCoverImage } from '@/utils/industryImages';

export default function Industries() {
  const navigate = useNavigate();
  const { currentLanguage } = useTranslation();
  const [sections, setSections] = useState<SectionDto[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        console.log('Loading industries sections for language:', currentLanguage);
        setLoading(true);
        setError(null);
        const page = await getPageWithSections('industries', undefined, currentLanguage);
        console.log('Received page data:', page);
        if (isMounted) {
          setSections(page.sections || []);
          setPageData(page);
        }
      } catch (e) {
        console.error('Error loading industries sections:', e);
        console.error('Error details:', {
          message: e instanceof Error ? e.message : 'Unknown error',
          stack: e instanceof Error ? e.stack : undefined,
          response: (e as any)?.response?.data
        });
        if (isMounted) setError('Failed to load industries sections');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [currentLanguage]);

  const toSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  return (
    <div>
      <section className="section pb-2">
        <div className="container-responsive">
          <div className="mt-6 text-center">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded mb-3 mx-auto max-w-md"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 mx-auto max-w-4xl"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 mx-auto max-w-4xl"></div>
                <div className="h-6 bg-gray-200 rounded mx-auto max-w-3xl"></div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                  {pageData?.title || 'Industries We Serve'}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-none leading-relaxed md:leading-8 whitespace-pre-line text-justify">
                  {pageData?.description || 'From automotive to aerospace, healthcare to energy - we provide specialized services across all major industry sectors. Our deep industry knowledge and specialized services are tailored to meet the unique challenges and regulatory requirements of your sector.'}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Industry Overview */}
      {/* <section className="section">
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
      </section>  */}

      {/* Industries Grid (from backend) */}
      <section className="section pt-6 bg-tuv-gray-50" id="industries">
        <div className="container-responsive">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <div className="col-span-full text-center text-muted-foreground">Loading...</div>
            )}
            {error && !loading && (
              <div className="col-span-full text-center text-destructive">{error}</div>
            )}
            {!loading && !error && sections.map((s) => (
              <Card
                key={s._id}
                className="overflow-hidden group hover:shadow-tuv-md transition-all cursor-pointer"
                onClick={() => navigate(`/industries/${s.sectionId || toSlug(s.title)}`, { state: { section: s } })}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/industries/${s.sectionId || toSlug(s.title)}`, { state: { section: s } });
                  }
                }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={getIndustryCoverImage(s.title) || (s.images && s.images[0]) || '/placeholder.svg'} 
                    alt={s.title} 
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" 
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.bodyText?.slice(0, 140) || ''}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/industries/${s.sectionId || toSlug(s.title)}`} state={{ section: s }}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
{/* 
      Industry Benefits
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
      {/* <section className="section bg-primary text-white">
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
      </section> */} 
    </div>
  );
}
