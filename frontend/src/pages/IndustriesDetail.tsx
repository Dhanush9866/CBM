import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import LoadingAnimation from '@/components/Common/LoadingAnimation';
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
        <div className="container-responsive text-center flex flex-col items-center">
          <LoadingAnimation size="sm" text="" />
          <p className="text-muted-foreground mt-4">Loading industry details...</p>
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

  const renderRichText = (text: string) => {
    const lines = (text || '').split(/\r?\n/);
    const nodes: JSX.Element[] = [];
    let buffer: string[] = [];

    const flushParagraph = () => {
      if (buffer.length) {
        nodes.push(
          <p key={`p-${nodes.length}`} className="text-base md:text-lg leading-8 text-gray-600 dark:text-gray-300 text-justify">
            {buffer.join(' ')}
          </p>
        );
        buffer = [];
      }
    };

    // Helper: detect if a plain line looks like a heading.
    // Catches: **bold**, lines ending with ':', or short lines (<= 80 chars)
    // that don't end with sentence punctuation (. ? ! " ,) and have no commas
    // — distinguishes "Mining & Metals Industry Focus" from body sentences.
    const isHeadingLine = (line: string): boolean => {
      if (/^\*\*(.*?)\*\*:?$/.test(line)) return true; // **Bold text** or **Bold text**:
      if (line.endsWith(':') && line.length <= 80) return true; // "Benefits:"
      // Short line with no sentence-ending punctuation and no commas → treat as heading
      if (
        line.length <= 80 &&
        !/[.,?!"]$/.test(line) &&   // doesn't end like a sentence
        !line.includes(',') &&       // no commas (body text usually has them)
        !/^[""]/.test(line)          // not a quoted line
      ) return true;
      return false;
    };

    const extractHeadingText = (line: string): string => {
      // Strip ** markers and trailing colon
      return line.replace(/^\*\*/, '').replace(/\*\*:?$/, '').replace(/:$/, '').trim();
    };

    lines.forEach((raw, idx) => {
      const line = raw.trim();
      if (!line) {
        flushParagraph();
        return;
      }

      // Skip backend placeholder text that should never be shown to users
      if (line.toLowerCase().includes('default footer for unmatched sections')) return;

      // Markdown-style heading: # ## ### etc.
      const match = line.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        flushParagraph();
        const hashes = match[1].length;
        const title = match[2];
        const commonClass = "font-bold text-gray-900 dark:text-white mb-3 mt-8 first:mt-0 border-l-4 border-primary pl-3";
        if (hashes === 1) {
          nodes.push(<h2 key={`h2-${idx}`} className={`text-2xl md:text-3xl ${commonClass}`}>{title}</h2>);
        } else if (hashes === 2) {
          nodes.push(<h3 key={`h3-${idx}`} className={`text-xl md:text-2xl ${commonClass}`}>{title}</h3>);
        } else if (hashes === 3) {
          nodes.push(<h4 key={`h4-${idx}`} className={`text-lg md:text-xl ${commonClass}`}>{title}</h4>);
        } else {
          nodes.push(<h5 key={`h5-${idx}`} className={`text-base md:text-lg ${commonClass}`}>{title}</h5>);
        }
        return;
      }

      // Plain-text heading detection (e.g. "Benefits:" or "**Mining Focus**")
      if (isHeadingLine(line)) {
        flushParagraph();
        const title = extractHeadingText(line);
        nodes.push(
          <h4
            key={`ph-${idx}`}
            className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-2 first:mt-0 border-l-4 border-primary pl-3"
          >
            {title}
          </h4>
        );
        return;
      }

      buffer.push(line);
    });
    flushParagraph();
    return nodes;
  };

  return (
    <div>
      {/* <section className="section pb-0">
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
      </section> */}

      <section className="section pt-0">
        <div className="container-responsive max-w-5xl mx-auto">
          {/* Enhanced heading with better visual hierarchy */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {section.title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full"></div>
          </div>

          {/* Layout: diagonal images with content in the middle, keeping current positions */}
          {section.images && section.images.length >= 2 ? (
            <div className="flex flex-col gap-8">
              {/* First image - diagonal alignment based on index */}
              {(() => {
                const alignment = 0 % 3 === 0 ? 'justify-start' : 0 % 3 === 1 ? 'justify-center' : 'justify-end';
                return (
                  <div className={`flex w-full ${alignment}`}>
                    <div className="overflow-hidden w-full md:max-w-4xl">
                      <img
                        src={section.images[0]}
                        alt={`${section.title} 1`}
                        className="w-full h-64 md:h-80 object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Enhanced content styling */}
              <div className="space-y-6 md:px-4">{renderRichText(section.bodyText || '')}</div>

              {/* Second image - diagonal alignment based on index */}
              {(() => {
                const alignment = 1 % 3 === 0 ? 'justify-start' : 1 % 3 === 1 ? 'justify-center' : 'justify-end';
                return (
                  <div className={`flex w-full ${alignment}`}>
                    <div className="overflow-hidden w-full md:max-w-4xl">
                      <img
                        src={section.images[1]}
                        alt={`${section.title} 2`}
                        className="w-full h-64 md:h-80 object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Any remaining images - continue diagonal pattern */}
              {section.images.length > 2 && (
                <div className="space-y-6">
                  {section.images.slice(2).map((url, idx) => {
                    const globalIndex = 2 + idx;
                    const alignment = globalIndex % 3 === 0 ? 'justify-start' : globalIndex % 3 === 1 ? 'justify-center' : 'justify-end';
                    return (
                      <div key={`img-${globalIndex}`} className={`flex w-full ${alignment}`}>
                        <div className="overflow-hidden w-full md:max-w-4xl">
                          <img
                            src={url}
                            alt={`${section.title} ${globalIndex + 1}`}
                            className="w-full h-64 md:h-80 object-cover rounded-2xl"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <>
              {section.images && section.images.length === 1 && (
                (() => {
                  const alignment = 0 % 3 === 0 ? 'justify-start' : 0 % 3 === 1 ? 'justify-center' : 'justify-end';
                  return (
                    <div className={`flex w-full mb-10 ${alignment}`}>
                      <div className="overflow-hidden w-full md:max-w-4xl">
                        <img src={section.images[0]} alt={section.title} className="w-full h-64 md:h-80 object-cover rounded-2xl" />
                      </div>
                    </div>
                  );
                })()
              )}
              {/* Enhanced content styling for single image layout */}
              <div className="space-y-6">{renderRichText(section.bodyText || '')}</div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}




