import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageWithSections, SectionDto } from '@/utils/api';
import { cbmItems } from '@/data/cbm';

export default function CBMMonitoring() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<SectionDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Create cover photo mapping from frontend data
  const coverPhotoMap: Record<string, string> = {};
  cbmItems.forEach(section => {
    if (section.image && section.image.includes('res.cloudinary.com')) {
      coverPhotoMap[section.slug] = section.image;
    }
  });

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const page = await getPageWithSections('cbm');
        if (isMounted) setSections(page.sections || []);
      } catch (e) {
        if (isMounted) setError('Failed to load CBM sections');
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
                <BreadcrumbLink href="/services/cbm">Condition based Monitoring (CBM)</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-6 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">Condition based Monitoring (CBM)</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Enhance reliability with predictive insights from sensors, analytics, and expert diagnostics.
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
            {!loading && !error && sections.map((item) => (
              <Card
                key={item._id}
                className="overflow-hidden group hover:shadow-tuv-md transition-all cursor-pointer"
                onClick={() => navigate(`/services/cbm/${item.sectionId || toSlug(item.title)}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/services/cbm/${item.sectionId || toSlug(item.title)}`);
                  }
                }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img src={coverPhotoMap[item.sectionId] || (item.images && item.images[0]) || '/placeholder.svg'} alt={item.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.bodyText?.slice(0, 140) || ''}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/services/cbm/${item.sectionId || toSlug(item.title)}`}>View Details</Link>
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


