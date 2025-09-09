export type CBMItem = {
  slug: string;
  title: string;
  image: string;
  description: string;
  details: string[];
};

export const cbmItems: CBMItem[] = [
  {
    slug: 'vibration-analysis-balancing',
    title: 'Vibration Analysis & Balancing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657757/cbm/cbm/vibration-analysis-balancing/cover-photo.jpg',
    description: 'Condition diagnostics of rotating assets using vibration signatures and in-situ balancing.',
    details: [
      'Spectrum and time waveform analysis',
      'On-site dynamic balancing',
      'Bearing and alignment fault detection',
    ],
  },
  {
    slug: 'laser-shaft-alignment',
    title: 'Laser Shaft Alignment',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657758/cbm/cbm/laser-shaft-alignment/cover-photo.jpg',
    description: 'Precision alignment to reduce vibration, bearing wear, and energy consumption.',
    details: ['Coupling and belt alignment', 'Soft-foot detection', 'Thermal growth compensation'],
  },
  {
    slug: 'remote-cbm-iot-cloud',
    title: 'Remote CBM via IoT Sensor & Cloud Monitoring',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657759/cbm/cbm/remote-cbm-iot-cloud/cover-photo.jpg',
    description: 'Wireless sensors and dashboards for continuous asset health monitoring.',
    details: ['Edge devices and gateways', 'Alerting and analytics', 'Dashboards and reporting'],
  },
  {
    slug: 'infrared-thermography',
    title: 'Infrared Thermography Testing',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657761/cbm/cbm/infrared-thermography/cover-photo.jpg',
    description: 'Thermal imaging to detect hotspots, electrical faults, and insulation losses.',
    details: ['Electrical panel surveys', 'Mechanical hotspots', 'Building envelope assessment'],
  },
  {
    slug: 'lubrication-oil-analysis',
    title: 'Lubrication & Transformer Oil Analysis',
    image: 'https://res.cloudinary.com/docyipoze/image/upload/v1756657762/cbm/cbm/lubrication-oil-analysis/cover-photo.jpg',
    description: 'Tribology and dielectric testing for predictive maintenance and reliability.',
    details: ['Wear debris analysis', 'Dielectric strength and DGA', 'Viscosity and contamination checks'],
  },
];

export function getCbmItemBySlug(slug: string): CBMItem | undefined {
  return cbmItems.find((i) => i.slug === slug);
}


