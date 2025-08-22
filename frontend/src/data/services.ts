
import { 
  Shield, 
  Search, 
  Award, 
  Users, 
  BookOpen, 
  Lightbulb,
  Settings,
  Globe,
  Zap,
  FileText
} from 'lucide-react';

export const services = [
  {
    id: 1,
    title: "Testing (T)",
    description: "Comprehensive testing services to validate safety, performance, and compliance.",
    icon: Search,
    link: "/services/testing",
    imageUrl: "/testing-inspection-bg.jpg",
    features: [
      "Non-destructive testing",
      "Performance & reliability",
      "Standards compliance",
    ]
  },
  {
    id: 2,
    title: "Condition based Monitoring (CBM)",
    description: "Predictive maintenance using analytics, sensors, and diagnostics to reduce downtime.",
    icon: Settings,
    link: "/services/cbm",
    features: [
      "Vibration & acoustic analysis",
      "Thermography & oil analysis",
      "Asset health dashboards",
    ]
  },
  {
    id: 3,
    title: "Inspection (I)",
    description: "Independent inspection services ensuring quality and regulatory adherence.",
    icon: Shield,
    link: "/services/inspection",
    features: [
      "Third-party inspection",
      "Vendor surveillance",
      "Site & factory audits",
    ]
  },
  {
    id: 4,
    title: "Auditing (A)",
    description: "Process, supplier, and system audits to identify risks and drive improvement.",
    icon: FileText,
    link: "/services/auditing",
    features: [
      "Supplier audits",
      "Process capability reviews",
      "Compliance gap analysis",
    ]
  },
  {
    id: 5,
    title: "Verification & Certification (VC)",
    description: "Verification and certification services to demonstrate trust and compliance.",
    icon: Award,
    link: "/services/verification-certification",
    features: [
      "Management systems",
      "Product certification",
      "Regulatory approvals",
    ]
  },
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
