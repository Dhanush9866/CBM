
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

export function Footer() {
  const { translations } = useTranslation();

  return (
    <footer className="bg-tuv-gray-900 text-white">
      <div className="container-responsive">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link to="/services" className="inline-block mb-6">
                <div className="text-2xl font-bold text-white">
                  {translations?.footer.company || 'CBM'}
                </div>
              </Link>
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
                  'Automotive',
                  'Healthcare & Medical',
                  'Energy & Utilities',
                  'Manufacturing',
                  'Construction',
                  'Food & Agriculture'
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
                        <p>CBM America</p>
                        <p>10040 Mesa Rim Road</p>
                        <p>San Diego, CA 92121</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-tuv-gray-400" />
                  <span className="text-tuv-gray-400">
                    {translations?.footer.contact.phone || '+1 (555) 123-4567'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-tuv-gray-400" />
                  <span className="text-tuv-gray-400">
                    {translations?.footer.contact.email || 'contact@cbm.com'}
                  </span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-4 text-white">
                  {translations?.footer.newsletter || 'Stay Updated'}
                </h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder={translations?.footer.placeholderEmail || 'Enter your email'}
                    className="flex-1 px-4 py-2 rounded-l-md border-0 text-tuv-gray-900"
                  />
                  <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-r-md transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-tuv-gray-700 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-tuv-gray-400 text-sm">
              © 2024 CBM. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link to="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link to="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                Legal Notice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
