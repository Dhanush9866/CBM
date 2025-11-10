import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageWithSections, SectionDto } from '@/utils/api';
// Cover photos are now provided by backend via SectionDto.coverPhoto
import { useTranslation } from '@/contexts/TranslationContext';
import LoadingAnimation from '@/components/Common/LoadingAnimation';

export default function TestingInspection() {
  const navigate = useNavigate();
  const { currentLanguage, translations } = useTranslation();
  const [sections, setSections] = useState<SectionDto[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get translation with fallback
  const t = (key: string) => {
    if (!translations) return key;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  // Cover photos will be read from backend (s.coverPhoto)

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const page = await getPageWithSections('testing', undefined, currentLanguage);
        if (isMounted) {
          setSections(page.sections || []);
          setPageData(page);
        }
      } catch (e) {
        if (isMounted) setError('Failed to load testing sections');
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
  const toPreview = (text?: string, max = 140) => {
    if (!text) return '';
    return text
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/#/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, max);
  };
  return (
    <div>
      <section className="section pb-2">
        <div className="container-responsive">
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/testing">Testing</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}

          <div className="mt-6 text-center">
            {loading ? (
              <div className="flex flex-col items-center">
                <LoadingAnimation size="md" text="Loading" />
                <p className="text-muted-foreground mt-4">Loading page...</p>
              </div>
            ) : (
              <>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                  {pageData?.title || 'Testing'}
                </h1>
                <p className="text-xs md:text-base lg:text-lg text-muted-foreground leading-relaxed md:leading-8 whitespace-pre-line text-center">
                  {pageData?.description || 'Our Testing Services provide precise, reliable, and globally recognized solutions to ensure the safety, quality, and compliance of critical assets across industries. Backed by advanced laboratories, certified professionals, and innovative technologies, we deliver end-to-end testing support tailored to client requirements and international standards. "Delivering Trusted Testing Services – Ensuring Safety, Quality, and Compliance Across Global Industries."'}
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
            {!loading && !error && sections.map((s) => (
              <Card
                key={s._id}
                className="overflow-hidden group hover:shadow-tuv-md transition-all cursor-pointer"
                onClick={() => navigate(`/services/testing/${s.sectionId || toSlug(s.title)}`, { 
                  state: { sectionData: s, serviceType: 'testing', serviceDisplayName: 'Testing & Inspection' } 
                })}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/services/testing/${s.sectionId || toSlug(s.title)}`, { 
                      state: { sectionData: s, serviceType: 'testing', serviceDisplayName: 'Testing & Inspection' } 
                    });
                  }
                }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img src={s.coverPhoto || (s.images && s.images[0]) || '/placeholder.svg'} alt={s.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{toPreview(s.bodyText, 180)}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link 
                      to={`/services/testing/${s.sectionId || toSlug(s.title)}`}
                      state={{ sectionData: s, serviceType: 'testing', serviceDisplayName: 'Testing & Inspection' }}
                    >
                      {t('services.viewDetails')}
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


