
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Youtube,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Logo } from '@/components/Common/Logo';
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

export function Footer() {
  const { translations } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tuv-gray-900 text-white">
      <div className="container-responsive">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Logo size="lg" showTagline={true} className="text-white" />
              </div>
              <p className="text-tuv-gray-400 mb-6 leading-relaxed">
                {translations?.footer.description || 'Leading provider of testing, inspection, certification, and advisory services. Committed to safety, security, and sustainability worldwide.'}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {translations?.footer.services.title || 'Services'}
              </h3>
              <ul className="space-y-4">
                {(translations?.footer.services.list || [
                  'Testing & Certification',
                  'Inspection Services',
                  'Audit & Assessment',
                  'Training & Education',
                  'Digital Solutions',
                  'Consulting Services'
                ]).map((service, index) => (
                  <li key={index}>
                    <Link 
                      to="/services" 
                      className="text-tuv-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {translations?.footer.industries.title || 'Industries'}
              </h3>
              <ul className="space-y-4">
                {(translations?.footer.industries.list || [
            "Mining & Mental ",
            "Oil and Gas",
            "Marine",
            "Energy & Utilities",
            "Healthcare & Medical",
            "Automotive",
            "Construction",
            "Manufacturing",
            "Aerospace",
            "Food & Agriculture",
          ]).map((industry, index) => (
                  <li key={index}>
                    <Link 
                      to="/industries" 
                      className="text-tuv-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                      {industry}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {translations?.footer.contact.title || 'Contact'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-tuv-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-tuv-gray-400">
                    {translations?.footer.contact.address ? (
                      translations.footer.contact.address.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                      ))
                    ) : (
                      <>
                        <p>CBM 360 TIV – UK</p>
                        <p>79 Denyer St, London SW3 2NY, UK</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-tuv-gray-400" />
                  <span className="text-tuv-gray-400">
                    {translations?.footer.contact.phone || '+44 7934 980214'}
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-tuv-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-tuv-gray-400">
                    {translations?.footer.contact.email ? (
                      translations.footer.contact.email.split('\n').map((email, index) => (
                        <div key={index}>{email}</div>
                      ))
                    ) : (
                      <>
                        <div>Support@cbm360tiv.com</div>
                        <div>info@cbm360tiv.com</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-tuv-gray-700 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-tuv-gray-400 text-sm">
              © {currentYear} CBM. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-tuv-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogDescription>
                      How we collect, use, and protect your information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto space-y-4 text-sm text-tuv-gray-300">
                    <p>
                      We collect personal information you provide directly to us, such as when you contact us, subscribe to updates, or use our services. This may include your name, email address, phone number, company, and any message content you submit.
                    </p>
                    <p>
                      We use this information to provide and improve our services, respond to inquiries, send relevant communications, and maintain security. We do not sell your personal data. We may share data with service providers who assist us in operations, subject to confidentiality and security obligations.
                    </p>
                    <p>
                      You may request access, correction, or deletion of your personal data. For any privacy requests, contact us at Support@cbm360tiv.com.
                    </p>
                    <p className="text-tuv-gray-400">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-tuv-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Terms of Service</DialogTitle>
                    <DialogDescription>
                      The rules for using our website and services.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-y-auto space-y-4 text-sm text-tuv-gray-300">
                    <p>
                      By accessing or using our website, you agree to comply with these Terms. You may use the site only for lawful purposes and in accordance with applicable laws. All content is provided as-is for informational purposes without warranties.
                    </p>
                    <p>
                      Intellectual property rights to site content belong to CBM or its licensors. You may not reproduce, distribute, or create derivative works without prior written permission.
                    </p>
                    <p>
                      We may update these Terms from time to time. Continued use of the site after changes constitutes acceptance of the updated Terms. For questions, contact info@cbm360tiv.com.
                    </p>
                    <p className="text-tuv-gray-400">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <span className="hidden lg:inline text-tuv-gray-600">|</span>
              <a
                href="https://www.buildyourvision.in/"
                className="text-tuv-gray-300 hover:text-white transition-colors font-medium tracking-wide whitespace-nowrap"
                aria-label="Developed by BUILD YOUR VISION"
              >
                Developed by BUILD YOUR VISION
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
