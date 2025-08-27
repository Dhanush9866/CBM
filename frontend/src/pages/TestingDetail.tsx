import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTestingSectionBySlug } from '@/data/testing';
import { getPageWithSections, PageDto, SectionDto } from '@/utils/api';
import { imageService, CloudinaryImage } from '@/services/imageService';
import ImageGallery from '@/components/Common/ImageGallery';

export default function TestingDetail() {
  const { slug } = useParams();
  const section = slug ? getTestingSectionBySlug(slug) : undefined;
  const [dynamicPage, setDynamicPage] = useState<PageDto | null>(null);
  const [dynamicSection, setDynamicSection] = useState<SectionDto | null>(null);
  const [cloudinaryImages, setCloudinaryImages] = useState<CloudinaryImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  // Fetch dynamic content from backend and Cloudinary images when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        setIsLoadingImages(true);
        // Dynamic page/section
        const page = await getPageWithSections('testing', slug);
        setDynamicPage(page);
        const firstSection = (page.sections && page.sections[0]) || null;
        setDynamicSection(firstSection);
        // Images
        const images = await imageService.getTestingImages(slug);
        setCloudinaryImages(images);
      } catch (error) {
        console.error('Error fetching testing detail:', error);
        
      } finally {
        setIsLoadingImages(false);
      }
    };

    fetchData();
  }, [slug]);

  if (!section && !dynamicSection) {
    return (
      <div className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">Section not found.</p>
          <Button asChild>
            <Link to="/services/testing">Back to Testing & Inspection</Link>
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
                <BreadcrumbLink href="/services/testing">Testing & Inspection</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/services/testing/${section.slug}`}>{section.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Blog-style interleaved content */}
      {(dynamicSection?.bodyText || section.description || cloudinaryImages.length > 0) && (
        <section className="section pt-0">
          <div className="container-responsive max-w-4xl mx-auto">
            {(() => {
              const paragraphs = (dynamicSection?.bodyText || section.description || '')
                .split(/\n{2,}/)
                .map((p) => p.trim())
                .filter(Boolean);
              const imageUrls: string[] = [];
              
              // Prioritize dynamicSection images, fallback to Cloudinary images only if needed
              if (dynamicSection?.images && dynamicSection.images.length > 0) {
                imageUrls.push(...dynamicSection.images);
              } else if (cloudinaryImages && cloudinaryImages.length > 0) {
                imageUrls.push(...cloudinaryImages.map((img) => img.url));
              }
              
              const maxLen = Math.max(paragraphs.length, imageUrls.length);
              const blocks = [] as JSX.Element[];
              for (let i = 0; i < maxLen; i++) {
                if (i < paragraphs.length) {
                  blocks.push(
                    <div key={`p-${i}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
                      <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{paragraphs[i]}</p>
                    </div>
                  );
                }
                if (i < imageUrls.length) {
                  blocks.push(
                    <div key={`img-${i}`} className="rounded-2xl overflow-hidden mb-6 shadow-lg">
                      <img
                        src={imageUrls[i]}
                        alt={(dynamicSection?.title) || section.title}
                        className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  );
                }
              }
              if (blocks.length === 0 && paragraphs.length === 0 && imageUrls.length > 0) {
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {imageUrls.map((u, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img 
                          src={u} 
                          alt={(dynamicSection?.title) || section.title} 
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

      
    </div>
  );
}


