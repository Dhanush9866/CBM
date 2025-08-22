export type TestingSection = {
  slug: string;
  title: string;
  image: string;
  description: string;
  details: string[];
};

export const testingSections: TestingSection[] = [
  {
    slug: 'visual-testing',
    title: 'Visual Testing',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1200&auto=format&fit=crop',
    description: 'Surface-level visual inspection to detect defects and anomalies.',
    details: [
      'Direct and remote visual inspection',
      'Corrosion and coating assessment',
      'Weld bead evaluation',
    ],
  },
  {
    slug: 'drone-inspection',
    title: 'Drone Inspection',
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1200&auto=format&fit=crop',
    description: 'Aerial inspections for hard-to-reach assets using UAVs.',
    details: ['Confined space and elevated assets', 'Thermal imaging options', 'High-resolution photogrammetry'],
  },
  {
    slug: 'borescope-inspection',
    title: 'Borescope Inspection',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    description: 'Remote visual inspection of internal components and cavities.',
    details: ['Articulating scopes', 'High-intensity lighting', 'Digital capture and reporting'],
  },
  {
    slug: 'ultrasonic-testing',
    title: 'Ultrasonic Testing',
    image: 'https://images.unsplash.com/photo-1581093588401-16c7ff3b5c46?q=80&w=1200&auto=format&fit=crop',
    description: 'High-frequency sound waves to detect internal flaws.',
    details: ['Thickness gauging', 'Shear-wave and straight-beam', 'Weld inspection'],
  },
  {
    slug: 'phased-array-ut',
    title: 'Phased Array Ultrasonic Testing',
    image: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=1200&auto=format&fit=crop',
    description: 'Advanced UT with steerable beams for complex geometries.',
    details: ['Sectorial scanning', 'Encoded mapping', 'Complex welds and components'],
  },
  {
    slug: 'guided-wave-lrut',
    title: 'Guided Wave & LRUT',
    image: 'https://images.unsplash.com/photo-1581090468340-ec1ff5ae7c49?q=80&w=1200&auto=format&fit=crop',
    description: 'Long-range ultrasonic screening for pipelines and piping.',
    details: ['Buried or insulated lines', 'Screening over long distances', 'Pinpoint follow-up'],
  },
  {
    slug: 'liquid-penetrant-testing',
    title: 'Liquid Penetrant Testing',
    image: 'https://images.unsplash.com/photo-1530176611600-c43b7d1d4119?q=80&w=1200&auto=format&fit=crop',
    description: 'Capillary action reveals surface-breaking defects.',
    details: ['Visible and fluorescent systems', 'Portable or lab processing', 'Crack and leak detection'],
  },
  {
    slug: 'radiographic-testing',
    title: 'Radiographic Testing',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop',
    description: 'X-ray or gamma imaging to visualize internal discontinuities.',
    details: ['Film or digital radiography', 'Welds and castings', 'Code-compliant techniques'],
  },
  {
    slug: 'magnetic-particle-testing',
    title: 'Magnetic Particle & Fluorescent MT',
    image: 'https://images.unsplash.com/photo-1581092580502-7c4c5a6ab1c9?q=80&w=1200&auto=format&fit=crop',
    description: 'Magnetization reveals surface and near-surface indications.',
    details: ['Yoke and bench methods', 'AC/DC magnetization', 'Wet fluorescent'],
  },
  {
    slug: 'eddy-current-testing',
    title: 'Eddy Current Testing',
    image: 'https://images.unsplash.com/photo-1581093588401-6c4a3f1db511?q=80&w=1200&auto=format&fit=crop',
    description: 'Electromagnetic method for surface and sub-surface flaws.',
    details: ['Surface cracks', 'Tubing inspection', 'Conductivity measurements'],
  },
  {
    slug: 'time-of-flight-diffraction',
    title: 'Time of Flight Diffraction',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    description: 'Accurate defect sizing using diffracted ultrasonic waves.',
    details: ['Weld flaw sizing', 'High-accuracy depth measurement', 'Complementary to PAUT'],
  },
  {
    slug: 'hardness-testing',
    title: 'Hardness Testing',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    description: 'Material hardness verification using standard methods.',
    details: ['Portable and bench methods', 'Brinell, Rockwell, Vickers', 'Heat-treatment verification'],
  },
  {
    slug: 'lifting-gear-load-testing',
    title: 'Lifting Gear Load Testing',
    image: 'https://images.unsplash.com/photo-1541976076758-347942db1976?q=80&w=1200&auto=format&fit=crop',
    description: 'Proof load tests for cranes, slings, hooks, and lifting gear.',
    details: ['On-site load testing', 'Certificates of compliance', 'Periodic inspection programs'],
  },
  {
    slug: 'leak-testing',
    title: 'Leak Testing',
    image: 'https://images.unsplash.com/photo-1557701197-4d5f4f34f173?q=80&w=1200&auto=format&fit=crop',
    description: 'Helium, pressure decay, or bubble testing for leak detection.',
    details: ['Helium mass spectrometry', 'Pressure decay', 'Vacuum box testing'],
  },
  {
    slug: 'positive-material-identification',
    title: 'Positive Material Identification',
    image: 'https://images.unsplash.com/photo-1581090468340-4fc1a6d00f7e?q=80&w=1200&auto=format&fit=crop',
    description: 'Alloy verification and chemistry using XRF or OES.',
    details: ['On-site XRF', 'Laboratory OES', 'Material traceability'],
  },
];

export function getTestingSectionBySlug(slug: string): TestingSection | undefined {
  return testingSections.find((s) => s.slug === slug);
}


