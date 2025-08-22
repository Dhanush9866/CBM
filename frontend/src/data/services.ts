
import { 
  Shield, 
  Search, 
  Award, 
  Users, 
  BookOpen, 
  Lightbulb,
  Settings,
  Globe,
  Zap
} from 'lucide-react';

export const services = [
  {
    id: 1,
    title: "Testing & Inspection",
    description: "Comprehensive testing and inspection services to ensure your products meet the highest safety and quality standards worldwide.",
    icon: Search,
    link: "/services/testing",
    imageUrl: "/testing-inspection-bg.jpg",
    features: [
      "Product safety testing",
      "Quality assurance inspections", 
      "Regulatory compliance verification",
      "International standards certification"
    ]
  },
  {
    id: 2,
    title: "Certification Services",
    description: "Internationally recognized certification services that help you demonstrate compliance and build trust with customers globally.",
    icon: Award,
    link: "/services/certification",
    features: [
      "ISO certifications",
      "CE marking support",
      "Management system certification",
      "Product certification"
    ]
  },
  {
    id: 3,
    title: "Risk Management",
    description: "Identify, assess, and mitigate risks across your operations with our comprehensive risk management solutions.",
    icon: Shield,
    link: "/services/risk-management",
    features: [
      "Risk assessment & analysis",
      "Safety management systems",
      "Compliance monitoring",
      "Business continuity planning"
    ]
  },
  {
    id: 4,
    title: "Training & Education",
    description: "Professional development programs and training solutions to enhance your team's capabilities and knowledge.",
    icon: BookOpen,
    link: "/services/training",
    features: [
      "Technical training programs",
      "Regulatory compliance training",
      "Safety & quality workshops",
      "Custom corporate training"
    ]
  },
  {
    id: 5,
    title: "Digital Solutions",
    description: "Innovative digital tools and platforms to streamline your quality, safety, and compliance processes.",
    icon: Zap,
    link: "/services/digital",
    features: [
      "Digital compliance platforms",
      "Quality management systems",
      "Data analytics & reporting",
      "Process automation tools"
    ]
  },
  {
    id: 6,
    title: "Consulting Services",
    description: "Expert advisory services to help you navigate complex regulatory landscapes and optimize your operations.",
    icon: Lightbulb,
    link: "/services/consulting",
    features: [
      "Regulatory strategy consulting",
      "Process optimization",
      "Market access support",
      "Technical advisory services"
    ]
  }
];

export const featuredServices = [
  {
    id: 1,
    title: "Automotive Testing",
    description: "Comprehensive automotive testing services including crash testing, emissions testing, and vehicle safety certification.",
    icon: Settings,
    link: "/services/automotive",
    category: "Automotive"
  },
  {
    id: 2,
    title: "Medical Device Certification",
    description: "FDA, CE, and international medical device certification services to bring your products to market safely.",
    icon: Shield,
    link: "/services/medical",
    category: "Healthcare"
  },
  {
    id: 3,
    title: "Global Market Access",
    description: "Navigate international regulations and standards to expand your business globally with confidence.",
    icon: Globe,
    link: "/services/market-access",
    category: "International"
  }
];
