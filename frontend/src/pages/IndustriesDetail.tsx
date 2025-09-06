import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getPageWithSections, PageDto, SectionDto } from '@/utils/api';
import { useTranslation } from '@/contexts/TranslationContext';

export default function IndustriesDetail() {
  const { slug } = useParams();
  const location = useLocation() as { state?: { section?: SectionDto } };
  const { currentLanguage } = useTranslation();
  const prevLanguageRef = useRef(currentLanguage);
  const [page, setPage] = useState<PageDto | null>(null);
  const [section, setSection] = useState<SectionDto | null>(location.state?.section || null);
  const [loading, setLoading] = useState<boolean>(!location.state?.section);

  // Redirect to parent page when language changes
  useEffect(() => {
    // Only redirect if language actually changed and we have a valid slug
    if (prevLanguageRef.current !== currentLanguage && slug) {
      window.location.href = '/industries';
    }
    // Update the ref to current language
    prevLanguageRef.current = currentLanguage;
  }, [currentLanguage, slug]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!slug || section) return;
      try {
        setLoading(true);
        const p = await getPageWithSections('industries', undefined, currentLanguage);
        if (!isMounted) return;
        setPage(p);
        const target = p.sections?.find(s => s.sectionId === slug || s.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-') === slug) || null;
        setSection(target);
      } catch (e) {
        // ignore
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [slug, currentLanguage]);

  if (!slug) return null;

  if (loading) {
    return (
      <section className="section">
        <div className="container-responsive text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading industry details...</p>
        </div>
      </section>
    );
  }

  if (!section) {
    return (
      <section className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">Industry item not found.</p>
          <Button asChild>
            <Link to="/industries">Back to Industries</Link>
          </Button>
        </div>
      </section>
    );
  }

  const paragraphs = (section.bodyText || '')
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean);

  return (
    <div>
      <section className="section pb-0">
        <div className="container-responsive">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/industries">Industries</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/industries/${slug}`}>{section.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-responsive max-w-5xl mx-auto">
          {/* Enhanced heading with better visual hierarchy */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {section.title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
          </div>

          {/* Layout: top image | middle content | bottom image */}
          {section.images && section.images.length >= 2 ? (
            <div className="flex flex-col gap-8">
              {/* Images without borders or rounded corners */}
              <div className="overflow-hidden">
                <img
                  src={section.images[0]}
                  alt={`${section.title} 1`}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl"
                />
              </div>

              {/* Enhanced content styling */}
              <div className="space-y-6 md:px-4">
                {paragraphs.map((p, idx) => {
                  // Check if paragraph contains a heading pattern
                  const isHeading = p.length < 100 && (p.includes(':') || p.includes('Focus') || p.includes('Benefits') || p.includes('Industry'));
                  
                  if (isHeading) {
                    return (
                      <h2 key={idx} className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8 first:mt-0">
                        {p}
                      </h2>
                    );
                  }
                  
                  return (
                    <p key={idx} className="text-lg leading-8 text-gray-700 dark:text-gray-300 text-justify">
                      {p}
                    </p>
                  );
                })}
              </div>

              {/* Reduced second image size - no border/radius */}
              <div className="overflow-hidden">
                <img
                  src={section.images[1]}
                  alt={`${section.title} 2`}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          ) : (
            <>
              {section.images && section.images.length === 1 && (
                <div className="overflow-hidden mb-10">
                  <img src={section.images[0]} alt={section.title} className="w-full h-64 md:h-80 object-cover rounded-2xl" />
                </div>
              )}
              {/* Enhanced content styling for single image layout */}
              <div className="space-y-6">
                {paragraphs.map((p, idx) => {
                  // Check if paragraph contains a heading pattern
                  const isHeading = p.length < 100 && (p.includes(':') || p.includes('Focus') || p.includes('Benefits') || p.includes('Industry'));
                  
                  if (isHeading) {
                    return (
                      <h2 key={idx} className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-8 first:mt-0">
                        {p}
                      </h2>
                    );
                  }
                  
                  return (
                    <p key={idx} className="text-lg leading-8 text-gray-700 dark:text-gray-300 text-justify">
                      {p}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}




