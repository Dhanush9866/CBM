import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getPageWithSections, PageDto, SectionDto } from '@/utils/api';
import { imageService, CloudinaryImage } from '@/services/imageService';
import { getVerificationCertificationItemBySlug } from '@/data/verification-certification';
import { getTestingSectionBySlug } from '@/data/testing';
import { getInspectionItemBySlug } from '@/data/inspection';
import { getCbmItemBySlug } from '@/data/cbm';
import { getAuditingItemBySlug } from '@/data/auditing';
import { getInnovationRDItemBySlug } from '@/data/innovation-rd';

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
      listBuffer.push(trimmed.replace(/^(\-|\*|•|–)\s+/, ''));
      return;
    }
    if (/^\d+\.[\)\.]?\s+/.test(trimmed)) {
      flushParagraph();
      listBuffer.push(trimmed.replace(/^(\-|\*|•|–)\s+/, ''));
      return;
    }

    // Headings: #, ##, ### or Title Case line followed by colon patterns
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

    // Fallback: treat as paragraph text; will be merged until blank line
    paragraphBuffer.push(trimmed);
  });

  // Flush any remaining buffers
  startNewBlock();

  return blocks;
}

// Service configuration interface
interface ServiceConfig {
  type: string;
  displayName: string;
  route: string;
  getItemBySlug: (slug: string) => any;
  getImages: (slug: string) => Promise<CloudinaryImage[]>;
}

// Service configurations
const serviceConfigs: Record<string, ServiceConfig> = {
  'verification-certification': {
    type: 'verification-certification',
    displayName: 'Verification & Certification (VC)',
    route: '/services/verification-certification',
    getItemBySlug: getVerificationCertificationItemBySlug,
    getImages: (slug: string) => imageService.getVerificationCertificationImages(slug)
  },
  'testing': {
    type: 'testing',
    displayName: 'Testing & Inspection',
    route: '/services/testing',
    getItemBySlug: getTestingSectionBySlug,
    getImages: (slug: string) => imageService.getTestingImages(slug)
  },
  'inspection': {
    type: 'inspection',
    displayName: 'Inspection (I)',
    route: '/services/inspection',
    getItemBySlug: getInspectionItemBySlug,
    getImages: (slug: string) => imageService.getInspectionImages(slug)
  },
  'cbm': {
    type: 'cbm',
    displayName: 'Condition based Monitoring (CBM)',
    route: '/services/cbm',
    getItemBySlug: getCbmItemBySlug,
    getImages: (slug: string) => imageService.getCBMImages(slug)
  },
  'auditing': {
    type: 'auditing',
    displayName: 'Auditing (A)',
    route: '/services/auditing',
    getItemBySlug: getAuditingItemBySlug,
    getImages: (slug: string) => imageService.getAuditingImages(slug)
  },
  'innovation-rd': {
    type: 'innovation-rd',
    displayName: 'Innovation & R&D',
    route: '/services/innovation-rd',
    getItemBySlug: getInnovationRDItemBySlug,
    getImages: (slug: string) => Promise.resolve([]) // No specific images for innovation-rd yet
  }
};

