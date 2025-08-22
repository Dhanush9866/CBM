export type InspectionItem = {
  slug: string;
  title: string;
  image: string;
  description: string;
  details: string[];
};

export const inspectionItems: InspectionItem[] = [
  { slug: 'third-party-inspection', title: 'Third Party Inspection', image: 'https://picsum.photos/id/1003/1200/675', description: 'Independent verification of product and project quality.', details: ['Independent witnessing', 'Document review', 'Final acceptance checks'] },
  { slug: 'asset-integrity-inspection', title: 'Asset Integrity Inspection', image: 'https://picsum.photos/id/1010/1200/675', description: 'Inspection programs to ensure integrity and extend asset life.', details: ['Corrosion surveys', 'Fitness-for-service inputs', 'Risk-based plans'] },
  { slug: 'environmental-monitoring-inspection', title: 'Environmental Monitoring Inspection', image: 'https://picsum.photos/id/1016/1200/675', description: 'Monitoring of emissions, effluents, and environmental compliance.', details: ['Air and water sampling', 'Noise and vibration', 'Compliance reporting'] },
  { slug: 'risk-based-inspection', title: 'Risk-Based Inspection', image: 'https://picsum.photos/id/1020/1200/675', description: 'Prioritized inspection using probability and consequence of failure.', details: ['RBI assessments', 'Inspection planning', 'Data-driven intervals'] },
  { slug: 'welding-inspection', title: 'Welding Inspection', image: 'https://picsum.photos/id/1027/1200/675', description: 'Welding procedure, welder qualification, and weld inspections.', details: ['WPS/PQR review', 'Welder qualification', 'Visual and NDT'] },
  { slug: 'electrical-instrumentation-inspection', title: 'Electrical & Instrumentation Inspection', image: 'https://picsum.photos/id/1037/1200/675', description: 'E&I installation checks for safety and compliance.', details: ['Loop checks', 'Ex inspections', 'Functional testing'] },
  { slug: 'painting-inspection', title: 'Painting Inspection', image: 'https://picsum.photos/id/1043/1200/675', description: 'Coating inspection for corrosion protection and longevity.', details: ['Surface prep verification', 'DFT/adhesion tests', 'Holiday detection'] },
  { slug: 'gearbox-inspection', title: 'Gearbox Inspection', image: 'https://picsum.photos/id/1056/1200/675', description: 'Condition checks of gearboxes to prevent failures.', details: ['Endoscopy', 'Backlash/gear wear', 'Lubricant assessment'] },
  { slug: 'hse-inspection', title: 'Health, Safety, and Environment Inspection HSE', image: 'https://picsum.photos/id/1066/1200/675', description: 'HSE audits and inspections to ensure safe operations.', details: ['Permit-to-work audits', 'Safety culture checks', 'Regulatory compliance'] },
  { slug: 'topside-fitness-inspection', title: 'Topside Fitness Inspection', image: 'https://picsum.photos/id/1076/1200/675', description: 'Offshore topside inspections to maintain structural integrity.', details: ['Structural checks', 'Corrosion mapping', 'NDT support'] },
  { slug: 'marine-inspection', title: 'Marine Inspection', image: 'https://picsum.photos/id/1080/1200/675', description: 'Hull, cargo, and port inspections for marine assets.', details: ['Hull surveys', 'Cargo condition', 'Port state readiness'] },
  { slug: 'pre-shipment-inspection', title: 'Pre-Shipment Inspection', image: 'https://picsum.photos/id/1084/1200/675', description: 'Verification of goods before shipment to ensure specifications.', details: ['Quantity and quality checks', 'Packing and marking', 'Documentation review'] },
  { slug: 'underground-mine-shaft-safety-inspection', title: 'Under Ground Mine Shaft Safety Inspection', image: 'https://picsum.photos/id/109/1200/675', description: 'Safety inspections for underground mine shafts and equipment.', details: ['Ground support checks', 'Ventilation and escape routes', 'Equipment safety'] },
  { slug: 'on-site-laboratory-sampling', title: 'On-Site Laboratory & Sampling', image: 'https://picsum.photos/id/110/1200/675', description: 'On-site sampling and laboratory testing for rapid decisions.', details: ['Field test kits', 'Chain-of-custody', 'Rapid turnaround'] },
];

export function getInspectionItemBySlug(slug: string): InspectionItem | undefined {
  return inspectionItems.find((i) => i.slug === slug);
}


