import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageWithSections, SectionDto } from '@/utils/api';
// Cover photos are now provided by backend via SectionDto.coverPhoto
import { useTranslation } from '@/contexts/TranslationContext';
import LoadingAnimation from '@/components/Common/LoadingAnimation';

export default function VerificationCertification() {
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

  // Cover photos will be read from backend (item.coverPhoto)

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        console.log('Loading verification sections for language:', currentLanguage);
        setLoading(true);
        setError(null);
        const page = await getPageWithSections('verification', undefined, currentLanguage);
        console.log('Received page data:', page);
        if (isMounted) {
          setSections(page.sections || []);
          setPageData(page);
        }
      } catch (e) {
        console.error('Error loading verification sections:', e);
        console.error('Error details:', {
          message: e instanceof Error ? e.message : 'Unknown error',
          stack: e instanceof Error ? e.stack : undefined,
          response: (e as any)?.response?.data
        });
        if (isMounted) setError('Failed to load verification & certification sections');
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
        

          <div className="mt-6 text-center">
            {loading ? (
              <div className="flex flex-col items-center">
                <LoadingAnimation size="md" text="Loading" />
                <p className="text-muted-foreground mt-4">Loading page...</p>
              </div>
            ) : (
              <>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                  {pageData?.title || 'Verification & Certification (VC)'}
                </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed md:leading-8 whitespace-pre-line text-center">
                  {pageData?.description || 'Our Verification & Certification Services provide independent assurance that industrial assets, processes, and products meet international standards, client specifications, and regulatory requirements. Leveraging a global network of certified inspectors and auditors, we deliver trusted third-party verification and certification to enhance safety, reliability, and operational excellence. "Trusted Verification & Certification – Ensuring Compliance, Quality, and Safety Across Industries."'}
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
                onClick={() => navigate(`/services/verification-certification/${item.sectionId || toSlug(item.title)}`, { 
                  state: { sectionData: item, serviceType: 'verification-certification', serviceDisplayName: 'Verification & Certification (VC)' } 
                })}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/services/verification-certification/${item.sectionId || toSlug(item.title)}`, { 
                      state: { sectionData: item, serviceType: 'verification-certification', serviceDisplayName: 'Verification & Certification (VC)' } 
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
                  <p className="text-sm text-muted-foreground leading-relaxed">{toPreview(item.bodyText, 180)}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link 
                      to={`/services/verification-certification/${item.sectionId || toSlug(item.title)}`}
                      state={{ sectionData: item, serviceType: 'verification-certification', serviceDisplayName: 'Verification & Certification (VC)' }}
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
