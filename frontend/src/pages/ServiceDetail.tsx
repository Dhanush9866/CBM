import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { SectionDto } from '@/utils/api';
import { useTranslation } from '@/contexts/TranslationContext';

// Props interface for ServiceDetail
interface ServiceDetailProps {
  sectionData?: SectionDto;
  serviceType?: string;
  serviceDisplayName?: string;
}

// Lightweight Markdown-like parser supporting H1/H2/H3, paragraphs and bullets
function parseContentToBlocks(raw: string): Array<{ type: string; content: JSX.Element; props?: any }> {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const blocks: Array<{ type: string; content: JSX.Element; props?: any }> = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(' ').trim();
      if (text) {
        blocks.push({
          type: 'p',
          content: (
            <div key={`p-${blocks.length}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
              <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{text}</p>
            </div>
          )
        });
      }
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({
        type: 'ul',
        content: (
          <ul key={`ul-${blocks.length}`} className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            {listBuffer.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
        )
      });
      listBuffer = [];
    }
  };

  const startNewBlock = () => {
    flushParagraph();
    flushList();
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      // Blank line separates blocks
      startNewBlock();
      return;
    }

    // Bullets: -, *, •, – or numbered like 1.
    if (/^(\-|\*|•|–)\s+/.test(trimmed)) {
      flushParagraph();
      const bulletContent = trimmed.replace(/^(\-|\*|•|–)\s+/, '');
      
      // Check if bullet content starts with **text** pattern
      const boldMatch = bulletContent.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
      if (boldMatch) {
        // Treat as a heading instead of a bullet point
        const headingText = boldMatch[1].trim();
        const remainingText = boldMatch[2].trim();
        const Tag = 'h3' as keyof JSX.IntrinsicElements;
        const sizeClass = 'text-xl md:text-2xl';
        blocks.push({
          type: 'h3',
          content: (
            <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
              {headingText}
            </Tag>
          ),
          props: { children: headingText }
        });
        
        // If there's remaining text after the heading, add it as a paragraph
        if (remainingText) {
          blocks.push({
            type: 'p',
            content: (
              <div key={`p-${blocks.length}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
                <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{remainingText}</p>
              </div>
            )
          });
        }
        return;
      }
      
      listBuffer.push(bulletContent);
      return;
    }
    if (/^\d+\.[\)\.]?\s+/.test(trimmed)) {
      flushParagraph();
      const bulletContent = trimmed.replace(/^\d+\.[\)\.]?\s+/, '');
      
      // Check if bullet content starts with **text** pattern
      const boldMatch = bulletContent.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
      if (boldMatch) {
        // Treat as a heading instead of a bullet point
        const headingText = boldMatch[1].trim();
        const remainingText = boldMatch[2].trim();
        const Tag = 'h4' as keyof JSX.IntrinsicElements;
        const sizeClass = 'text-xl md:text-2xl';
        blocks.push({
          type: 'h3',
          content: (
            <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
              {headingText}
            </Tag>
          ),
          props: { children: headingText }
        });
        
        // If there's remaining text after the heading, add it as a paragraph
        if (remainingText) {
          blocks.push({
            type: 'p',
            content: (
              <div key={`p-${blocks.length}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
                <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{remainingText}</p>
              </div>
            )
          });
        }
        return;
      }
      
      listBuffer.push(bulletContent);
      return;
    }

    // Headings: #, ##, ### or **text** patterns
    const hMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (hMatch) {
      startNewBlock();
      const level = hMatch[1].length;
      const text = hMatch[2].trim();
      const Tag = (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3') as keyof JSX.IntrinsicElements;
      const sizeClass = level === 1 ? 'text-3xl md:text-4xl' : level === 2 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';
      blocks.push({
        type: level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3',
        content: (
          <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
            {text}
          </Tag>
        ),
        props: { children: text }
      });
      return;
    }

    // Bold text as headings: **text** patterns
    const boldMatch = trimmed.match(/^\*\*(.*?)\*\*:?\s*$/);
    if (boldMatch) {
      startNewBlock();
      const text = boldMatch[1].trim();
      // Determine heading level based on context or use h3 as default
      const Tag = 'h3' as keyof JSX.IntrinsicElements;
      const sizeClass = 'text-xl md:text-2xl';
      blocks.push({
        type: 'h3',
        content: (
          <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
            {text}
          </Tag>
        ),
        props: { children: text }
      });
      return;
    }

    // Fallback: treat as paragraph text; will be merged until blank line
    paragraphBuffer.push(trimmed);
  });

  // Flush any remaining buffers
  startNewBlock();

  return blocks;
}

// Service type mapping for display names and routes
const serviceTypeMap: Record<string, { displayName: string; route: string }> = {
  'verification-certification': {
    displayName: 'Verification & Certification (VC)',
    route: '/services/verification-certification'
  },
  'testing': {
    displayName: 'Testing & Inspection',
    route: '/services/testing'
  },
  'inspection': {
    displayName: 'Inspection (I)',
    route: '/services/inspection'
  },
  'cbm': {
    displayName: 'Condition based Monitoring (CBM)',
    route: '/services/cbm'
  },
  'auditing': {
    displayName: 'Auditing (A)',
    route: '/services/auditing'
  },
  'innovation-rd': {
    displayName: 'Innovation & R&D',
    route: '/services/innovation-rd'
  }
};

export default function ServiceDetail({ sectionData, serviceType, serviceDisplayName }: ServiceDetailProps) {
  const { serviceType: urlServiceType, slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage } = useTranslation();
  const prevLanguageRef = useRef(currentLanguage);
  
  // Get service info from props or URL params
  const currentServiceType = serviceType || urlServiceType;
  const serviceInfo = currentServiceType ? serviceTypeMap[currentServiceType] : null;
  const displayName = serviceDisplayName || serviceInfo?.displayName || 'Service';
  const serviceRoute = serviceInfo?.route || '/services';
  
  // Get section data from props or location state
  const section = sectionData || location.state?.sectionData;

  // Redirect to parent page when language changes
  useEffect(() => {
    // Only redirect if language actually changed and we have a valid service route
    if (prevLanguageRef.current !== currentLanguage && serviceRoute && serviceRoute !== '/services') {
      navigate(serviceRoute, { replace: true });
    }
    // Update the ref to current language
    prevLanguageRef.current = currentLanguage;
  }, [currentLanguage, serviceRoute, navigate]);

  // Validation
  if (!currentServiceType) {
    return (
      <div className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">Invalid service type.</p>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">{displayName} item not found.</p>
          <Button asChild>
            <Link to={serviceRoute}>Back to {displayName}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <section className="section pb-0">
        <div className="container-responsive">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={serviceRoute}>{displayName}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`${serviceRoute}/${slug}`}>
                  {section?.title || 'Detail'}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section> */}

      {/* Content with images from section data */}
      {(section?.bodyText || (section?.images && section.images.length > 0)) && (
        <section className="section pt-0">
          <div className="container-responsive max-w-6xl mx-auto">
            {(() => {
              // Use section data directly
              const content = section?.bodyText || '';
              const textBlocks = parseContentToBlocks(content);
              
              // Use images from section data
              const imageUrls = section?.images || [];
              
              // Determine main title from first H1
              const mainTitle = (textBlocks.find((b) => b.type === 'h1')?.props?.children) as string | undefined;
              
              // Strategic image placement based on content structure
              const blocks: JSX.Element[] = [];
              let imageIndex = 0;
              
              // Targeted fix: ensure strict ordering for the
              // Industrial Structural Health Monitoring & Fitness VC page
              const isIndustrialSHMVC =
                (serviceType || currentServiceType) === 'verification-certification' && (
                  (slug && slug.includes('industrial-structural-health-monitoring')) ||
                  (section?.title && section.title.toLowerCase().includes('industrial structural health monitoring'))
                );
              let paragraphCount = 0;

              // For all services, use content-agnostic placement to keep order stable across languages
              if (imageUrls.length > 0) {
                const contentBlocks: JSX.Element[] = [];
                // Build plain content blocks first
                textBlocks.forEach((block, blockIndex) => {
                  if (block.type === 'h2' && mainTitle && block.props?.children === mainTitle) {
                    return;
                  }
                  contentBlocks.push(
                    <div key={`txt-${blockIndex}`} className="mb-4">
                      {block.content}
                    </div>
                  );
                });

                const finalBlocks: JSX.Element[] = [];
                const midIndex = Math.max(1, Math.floor(contentBlocks.length / 2));

                // Insert content and images at required positions
                contentBlocks.forEach((cb, idx) => {
                  finalBlocks.push(cb);
                  // After the very first block (ideally H1), place first image
                  if (idx === 0 && imageUrls[0]) {
                    finalBlocks.push(
                      <div key={`img-top-0`} className={`flex w-full mb-6 justify-start`}>
                        <div className="overflow-hidden md:max-w-3xl w-full">
                          <img
                            src={imageUrls[0]}
                            alt={section?.title || 'Service Image'}
                            className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                          />
                        </div>
                      </div>
                    );
                  }
                  // Around the middle, place second image
                  if (idx === midIndex && imageUrls[1]) {
                    finalBlocks.push(
                      <div key={`img-mid-1`} className={`flex w-full mb-6 justify-center`}>
                        <div className="overflow-hidden md:max-w-2xl w-full">
                          <img
                            src={imageUrls[1]}
                            alt={section?.title || 'Service Image'}
                            className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                          />
                        </div>
                      </div>
                    );
                  }
                });

                // After all content, place third image if exists
                if (imageUrls[2]) {
                  finalBlocks.push(
                    <div key={`img-end-2`} className={`flex w-full mb-6 justify-end`}>
                      <div className="overflow-hidden md:max-w-2xl w-full">
                        <img
                          src={imageUrls[2]}
                          alt={section?.title || 'Service Image'}
                          className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                        />
                      </div>
                    </div>
                  );
                }

                // If more than 3 images, append remaining with diagonal pattern
                if (imageUrls.length > 3) {
                  imageUrls.slice(3).forEach((url, idx) => {
                    const globalIndex = 3 + idx;
                    const alignment = globalIndex % 3 === 0 ? 'justify-start' : globalIndex % 3 === 1 ? 'justify-center' : 'justify-end';
                    finalBlocks.push(
                      <div key={`img-rest-${globalIndex}`} className={`flex w-full ${alignment}`}>
                        <div className="overflow-hidden w-full md:max-w-2xl">
                          <img
                            src={url}
                            alt={section?.title || 'Service Image'}
                            className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                          />
                        </div>
                      </div>
                    );
                  });
                }

                return <div className="space-y-4">{finalBlocks}</div>;
              }

              // Fallback (should not hit when images exist): original strategic logic
              textBlocks.forEach((block, blockIndex) => {
                // Skip H2 that duplicates main H1 text
                if (block.type === 'h2' && mainTitle && block.props?.children === mainTitle) {
                  return;
                }
                
                // Add text block
                blocks.push(
                  <div key={`txt-${blockIndex}`} className="mb-4">
                    {block.content}
                  </div>
                );
                
                // Strategic image placement based on content
                if (imageUrls.length > 0) {
                  if (isIndustrialSHMVC) {
                    // Enforce strict order: first (left) after H1, second (center) after first paragraph,
                    // third (right) after second paragraph
                    if (blockIndex === 0 && block.type === 'h1' && imageIndex === 0) {
                      blocks.push(
                        <div key={`img-${imageIndex}`} className={`flex w-full mb-6 justify-start`}>
                          <div className="overflow-hidden md:max-w-3xl w-full">
                            <img
                              src={imageUrls[imageIndex]}
                              alt={section?.title || 'Service Image'}
                              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                            />
                          </div>
                        </div>
                      );
                      imageIndex++;
                    }

                    if (block.type === 'p') {
                      paragraphCount++;
                      if (imageIndex === 1 && paragraphCount === 1) {
                        blocks.push(
                          <div key={`img-${imageIndex}`} className={`flex w-full mb-6 justify-center`}>
                            <div className="overflow-hidden md:max-w-2xl w-full">
                              <img
                                src={imageUrls[imageIndex]}
                                alt={section?.title || 'Service Image'}
                                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                              />
                            </div>
                          </div>
                        );
                        imageIndex++;
                      } else if (imageIndex === 2 && paragraphCount === 2) {
                        blocks.push(
                          <div key={`img-${imageIndex}`} className={`flex w-full mb-6 justify-end`}>
                            <div className="overflow-hidden md:max-w-2xl w-full">
                              <img
                                src={imageUrls[imageIndex]}
                                alt={section?.title || 'Service Image'}
                                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                              />
                            </div>
                          </div>
                        );
                        imageIndex++;
                      }
                    }
                  } else {
                    // Default logic for other pages
                    // First image after main title (H1)
                    if (blockIndex === 0 && block.type === 'h1' && imageIndex < imageUrls.length) {
                      const alignment = imageIndex % 3 === 0 ? 'justify-start' : imageIndex % 3 === 1 ? 'justify-center' : 'justify-end';
                      blocks.push(
                        <div key={`img-${imageIndex}`} className={`flex w-full mb-6 ${alignment}`}>
                          <div className="overflow-hidden md:max-w-3xl w-full">
                            <img
                              src={imageUrls[imageIndex]}
                              alt={section?.title || 'Service Image'}
                              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                            />
                          </div>
                        </div>
                      );
                      imageIndex++;
                    }
                    
                    // Second image after "Why Choose..." heading
                    if (block.type === 'h2' && 
                        block.props?.children?.includes('Why Choose') && 
                        imageIndex < imageUrls.length) {
                      const alignment = imageIndex % 3 === 0 ? 'justify-start' : imageIndex % 3 === 1 ? 'justify-center' : 'justify-end';
                      blocks.push(
                        <div key={`img-${imageIndex}`} className={`flex w-full mb-6 ${alignment}`}>
                          <div className="overflow-hidden md:max-w-2xl w-full">
                            <img
                              src={imageUrls[imageIndex]}
                              alt={section?.title || 'Service Image'}
                              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                            />
                          </div>
                        </div>
                      );
                      imageIndex++;
                    }
                    
                    // Third image alongside "Ready to Inspect" section (if available)
                    if (block.type === 'h2' && 
                        block.props?.children?.includes('Ready to Inspect') && 
                        imageIndex < imageUrls.length) {
                      // Create a two-column layout for this section
                      const nextBlock = textBlocks[blockIndex + 1];
                      if (nextBlock && nextBlock.type === 'p') {
                        blocks.push(
                          <div key={`img-text-${imageIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                              <div className="mb-4">{nextBlock.content}</div>
                            </div>
                            <div className="overflow-hidden">
                              <img
                                src={imageUrls[imageIndex]}
                                alt={section?.title || 'Service Image'}
                                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                              />
                            </div>
                          </div>
                        );
                        imageIndex++;
                        // Skip the next paragraph since we've already rendered it
                        return;
                      }
                    }
                  }
                }
              });

              // Render any remaining images that were not placed by the strategic rules
              if (imageIndex < imageUrls.length) {
                const remaining = imageUrls.slice(imageIndex);
                blocks.push(
                  <div key={`remaining-${imageIndex}`} className="space-y-6 mb-6">
                    {remaining.map((url, idx) => {
                      const globalIndex = imageIndex + idx;
                      const alignment = globalIndex % 3 === 0 ? 'justify-start' : globalIndex % 3 === 1 ? 'justify-center' : 'justify-end';
                      return (
                        <div key={`rem-${idx}`} className={`flex w-full ${alignment}`}>
                          <div className="overflow-hidden w-full md:max-w-2xl">
                            <img
                              src={url}
                              alt={section?.title || 'Service Image'}
                              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
              
              if (blocks.length === 0 && textBlocks.length === 0 && imageUrls.length > 0) {
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="overflow-hidden">
                        <img 
                          src={url} 
                          alt={section?.title || 'Service Image'} 
                          className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl" 
                        />
                      </div>
                    ))}
                  </div>
                );
              }
              
              return <div className="space-y-4">{blocks}</div>;
            })()}
          </div>
        </section>
      )}

    </div>
  );
}
