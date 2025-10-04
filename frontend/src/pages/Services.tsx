
import React from 'react';
import { HeroSection } from '@/components/Common/HeroSection';
import { VideoHero } from '@/components/Common/VideoHero';
import { ServiceCard } from '@/components/Common/ServiceCard';
import { services as staticServices } from '@/data/services';
import { industryStats as staticIndustryStats } from '@/data/industries';
import CountUp from '@/components/Common/CountUp';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Globe, Search, Settings, Shield, FileText, Brain } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import translationService from '@/services/translationService';

export default function Services() {
  const { translations } = useTranslation();
  
  // Clear translation cache to force fresh data
  React.useEffect(() => {
    translationService.clearCache();
  }, []);
  const hero = translations?.pages?.services?.hero;
  const servicesData = translations?.services;

  // Icon mapping for services
  const iconMap = {
    Search,
    Settings,
    Shield,
    FileText,
    Award,
    Brain
  };

  // Get services from API or fallback to static data
  const services = servicesData?.servicesList?.map(service => ({
    ...service,
    icon: iconMap[service.icon as keyof typeof iconMap] || Search
  })) || staticServices;

  // Get industry stats from API or fallback to static data
  const industryStats = translations?.industryStats || staticIndustryStats;

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
       autoPlaySeconds={120}videoUrls={[
  'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475287/slide-1_eqslb6.mp4',
  'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475275/slide-2_jl5ldp.mp4',
  'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475290/slide-3_rayaoy.mp4',
  'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475303/slide-4_izmzsr.mp4',
  'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475289/slide-5_rff1ml.mp4',
]}

      />

      {/* Trust Indicators */}
      <section className="section bg-white">
        <div className="container-responsive">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {industryStats.map((stat, index) => {
              const raw = String(stat.number).replace(/\+/g, '').replace(/,/g, '');
              const isNumeric = /^\d+$/.test(raw);
              const end = isNumeric ? parseInt(raw, 10) : 0;
              const suffix = String(stat.number).includes('+') ? '+' : '';
              return (
              <div key={index} className="text-center animate-fade-in-up">
                <CountUp
                  end={end}
                  suffix={suffix}
                  className="text-3xl lg:text-4xl font-bold text-primary mb-2"
                />
                <div className="font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section" id="services">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {servicesData?.completeServicePortfolio?.heading || "Complete Service Portfolio"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {servicesData?.completeServicePortfolio?.subheading || 
                "From product testing to regulatory compliance, we provide comprehensive solutions to help you succeed in global markets."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
}
