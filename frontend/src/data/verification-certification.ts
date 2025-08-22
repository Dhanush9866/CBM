export type VerificationCertificationItem = {
  slug: string;
  title: string;
  image: string;
  description: string;
  details: string[];
};

export const verificationCertificationItems: VerificationCertificationItem[] = [
  {
    slug: 'production-import-export-verification-certification',
    title: 'Production Import / Export Verification & Certification',
    image: 'https://picsum.photos/id/1060/1200/675',
    description: 'Verification and certification of production processes and import/export compliance.',
    details: [
      'Production process verification',
      'Import/export documentation review',
      'Quality control certification',
    ],
  },
  {
    slug: 'asset-integrity-fitness-verification-certification',
    title: 'Asset Integrity & Fitness Verification & Certification',
    image: 'https://picsum.photos/id/1061/1200/675',
    description: 'Comprehensive assessment of asset integrity and fitness for continued operation.',
    details: [
      'Structural integrity evaluation',
      'Fitness-for-service assessment',
      'Operational safety certification',
    ],
  },
  {
    slug: 'environmental-damage-verification-certification',
    title: 'Environmental Damage Verification & Certification',
    image: 'https://picsum.photos/id/1062/1200/675',
    description: 'Assessment and certification of environmental impact and damage mitigation.',
    details: [
      'Environmental impact assessment',
      'Damage quantification and reporting',
      'Mitigation strategy certification',
    ],
  },
  {
    slug: 'pressure-vessels-boilers-verification-certification',
    title: 'Pressure Vessels and Boilers Verification & Certification',
    image: 'https://picsum.photos/id/1063/1200/675',
    description: 'Safety verification and certification of pressure vessels and boiler systems.',
    details: [
      'Pressure vessel integrity checks',
      'Boiler safety certification',
      'Regulatory compliance verification',
    ],
  },
  {
    slug: 'turbines-generators-engines-compressors-verification-certification',
    title: 'Turbines, Generators, Engines & Compressors Verification & Certification',
    image: 'https://picsum.photos/id/1064/1200/675',
    description: 'Performance and safety verification of rotating equipment and power generation systems.',
    details: [
      'Performance testing and certification',
      'Safety system verification',
      'Operational efficiency assessment',
    ],
  },
  {
    slug: 'lifting-gear-load-verification-certification',
    title: 'Lifting Gear and Load Verification & Certification',
    image: 'https://picsum.photos/id/1065/1200/675',
    description: 'Safety verification and certification of lifting equipment and load handling systems.',
    details: [
      'Lifting equipment safety checks',
      'Load capacity verification',
      'Operational certification',
    ],
  },
  {
    slug: 'pipeline-integrity-verification-certification',
    title: 'Pipeline Integrity Verification & Certification',
    image: 'https://picsum.photos/id/1066/1200/675',
    description: 'Comprehensive pipeline integrity assessment and certification services.',
    details: [
      'Pipeline integrity evaluation',
      'Corrosion assessment',
      'Safety certification',
    ],
  },
  {
    slug: 'industrial-structural-health-monitoring-fitness-verification-certification',
    title: 'Industrial Structural Health Monitoring and Fitness Verification & Certification',
    image: 'https://picsum.photos/id/1067/1200/675',
    description: 'Continuous monitoring and fitness verification of industrial structures.',
    details: [
      'Structural health monitoring',
      'Real-time data analysis',
      'Fitness assessment certification',
    ],
  },
  {
    slug: 'storage-tank-facilities-verification-certification',
    title: 'Storage Tank Facilities Verification & Certification',
    image: 'https://picsum.photos/id/1068/1200/675',
    description: 'Safety and integrity verification of storage tank facilities and systems.',
    details: [
      'Tank integrity assessment',
      'Safety system verification',
      'Operational certification',
    ],
  },
];

export function getVerificationCertificationItemBySlug(slug: string): VerificationCertificationItem | undefined {
  return verificationCertificationItems.find((item) => item.slug === slug);
}
