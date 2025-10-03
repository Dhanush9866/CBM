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
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657806/cbm/verification-certification/production-import-export-verification-certification/cover-photo.jpg',
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
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657807/cbm/verification-certification/asset-integrity-fitness-verification-certification/cover-photo.jpg',
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
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657809/cbm/verification-certification/environmental-damage-verification-certification/cover-photo.jpg',
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
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657810/cbm/verification-certification/pressure-vessels-boilers-verification-certification/cover-photo.jpg',
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
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657812/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/cover-photo.jpg',
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
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657813/cbm/verification-certification/lifting-gear-load-verification-certification/cover-photo.jpg',
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
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657814/cbm/verification-certification/pipeline-integrity-verification-certification/cover-photo.jpg',
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
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657816/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/cover-photo.jpg',
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
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657817/cbm/verification-certification/storage-tank-facilities-verification-certification/cover-photo.jpg',
    description: 'Safety and integrity verification of storage tank facilities and systems.',
    details: [
      'Tank integrity assessment',
      'Safety system verification',
      'Operational certification',
    ],
  },
  {
    slug: 'fitness-verification-certification-for-heavy-mining-equipment',
    title: 'Fitness Verification & Certification for Heavy Mining Equipment',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756719170/image51_wqv9pk.jpg',
    description: 'Safety and integrity verification of storage tank facilities and systems.',
    details: [
      'Tank integrity assessment',
      'Safety system verification',
      'Operational certification',
    ],
  },
  {
    slug: 'pharmaceutical-plant-refinery-fitness-verification-certification',
    title: 'Pharmaceutical Plant & Refinery Fitness Verification & Certification',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1759462611/cbm/verification-certification/pharmaceutical-plant-refinery-fitness-verification-certification/cbm/verification-certification/pharmaceutical-plant-refinery-fitness-verification-certification/cover-photo.jpg',
    description: 'Comprehensive fitness verification and certification services for pharmaceutical plants and refinery facilities.',
    details: [
      'Facility fitness verification',
      'Regulatory compliance certification',
      'Process safety management certification',
    ],
  },

];

export function getVerificationCertificationItemBySlug(slug: string): VerificationCertificationItem | undefined {
  return verificationCertificationItems.find((item) => item.slug === slug);
}
