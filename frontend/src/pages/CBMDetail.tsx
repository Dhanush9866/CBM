import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCbmItemBySlug } from '@/data/cbm';

export default function CBMDetail() {
  const { slug } = useParams();
  const item = slug ? getCbmItemBySlug(slug) : undefined;

  if (!item) {
    return (
      <div className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">CBM item not found.</p>
          <Button asChild>
            <Link to="/services/cbm">Back to CBM</Link>
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
                <BreadcrumbLink href="/services/cbm">Condition based Monitoring (CBM)</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/services/cbm/${item.slug}`}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="section pt-6">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{item.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{item.description}</p>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">What we provide</h2>
                  <ul className="space-y-2">
                    {item.details.map((d) => (
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
                  <Link to="/services/cbm">Back to all</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


