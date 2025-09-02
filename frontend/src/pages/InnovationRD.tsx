import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageWithSections, SectionDto } from '@/utils/api';
import { innovationRDSections } from '@/data/innovation-rd';

export default function InnovationRD() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<SectionDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Create cover photo mapping from frontend data
  const coverPhotoMap: Record<string, string> = {};
  innovationRDSections.forEach(section => {
    if (section.image && section.image.includes('res.cloudinary.com')) {
      coverPhotoMap[section.slug] = section.image;
    }
  });

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const page = await getPageWithSections('innovation-rd');
        if (isMounted) setSections(page.sections || []);
      } catch (e) {
        if (isMounted) setError('Failed to load innovation & R&D sections');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

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
                <BreadcrumbLink href="/services/innovation-rd">Innovation & R&D</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-6 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Innovation & Research and Development (R&D)</h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-none leading-relaxed md:leading-8 whitespace-pre-line text-justify">
            We are pioneers in Condition-Based Monitoring (CBM), Technical Industrial Verification (TIV), and advanced R&D services, delivering next-generation solutions powered by IoT, AI, Robotics, and Industry 4.0 technologies. Our mission is to enhance safety, reliability, and sustainability across industries through intelligent monitoring, inspection, and verification systems. 
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-6">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && (
              <div className="col-span-full text-center text-muted-foreground">Loading...</div>
            )}
            {error && !loading && (
              <div className="col-span-full text-center text-destructive">{error}</div>
            )}
            {!loading && !error && sections.map((s) => (
              <Card
                key={s._id}
                className="overflow-hidden group hover:shadow-tuv-md transition-all cursor-pointer"
                onClick={() => navigate(`/services/innovation-rd/${s.sectionId || toSlug(s.title)}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/services/innovation-rd/${s.sectionId || toSlug(s.title)}`);
                  }
                }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img src={coverPhotoMap[s.sectionId] || (s.images && s.images[0]) || '/placeholder.svg'} alt={s.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.bodyText?.slice(0, 140) || ''}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/services/innovation-rd/${s.sectionId || toSlug(s.title)}`}>View Details</Link>
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

