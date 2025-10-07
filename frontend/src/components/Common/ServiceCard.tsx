
import { Link } from 'react-router-dom';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  features?: string[];
  imageUrl?: string;
}

export function ServiceCard({ title, description, icon: Icon, link, features, imageUrl }: ServiceCardProps) {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const { translations } = useTranslation();

  // Helper function to get translation with fallback
  const t = (key: string) => {
    if (!translations) return key;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <Link to={link} className={`card-service block${imageUrl ? ' relative overflow-hidden' : ''}`}>

      <div className={`flex items-start space-x-4 mb-4${imageUrl ? ' relative z-10' : ''}`}>
        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-semibold mb-2 transition-colors${imageLoaded ? '' : ' group-hover:text-primary'}`}>
            {title}
          </h3>
        </div>
      </div>
      
      <p className={`mb-4 leading-relaxed${imageLoaded ? ' relative z-10 text-white/90' : ' text-muted-foreground'}`}>
        {description}
      </p>

      {features && features.length > 0 && (
        <ul className={`space-y-2 mb-6${imageLoaded ? ' relative z-10' : ''}`}>
          {features.map((feature, index) => (
            <li
              key={index}
              className={`flex items-center text-sm ${imageLoaded ? 'text-white/90' : 'text-muted-foreground'}`}
            >
              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <span 
        className={`inline-flex items-center font-medium group${imageLoaded ? ' relative z-10 text-white hover:text-white/90' : ' text-primary hover:text-primary-hover'}`}
      >
        {t('services.learnMore')}
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}