export default function ServiceDetail() {
  const { serviceType, slug } = useParams();
  const [dynamicPage, setDynamicPage] = useState<PageDto | null>(null);
  const [dynamicSection, setDynamicSection] = useState<SectionDto | null>(null);
  const [cloudinaryImages, setCloudinaryImages] = useState<CloudinaryImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [item, setItem] = useState<any>(null);

  // Get service configuration
  const serviceConfig = serviceType ? serviceConfigs[serviceType] : null;

  // Fetch dynamic content from backend and Cloudinary images when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!slug || !serviceConfig) return;
      
      try {
        setIsLoadingImages(true);
        
        // Get static item data as fallback
        const staticItem = serviceConfig.getItemBySlug(slug);
        setItem(staticItem);
        
        // Try to fetch dynamic page/section from backend first
        try {
          const page = await getPageWithSections(serviceConfig.type);
          setDynamicPage(page);
          
          // Find the specific section by slug or sectionId
          let targetSection = null;
          if (page.sections && page.sections.length > 0) {
            targetSection = page.sections.find(s => 
              s.sectionId === slug || 
              s.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-') === slug
            );
          }
          
          if (targetSection) {
            setDynamicSection(targetSection);
          } else if (staticItem) {
            // If no backend section found, use static item
            setDynamicSection({
              _id: staticItem.id,
              title: staticItem.title,
              bodyText: staticItem.content,
              images: staticItem.image ? [staticItem.image] : [],
              sectionId: staticItem.id,
              page: serviceConfig.type,
              language: 'en',
              pageNumber: 1,
              isActive: true,
              translations: {},
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            } as SectionDto);
          }
        } catch (backendError) {
          console.warn('Backend fetch failed, using static data:', backendError);
          // If backend fails, use static item
          if (staticItem) {
            setDynamicSection({
              _id: staticItem.id,
              title: staticItem.title,
              bodyText: staticItem.content,
              images: staticItem.image ? [staticItem.image] : [],
              sectionId: staticItem.id,
              page: serviceConfig.type,
              language: 'en',
              pageNumber: 1,
              isActive: true,
              translations: {},
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            } as SectionDto);
          }
        }
        
        // Images
        const images = await serviceConfig.getImages(slug);
        setCloudinaryImages(images);
      } catch (error) {
        console.error(`Error fetching ${serviceConfig.type} detail:`, error);
      } finally {
        setIsLoadingImages(false);
      }
    };

    fetchData();
  }, [slug, serviceConfig]);

  // Validation
  if (!serviceConfig) {
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

  if (!item && !dynamicSection) {
    return (
      <div className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">{serviceConfig.displayName} item not found.</p>
          <Button asChild>
            <Link to={serviceConfig.route}>Back to {serviceConfig.displayName}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="section pb-0">
        <div className="container-responsive">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={serviceConfig.route}>{serviceConfig.displayName}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`${serviceConfig.route}/${item?.slug || slug}`}>
                  {dynamicSection?.title || item?.title || 'Detail'}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Content with strategic image placement based on content structure */}
      {(dynamicSection?.bodyText || item?.description || cloudinaryImages.length > 0) && (
        <section className="section pt-0">
          <div className="container-responsive max-w-6xl mx-auto">
            {(() => {
              // Prioritize backend data, fallback to static data
              const content = dynamicSection?.bodyText || item?.content || item?.description || '';
              const textBlocks = parseContentToBlocks(content);
              const imageUrls: string[] = [];
              
              // Prioritize dynamicSection images, fallback to Cloudinary images only if needed
              if (dynamicSection?.images && dynamicSection.images.length > 0) {
                imageUrls.push(...dynamicSection.images);
              } else if (cloudinaryImages && cloudinaryImages.length > 0) {
                imageUrls.push(...cloudinaryImages.map((img) => img.url));
              }
              
              // Determine main title from first H1
              const mainTitle = (textBlocks.find((b) => b.type === 'h1')?.props?.children) as string | undefined;
              
              // Strategic image placement based on content structure
              const blocks: JSX.Element[] = [];
              let imageIndex = 0;
              
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
                  // First image after main title (H1)
                  if (blockIndex === 0 && block.type === 'h1' && imageIndex < imageUrls.length) {
                    blocks.push(
                      <div key={`img-${imageIndex}`} className="rounded-2xl overflow-hidden mb-6 shadow-lg md:max-w-3xl mx-auto">
                        <img
                          src={imageUrls[imageIndex]}
                          alt="Borescope inspection in action"
                          className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>
                    );
                    imageIndex++;
                  }
                  
                  // Second image after "Why Choose..." heading
                  if (block.type === 'h2' && 
                      block.props?.children?.includes('Why Choose') && 
                      imageIndex < imageUrls.length) {
                    blocks.push(
                      <div key={`img-${imageIndex}`} className="rounded-2xl overflow-hidden mb-6 shadow-lg md:max-w-2xl mx-auto">
                        <img
                          src={imageUrls[imageIndex]}
                          alt="Professional borescope inspection"
                          className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
                        />
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
                          <div className="rounded-2xl overflow-hidden shadow-lg">
                            <img
                              src={imageUrls[imageIndex]}
                              alt="Robotic inspection device"
                              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
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
              });
              
              if (blocks.length === 0 && textBlocks.length === 0 && imageUrls.length > 0) {
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img 
                          src={url} 
                          alt={(dynamicSection?.title) || item?.title || 'Service Image'} 
                          className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300" 
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

      {/* Loading State */}
      {isLoadingImages && (
        <section className="section">
          <div className="container-responsive text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading project images...</p>
          </div>
        </section>
      )}
    </div>
  );
}
