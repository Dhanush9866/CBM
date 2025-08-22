
import { HeroSection } from '@/components/Common/HeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  FileText,
  Users,
  ArrowRight
} from 'lucide-react';

const offices = [
  {
    region: "North America",
    locations: [
      {
        city: "San Diego, CA",
        address: "10040 Mesa Rim Road, San Diego, CA 92121",
        phone: "+1 (858) 578-9000",
        email: "americas@tuvsud.com"
      },
      {
        city: "Detroit, MI", 
        address: "20245 Farmington Road, Farmington Hills, MI 48336",
        phone: "+1 (248) 442-8080",
        email: "automotive@tuvsud.com"
      },
      {
        city: "Austin, TX",
        address: "12800 Hill Country Blvd, Austin, TX 78738", 
        phone: "+1 (512) 833-9820",
        email: "technology@tuvsud.com"
      }
    ]
  },
  {
    region: "Europe",
    locations: [
      {
        city: "Munich, Germany",
        address: "Westendstrasse 199, 80686 Munich, Germany",
        phone: "+49 (0) 89 5791-0",
        email: "europe@tuvsud.com"
      },
      {
        city: "London, UK",
        address: "Octagon House, Concorde Way, Manchester M22 0RR",
        phone: "+44 (0) 161 4998000",
        email: "uk@tuvsud.com"
      }
    ]
  },
  {
    region: "Asia Pacific",
    locations: [
      {
        city: "Singapore",
        address: "1 Science Park Drive, Singapore 118221",
        phone: "+65 6778 7777",
        email: "singapore@tuvsud.com"
      },
      {
        city: "Shanghai, China",
        address: "No.151 Heng Tong Road, Shanghai 200070, China",
        phone: "+86 21 6141 3666", 
        email: "china@tuvsud.com"
      }
    ]
  }
];

export default function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Get in Touch with Our Experts"
        subtitle="Contact Us"
        description="Ready to discuss your testing, inspection, or certification needs? Our global team of experts is here to help you succeed."
        primaryCTA={{
          text: "Send Message",
          href: "#contact-form"
        }}
        secondaryCTA={{
          text: "Find Office",
          href: "#offices"
        }}
      />

      {/* Contact Methods */}
      <section className="section">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How Can We Help You?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the best way to connect with our team based on your specific needs and urgency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "General Inquiries",
                description: "Questions about our services, capabilities, or how we can help your business.",
                action: "Send Message",
                color: "bg-primary"
              },
              {
                icon: FileText,
                title: "Request Quote",
                description: "Get detailed pricing for specific testing, inspection, or certification services.",
                action: "Get Quote",
                color: "bg-accent"
              },
              {
                icon: Phone,
                title: "Urgent Support",
                description: "Need immediate assistance with an ongoing project or certification process.",
                action: "Call Now",
                color: "bg-tuv-blue-600"
              },
              {
                icon: Users,
                title: "Expert Consultation",
                description: "Schedule a consultation with our technical experts for complex requirements.",
                action: "Book Call", 
                color: "bg-tuv-gray-700"
              }
            ].map((method, index) => (
              <div key={index} className="text-center p-8 bg-tuv-gray-50 rounded-lg hover:shadow-lg transition-all group">
                <div className={`inline-flex p-4 ${method.color} rounded-full mb-6 group-hover:scale-110 transition-transform`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{method.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{method.description}</p>
                <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  {method.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section bg-tuv-gray-50" id="contact-form">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our experts will get back to you within 24 hours.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-2" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="john.doe@company.com" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input id="company" placeholder="Your Company Name" className="mt-2" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
                        <SelectItem value="energy">Energy & Utilities</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="food">Food & Agriculture</SelectItem>
                        <SelectItem value="aerospace">Aerospace & Defense</SelectItem>
                        <SelectItem value="technology">Technology & Electronics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="service">Service Needed</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="testing">Testing & Inspection</SelectItem>
                        <SelectItem value="certification">Certification Services</SelectItem>
                        <SelectItem value="consulting">Consulting & Advisory</SelectItem>
                        <SelectItem value="training">Training & Education</SelectItem>
                        <SelectItem value="digital">Digital Solutions</SelectItem>
                        <SelectItem value="other">Other Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your requirements, timeline, and any specific questions you have..."
                    className="mt-2 min-h-[120px]"
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="consent" className="mt-1" />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground">
                    I agree to CBM processing my personal data for the purpose of responding to my inquiry. 
                    I understand I can withdraw consent at any time.
                  </Label>
                </div>
                
                <Button size="lg" className="w-full btn-primary">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get Direct Support</h2>
              <p className="text-muted-foreground mb-8">
                Prefer to speak directly? Our customer support team is available 
                to help you with immediate questions and urgent requests.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Phone Support</h3>
                    <p className="text-muted-foreground mb-2">
                      Speak with our customer service team
                    </p>
                    <p className="font-medium text-primary">+1 (800) TUV-SUD1</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 8:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Email Support</h3>
                    <p className="text-muted-foreground mb-2">
                      Send detailed inquiries and documentation
                    </p>
                    <p className="font-medium text-primary">contact@tuvsud.com</p>
                    <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Emergency Support</h3>
                    <p className="text-muted-foreground mb-2">
                      24/7 support for urgent certification issues
                    </p>
                    <p className="font-medium text-primary">+1 (800) TUV-911</p>
                    <p className="text-sm text-muted-foreground">Available 24/7 for emergencies</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-tuv-blue-50 rounded-lg">
                <h3 className="font-bold mb-4">Quick Response Guarantee</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Phone inquiries answered within 3 rings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Email responses within 24 hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Quote requests processed within 48 hours</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="section" id="offices">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Global Offices</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With locations worldwide, we're always close to you. Find your nearest 
              CBM office for local support and services.
            </p>
          </div>
          
          <div className="space-y-12">
            {offices.map((region, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mb-8 text-center">{region.region}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {region.locations.map((office, officeIndex) => (
                    <div key={officeIndex} className="bg-white border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <h4 className="text-xl font-semibold mb-4">{office.city}</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground">{office.address}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                          <p className="text-muted-foreground">{office.phone}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                          <p className="text-muted-foreground">{office.email}</p>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-6">
                        Get Directions
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
