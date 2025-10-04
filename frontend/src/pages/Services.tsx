
import React from 'react';
import { HeroSection } from '@/components/Common/HeroSection';
import { VideoHero } from '@/components/Common/VideoHero';
import { ServiceCard } from '@/components/Common/ServiceCard';
import GlobalMap from '@/components/Common/GlobalMap';
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
        slides={[
          {
            title: "CBM- Condition Based Monitoring",
            description: "We provide comprehensive (CBM) services to ensure the reliability, safety, and efficiency of your critical assets. Our solutions cover rotating machinery, process equipment, pipelines, Using advanced technologies such as vibration analysis, oil analysis, thermal imaging, performance monitoring, and AI with IoT-based systems, we help identify faults at an early stage, reduce downtime, and extend asset life.",
            primaryCTA: {
              text: "Explore Services",
              href: "#services"
            },
            secondaryCTA: {
              text: "Get Quote",
              href: "/contact"
            }
          },
          {
            title: "360°",
            subtitle: "Worldwide Coverage",
            description: "Our Professional Inspectors & Experts are available 24/7 across all continents.",
            primaryCTA: {
              text: "Explore Services",
              href: "#services"
            },
            secondaryCTA: {
              text: "Get Quote",
              href: "/contact"
            }
          },
          {
            title: "TIV-Technical Industrial Verification",
            subtitle: "CBM 360° TIV™",
            description: "Services ensure that industrial assets, equipment, and processes meet international codes, standards, and client specifications. Our global team of certified inspectors provides independent verification, inspection, and certification across oil & gas, mining, power plants, marine, and infrastructure projects-delivering compliance, reliability, and safety. (Third-party inspection & verification, Vendor inspection & expediting, Welding & coating inspection, Load testing & lifting gear certification, Shutdown & turnaround and inspection, HSE audits & compliance.)",
            primaryCTA: {
              text: "Explore Services",
              href: "#services"
            },
            secondaryCTA: {
              text: "Get Quote",
              href: "/contact"
            }
          },
          {
            title: "Leading Testing, Inspection & Certification Services",
            description: "Delivering trusted NDT testing, inspection, certification, and technical advisory solutions to ensure safety, reliability, and sustainability across global industries.",
            primaryCTA: {
              text: "Explore Services",
              href: "#services"
            },
            secondaryCTA: {
              text: "Get Quote",
              href: "/contact"
            }
          },
          {
            title: "R&D Capabilities - Design, Development & Production",
            description: "We focus on advanced IoT & AI-driven Condition Monitoring Systems and next-generation AI + Robotics in NDT solutions, designed to enhance industrial safety, reliability, and efficiency.",
            primaryCTA: {
              text: "Explore Services",
              href: "#services"
            },
            secondaryCTA: {
              text: "Get Quote",
              href: "/contact"
            }
          }
        ]}
        videoUrls={[
          'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475287/slide-1_eqslb6.mp4',
          'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475275/slide-2_jl5ldp.mp4',
          'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475290/slide-3_rayaoy.mp4',
          'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475303/slide-4_izmzsr.mp4',
          'https://res.cloudinary.com/docyipoze/video/upload/q_auto,f_auto,w_1280,h_720,c_fill/v1759475289/slide-5_rff1ml.mp4',
        ]}
        autoPlaySeconds={120}

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

      {/* Global Network Map */}
      <section className="section bg-tuv-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">A Global Network</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our worldwide presence and find the office closest to you. Click on any location to view detailed contact information.
            </p>
          </div>
          
          <GlobalMap className="w-full" />
        </div>
      </section>

     
    </div>
  );
}
