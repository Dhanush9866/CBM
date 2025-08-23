import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getTestingSectionBySlug } from '@/data/testing';
import { imageService, CloudinaryImage } from '@/services/imageService';
import ImageGallery from '@/components/Common/ImageGallery';

export default function TestingDetail() {
  const { slug } = useParams();
  const section = slug ? getTestingSectionBySlug(slug) : undefined;
  const [cloudinaryImages, setCloudinaryImages] = useState<CloudinaryImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  // Fetch Cloudinary images when component mounts
  useEffect(() => {
    if (section) {
      const fetchImages = async () => {
        try {
          setIsLoadingImages(true);
          const images = await imageService.getTestingImages(section.slug);
          setCloudinaryImages(images);
        } catch (error) {
          console.error('Error fetching images:', error);
        } finally {
          setIsLoadingImages(false);
        }
      };

      fetchImages();
    }
  }, [section]);

  if (!section) {
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

      <section className="section pt-6">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden">
              <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{section.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{section.description}</p>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">What we provide</h2>
                  <ul className="space-y-2">
                    {section.details.map((d) => (
                      <li key={d} className="flex items-start">
                        <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{d}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="mt-6 flex gap-3">
                <Button className="btn-primary" asChild>
                  <Link to="/contact">Request Quote</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/services/testing">Back to all</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cloudinary Images Gallery */}
      {cloudinaryImages.length > 0 && (
        <section className="section">
          <div className="container-responsive">
            <ImageGallery 
              images={cloudinaryImages} 
              title={`${section.title} - Project Images`}
              className="mt-8"
            />
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


