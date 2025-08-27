
import { HeroSection } from '@/components/Common/HeroSection';
import { VideoHero } from '@/components/Common/VideoHero';
import { ServiceCard } from '@/components/Common/ServiceCard';
import { services } from '@/data/services';
import { industryStats } from '@/data/industries';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Globe } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

export default function Services() {
  const { translations } = useTranslation();
  const hero = translations?.pages?.services?.hero;

  return (
    <div>
      {/* Video Hero Section */}
      <VideoHero
        title={hero?.title || "Leading Testing, Inspection & Certification Services"}
        subtitle={hero?.subtitle || "Trusted Worldwide"}
        description={hero?.description || "Ensuring safety, security, and sustainability across industries with comprehensive testing, inspection, certification, and advisory services."}
        primaryCTA={{
          text: hero?.primaryCTAText || "Explore Services",
          href: "#services"
        }}
        secondaryCTA={{
          text: hero?.secondaryCTAText || "Get Quote",
          href: "/contact"
        }}
        autoPlaySeconds={7}
        videoUrls={[
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        ]}
      />

      {/* Trust Indicators */}
      <section className="section bg-white">
        <div className="container-responsive">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {industryStats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section" id="services">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Complete Service Portfolio</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From product testing to regulatory compliance, we provide comprehensive 
              solutions to help you succeed in global markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-tuv-gray-50">
        <div className="container-responsive text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Need Custom Solutions?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Every business is unique. Let our experts develop tailored testing, 
            inspection, and certification solutions for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary" asChild>
              <Link to="/contact">
                Contact Our Experts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/industries">
                Explore Industries
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
