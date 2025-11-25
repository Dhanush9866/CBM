import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

interface SlideContent {
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
}

interface VideoHeroProps {
  slides: SlideContent[];
  videoUrls: string[];
}

export function VideoHero({ slides, videoUrls }: VideoHeroProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const handlersRef = React.useRef<Array<(() => void) | null>>([]);

  // Auto-advance only after the active video finishes playing
  React.useEffect(() => {
    if (!api || videoUrls.length <= 1) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleVideoEnd = (videoIndex: number) => {
      if (!api) return;
      const isActiveSlide = api.selectedScrollSnap() === videoIndex;
      if (!isActiveSlide) return;
      api.scrollNext();
    };

    // Cleanup previous handlers
    videoRefs.current.forEach((video, index) => {
      if (video && handlersRef.current[index]) {
        video.removeEventListener('ended', handlersRef.current[index]!);
      }
    });

    // Clear handlers array
    handlersRef.current = [];

    // Attach event listeners to all videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const handler = () => handleVideoEnd(index);
        handlersRef.current[index] = handler;
        video.addEventListener('ended', handler);
      } else {
        handlersRef.current[index] = null;
      }
    });

    return () => {
      // Cleanup event listeners
      videoRefs.current.forEach((video, index) => {
        if (video && handlersRef.current[index]) {
          video.removeEventListener('ended', handlersRef.current[index]!);
        }
      });
    };
  }, [api, videoUrls]);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const newSlide = api.selectedScrollSnap();
      setCurrentSlide(newSlide);

      // Pause all videos first
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });
      
      // Reset and play the current video
      const currentVideo = videoRefs.current[newSlide];
      if (currentVideo) {
        currentVideo.currentTime = 0;
        currentVideo.play().catch(() => {
          // Ignore play errors (e.g., if user hasn't interacted)
        });
      }
    };

    api.on('select', onSelect);
    onSelect(); // Set initial slide

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);
  return (
    <section className="relative overflow-hidden h-[62vh] sm:h-[78vh] lg:h-[110vh] pb-[env(safe-area-inset-bottom)]">
      {/* Video Carousel Background */}
      <div className="absolute inset-0">
        <Carousel 
          className="h-full" 
          opts={{ 
            loop: true,
            dragFree: true,
            containScroll: 'trimSnaps'
          }} 
          setApi={setApi}
        >
          <CarouselContent className="h-full">
            {videoUrls.map((url, idx) => (
              <CarouselItem key={idx} className="h-full p-0">
                <div className="relative h-full w-full">
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    className="h-full w-full object-cover"
                    src={url}
                    playsInline
                    autoPlay={idx === 0}
                    muted
                    controls={false}
                    preload="metadata"
                  />
                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/25 md:from-black/60 md:via-black/30 md:to-black/20" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-10 h-8 w-8" />
          </div>
          <div className="hidden md:block">
            <CarouselNext className="right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-10 h-8 w-8" />
          </div>
        </Carousel>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-responsive px-3 sm:px-4 pt-8 pb-14 sm:pt-12 sm:pb-20">
        <div className="max-w-3xl sm:max-w-4xl mx-auto text-center text-white">
          {slides[currentSlide]?.subtitle && (
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-5 py-1.5 mb-4 sm:px-6 sm:py-2 sm:mb-6">
              <span className="text-xs sm:text-sm font-medium">{slides[currentSlide].subtitle}</span>
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-6 text-balance">
            {slides[currentSlide]?.title || ''}
          </h1>

          <p className="text-sm sm:text-base lg:text-xl text-white/90 mb-5 sm:mb-10 text-pretty max-w-3xl mx-auto">
            {slides[currentSlide]?.description || ''}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {slides[currentSlide]?.primaryCTA && (
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4" asChild>
                <a href={(slides[currentSlide].primaryCTA!.href || '').startsWith('/contact') ? '/contact#contact-form' : slides[currentSlide].primaryCTA!.href}>
                  {slides[currentSlide].primaryCTA!.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            )}
            {slides[currentSlide]?.secondaryCTA && (
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white  text-primary text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4" asChild
              >
                <a href={(slides[currentSlide].secondaryCTA!.href || '').startsWith('/contact') ? '/contact#contact-form' : slides[currentSlide].secondaryCTA!.href}>
                  {slides[currentSlide].secondaryCTA!.text}
                </a>
              </Button>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Slide Indicators for Mobile */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 z-10 md:hidden">
        {videoUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Bottom Wave for continuity with existing design */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}


