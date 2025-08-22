export type AuditingItem = {
  slug: string;
  title: string;
  image: string;
  description: string;
  details: string[];
};

export const auditingItems: AuditingItem[] = [
  {
    slug: 'technical-audit',
    title: 'Technical Audit',
    image: 'https://picsum.photos/id/1043/1200/675',
    description: 'Assessment of technical systems, processes, and infrastructure for efficiency and compliance.',
    details: [
      'System performance evaluation',
      'Infrastructure reliability checks',
      'Technology stack review',
    ],
  },
  {
    slug: 'operational-audit',
    title: 'Operational Audit',
    image: 'https://picsum.photos/id/1048/1200/675',
    description: 'Evaluation of an organization\'s operations to improve efficiency, effectiveness, and economy.',
    details: [
      'Process flow analysis',
      'Resource utilization assessment',
      'Performance metric review',
    ],
  },
  {
    slug: 'hse-health-safety-environment-audit',
    title: 'HSE Health, Safety, and Environment Audit',
    image: 'https://picsum.photos/id/1051/1200/675',
    description: 'Review of health, safety, and environmental management systems and practices.',
    details: [
      'Compliance with regulations',
      'Risk assessment and control',
      'Environmental impact evaluation',
    ],
  },
  {
    slug: 'fire-and-safety-audit',
    title: 'Fire and Safety Audit',
    image: 'https://picsum.photos/id/1053/1200/675',
    description: 'Assessment of fire protection systems and safety protocols to ensure workplace security.',
    details: [
      'Fire suppression system checks',
      'Emergency preparedness review',
      'Safety training compliance',
    ],
  },
  {
    slug: 'asset-integrity-management-audit',
    title: 'Asset Integrity Management Audit',
    image: 'https://picsum.photos/id/1054/1200/675',
    description: 'Evaluation of systems and processes for maintaining the integrity of physical assets.',
    details: [
      'Maintenance program review',
      'Corrosion management assessment',
      'Structural integrity checks',
    ],
  },
  {
    slug: 'production-import-export-audit',
    title: 'Production Import/Export Audit',
    image: 'https://picsum.photos/id/1055/1200/675',
    description: 'Verification of production processes and compliance with import/export regulations.',
    details: [
      'Supply chain compliance',
      'Customs documentation review',
      'Quality control in production',
    ],
  },
  {
    slug: 'financial-audit',
    title: 'Financial Audit',
    image: 'https://picsum.photos/id/1056/1200/675',
    description: 'Independent examination of an organization\'s financial records and statements.',
    details: [
      'Accuracy of financial reporting',
      'Internal control effectiveness',
      'Compliance with accounting standards',
    ],
  },
];

export function getAuditingItemBySlug(slug: string): AuditingItem | undefined {
  return auditingItems.find((item) => item.slug === slug);
}
