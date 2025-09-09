import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageWithSections, SectionDto } from '@/utils/api';
// Cover photos are now provided by backend via SectionDto.coverPhoto
import { useTranslation } from '@/contexts/TranslationContext';
import LoadingAnimation from '@/components/Common/LoadingAnimation';

export default function CBMMonitoring() {
  const navigate = useNavigate();
  const { currentLanguage } = useTranslation();
  const [sections, setSections] = useState<SectionDto[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cover photos will be read from backend (item.coverPhoto)

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        console.log('Loading CBM sections for language:', currentLanguage);
        setLoading(true);
        setError(null);
        const page = await getPageWithSections('cbm', undefined, currentLanguage);
        console.log('Received page data:', page);
        if (isMounted) {
          setSections(page.sections || []);
          setPageData(page);
        }
      } catch (e) {
        console.error('Error loading CBM sections:', e);
        console.error('Error details:', {
          message: e instanceof Error ? e.message : 'Unknown error',
          stack: e instanceof Error ? e.stack : undefined,
          response: (e as any)?.response?.data
        });
        if (isMounted) setError('Failed to load CBM sections');
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/cbm">Condition based Monitoring (CBM)</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-6 text-center">
            {loading ? (
              <div className="flex flex-col items-center">
                <LoadingAnimation size="md" text="Loading" />
                <p className="text-muted-foreground mt-4">Loading page...</p>
              </div>
            ) : (
              <>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                  {pageData?.title || 'Condition based Monitoring (CBM)'}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed md:leading-8 whitespace-pre-line text-center">
                  {pageData?.description || 'Our Condition-Based Monitoring (CBM) services provide real-time insights into the health and performance of critical assets, enabling predictive maintenance, reduced downtime, and extended equipment life. By integrating IoT, AI, and advanced sensor technologies, we help industries move from reactive and scheduled maintenance to a datadriven, proactive approach. "Smart Monitoring. Predictive Insights. Reliable Assets."'}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section pt-6">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {error && !loading && (
              <div className="col-span-full text-center text-destructive">{error}</div>
            )}
            {!loading && !error && sections.map((item) => (
              <Card
                key={item._id}
                className="overflow-hidden group hover:shadow-tuv-md transition-all cursor-pointer"
                onClick={() => navigate(`/services/cbm/${item.sectionId || toSlug(item.title)}`, { 
                  state: { sectionData: item, serviceType: 'cbm', serviceDisplayName: 'Condition based Monitoring (CBM)' } 
                })}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/services/cbm/${item.sectionId || toSlug(item.title)}`, { 
                      state: { sectionData: item, serviceType: 'cbm', serviceDisplayName: 'Condition based Monitoring (CBM)' } 
                    });
                  }
                }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img src={item.coverPhoto || (item.images && item.images[0]) || '/placeholder.svg'} alt={item.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.bodyText?.slice(0, 140) || ''}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link 
                      to={`/services/cbm/${item.sectionId || toSlug(item.title)}`}
                      state={{ sectionData: item, serviceType: 'cbm', serviceDisplayName: 'Condition based Monitoring (CBM)' }}
                    >
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


