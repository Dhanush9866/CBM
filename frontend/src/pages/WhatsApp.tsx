
import { HeroSection } from '@/components/Common/HeroSection';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function WhatsApp() {
  const { translations } = useTranslation();
  
  // Phone number from navbar - same as in Navbar.tsx
  const phoneNumber = '+44 7934 980214';
  // Remove spaces and + for WhatsApp URL
  const whatsappNumber = phoneNumber.replace(/\s+/g, '').replace('+', '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <HeroSection
        title="WhatsApp Assistance"
        description="Get instant support and assistance via WhatsApp. Our team is ready to help you with your inquiries."
        backgroundImage=""
      />

      <div className="container-responsive py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <WhatsAppIcon className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {translations?.pages?.whatsapp?.title || 'Chat with Us on WhatsApp'}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {translations?.pages?.whatsapp?.description || 
                  'Connect with our team instantly via WhatsApp for quick answers to your questions, technical support, or to discuss your project requirements.'}
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Contact Number</span>
              </div>
              <p className="text-center text-2xl font-bold text-primary mb-6">
                {phoneNumber}
              </p>
            </div>

            {/* WhatsApp Button */}
            <div className="text-center">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold flex items-center space-x-3 mx-auto"
              >
                <WhatsAppIcon className="h-6 w-6" />
                <span>
                  {translations?.pages?.whatsapp?.buttonText || 'Chat with us via WhatsApp'}
                </span>
                <MessageCircle className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                {translations?.pages?.whatsapp?.availabilityTitle || 'Availability'}
              </h3>
              <p className="text-muted-foreground">
                {translations?.pages?.whatsapp?.availabilityText || 
                  'Our team typically responds within business hours. For urgent matters, please call us directly.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                {translations?.pages?.whatsapp?.supportTitle || 'What We Can Help With'}
              </h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• {translations?.pages?.whatsapp?.support1 || 'Product inquiries and information'}</li>
                <li>• {translations?.pages?.whatsapp?.support2 || 'Technical support and assistance'}</li>
                <li>• {translations?.pages?.whatsapp?.support3 || 'Project consultations'}</li>
                <li>• {translations?.pages?.whatsapp?.support4 || 'General questions about our services'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


