
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient">
        {backgroundImage && (
          <div 
            className="absolute inset-0 hero-overlay"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative container-responsive py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center text-white">
          {subtitle && (
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-sm font-medium">{subtitle}</span>
            </div>
          )}
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in-up text-balance">
            {title}
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 mb-10 animate-fade-in-up text-pretty max-w-3xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            {primaryCTA && (
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                {primaryCTA.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            {secondaryCTA && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                {secondaryCTA.text}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}
