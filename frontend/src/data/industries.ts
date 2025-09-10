
import { 
  Car, 
  Heart, 
  Zap, 
  Factory, 
  Home, 
  Wheat,
  Plane,
  Smartphone,
  HardHat,
  Beaker
} from 'lucide-react';

export const industries = [
  {
    id: 1,
    title: "Automotive",
    description: "Comprehensive testing and certification services for automotive manufacturers, covering safety, performance, and regulatory compliance.",
    icon: Car,
    link: "/industries/automotive",
    services: ["Crash Testing", "Emissions Testing", "Vehicle Safety", "Component Testing"]
  },
  {
    id: 2,
    title: "Healthcare & Medical Devices",
    description: "Specialized services for medical device manufacturers, pharmaceutical companies, and healthcare providers worldwide.",
    icon: Heart,
    link: "/industries/healthcare",
    services: ["Medical Device Testing", "Pharmaceutical Analysis", "Clinical Trials", "Regulatory Affairs"]
  },
  {
    id: 3,
    title: "Energy & Utilities",
    description: "Supporting the energy sector with testing, inspection, and certification services for renewable and traditional energy systems.",
    icon: Zap,
    link: "/industries/energy",
    services: ["Solar Panel Testing", "Wind Turbine Inspection", "Grid Compliance", "Safety Assessments"]
  },
  {
    id: 4,
    title: "Manufacturing",
    description: "Quality assurance and compliance services for manufacturing operations across various industrial sectors.",
    icon: Factory,
    link: "/industries/manufacturing",
    services: ["Process Audits", "Quality Systems", "Supply Chain", "Production Testing"]
  },
  {
    id: 5,
    title: "Construction & Infrastructure",
    description: "Building safety, material testing, and infrastructure inspection services for construction projects of all scales.",
    icon: Home,
    link: "/industries/construction",
    services: ["Material Testing", "Structural Analysis", "Building Inspection", "Safety Compliance"]
  },
  {
    id: 6,
    title: "Food & Agriculture",
    description: "Food safety testing, agricultural product certification, and supply chain verification services.",
    icon: Wheat,
    link: "/industries/food",
    services: ["Food Safety Testing", "Organic Certification", "Supply Chain Audit", "Quality Control"]
  },
  {
    id: 7,
    title: "Aerospace & Defense",
    description: "Specialized testing and certification for aerospace components, defense systems, and aviation safety.",
    icon: Plane,
    link: "/industries/aerospace",
    services: ["Component Testing", "Safety Certification", "Quality Assurance", "Regulatory Compliance"]
  },
  {
    id: 8,
    title: "Technology & Electronics",
    description: "Testing and certification services for consumer electronics, telecommunications, and emerging technologies.",
    icon: Smartphone,
    link: "/industries/technology",
    services: ["EMC Testing", "Product Safety", "Wireless Certification", "Cybersecurity"]
  }
];

export const industryStats = [
  {
    number: "72+",
    label: "Countries Served",
    description: "Global presence with local expertise"
  },
  {
    number: "7,000+",
    label: "Experts Worldwide",
    description: "Highly qualified professionals"
  },
  {
    number: "25+",
    label: "Testing Laboratories",
    description: "State-of-the-art facilities"
  },
  {
    number: "33",
    label: "Years of Excellence",
    description: "Trusted since 1866"
  }
];
