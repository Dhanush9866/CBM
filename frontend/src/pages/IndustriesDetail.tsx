import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getPageWithSections, PageDto, SectionDto } from '@/utils/api';

export default function IndustriesDetail() {
  const { slug } = useParams();
  const location = useLocation() as { state?: { section?: SectionDto } };
  const [page, setPage] = useState<PageDto | null>(null);
  const [section, setSection] = useState<SectionDto | null>(location.state?.section || null);
  const [loading, setLoading] = useState<boolean>(!location.state?.section);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!slug || section) return;
      try {
        setLoading(true);
        const p = await getPageWithSections('industries');
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
  }, [slug]);

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
        <div className="container-responsive max-w-6xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">{section.title}</h1>

          {/* Layout: top image | middle content | bottom image */}
          {section.images && section.images.length >= 2 ? (
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={section.images[0]}
                  alt={`${section.title} 1`}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-4 md:px-2">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="text-base md:text-lg leading-7 text-gray-700 dark:text-gray-300">{p}</p>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={section.images[1]}
                  alt={`${section.title} 2`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ) : (
            <>
              {section.images && section.images.length === 1 && (
                <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <img src={section.images[0]} alt={section.title} className="w-full h-auto object-cover" />
                </div>
              )}
              <div className="space-y-4">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="text-base md:text-lg leading-7 text-gray-700 dark:text-gray-300">{p}</p>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}




