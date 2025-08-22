
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface IndustryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  imageUrl?: string;
}

export function IndustryCard({ title, description, icon: Icon, link, imageUrl }: IndustryCardProps) {
  return (
    <Link to={link} className="block">
      <div className="card-industry group">
        {imageUrl ? (
          <div className="w-full h-48 bg-tuv-gray-100 rounded-lg mb-6 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
              <Icon className="h-12 w-12 text-primary" />
            </div>
          </div>
        )}
        
        <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
