export type InspectionItem = {
  slug: string;
  title: string;
  image: string;
  description: string;
  details: string[];
};

export const inspectionItems: InspectionItem[] = [
  { slug: 'third-party-inspection', title: 'Third Party Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657764/cbm/inspection/third-party-inspection/cover-photo.jpg', description: 'Independent verification of product and project quality.', details: ['Independent witnessing', 'Document review', 'Final acceptance checks'] },
  { slug: 'asset-integrity-inspection-aii', title: 'Asset Integrity Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657765/cbm/inspection/asset-integrity-inspection/cover-photo.jpg', description: 'Inspection programs to ensure integrity and extend asset life.', details: ['Corrosion surveys', 'Fitness-for-service inputs', 'Risk-based plans'] },
  { slug: 'environmental-monitoring-inspection-emi', title: 'Environmental Monitoring Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657766/cbm/inspection/environmental-monitoring-inspection/cover-photo.jpg', description: 'Monitoring of emissions, effluents, and environmental compliance.', details: ['Air and water sampling', 'Noise and vibration', 'Compliance reporting'] },
  { slug: 'risk-based-inspection', title: 'Risk-Based Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657768/cbm/inspection/risk-based-inspection/cover-photo.png', description: 'Prioritized inspection using probability and consequence of failure.', details: ['RBI assessments', 'Inspection planning', 'Data-driven intervals'] },
  { slug: 'welding-inspection', title: 'Welding Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657770/cbm/inspection/welding-inspection/cover-photo.jpg', description: 'Welding procedure, welder qualification, and weld inspections.', details: ['WPS/PQR review', 'Welder qualification', 'Visual and NDT'] },
  { slug: 'electrical-instrumentation-inspection', title: 'Electrical & Instrumentation Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657771/cbm/inspection/electrical-instrumentation-inspection/cover-photo.jpg', description: 'E&I installation checks for safety and compliance.', details: ['Loop checks', 'Ex inspections', 'Functional testing'] },
  { slug: 'painting-inspection', title: 'Painting Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657773/cbm/inspection/painting-inspection/cover-photo.jpg', description: 'Coating inspection for corrosion protection and longevity.', details: ['Surface prep verification', 'DFT/adhesion tests', 'Holiday detection'] },
  { slug: 'gearbox-inspection', title: 'Gearbox Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657774/cbm/inspection/gearbox-inspection/cover-photo.jpg', description: 'Condition checks of gearboxes to prevent failures.', details: ['Endoscopy', 'Backlash/gear wear', 'Lubricant assessment'] },
  { slug: 'hse-inspection', title: 'Health, Safety, and Environment Inspection HSE', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657775/cbm/inspection/hse-inspection/cover-photo.jpg', description: 'HSE audits and inspections to ensure safe operations.', details: ['Permit-to-work audits', 'Safety culture checks', 'Regulatory compliance'] },
  { slug: 'topside-fitness-inspection', title: 'Topside Fitness Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657777/cbm/inspection/topside-fitness-inspection/cover-photo.jpg', description: 'Offshore topside inspections to maintain structural integrity.', details: ['Structural checks', 'Corrosion mapping', 'NDT support'] },
  { slug: 'marine-inspection', title: 'Marine Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657778/cbm/inspection/marine-inspection/cover-photo.jpg', description: 'Hull, cargo, and port inspections for marine assets.', details: ['Hull surveys', 'Cargo condition', 'Port state readiness'] },
  { slug: 'pre-shipment-inspection', title: 'Pre-Shipment Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756658088/cbm/inspection/pre-shipment-inspection/cover-photo.jpg', description: 'Verification of goods before shipment to ensure specifications.', details: ['Quantity and quality checks', 'Packing and marking', 'Documentation review'] },
  { slug: 'underground-mine-shaft-safety-inspection', title: 'Under Ground Mine Shaft Safety Inspection', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657794/cbm/inspection/underground-mine-shaft-safety-inspection/cover-photo.jpg', description: 'Safety inspections for underground mine shafts and equipment.', details: ['Ground support checks', 'Ventilation and escape routes', 'Equipment safety'] },
  { slug: 'on-site-laboratory-sampling', title: 'On-Site Laboratory & Sampling', image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657796/cbm/inspection/on-site-laboratory-sampling/cover-photo.jpg', description: 'On-site sampling and laboratory testing for rapid decisions.', details: ['Field test kits', 'Chain-of-custody', 'Rapid turnaround'] },
];

export function getInspectionItemBySlug(slug: string): InspectionItem | undefined {
  return inspectionItems.find((i) => i.slug === slug);
}


