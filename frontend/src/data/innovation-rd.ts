export interface InnovationRDSection {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  content: string;
}

export const innovationRDSections: InnovationRDSection[] = [
  {
    id: 'section-1',
    title: 'CBM 360° – IoT & AI Condition Monitoring Systems',
    slug: 'cbm-360-iot-ai-condition-monitoring',
    description: 'Our Condition-Based Monitoring (CBM 360°) solutions provide realtime asset health insights for rotating machinery, pipelines, offshore structures, and civil infrastructure.',
    image: '/cbm-monitoring-bg.jpg',
    content: `Our Condition-Based Monitoring (CBM 360°) solutions provide realtime asset health insights for rotating machinery, pipelines, offshore structures, and civil infrastructure.

**Capabilities:**

• **Wireless CBM Sensor Nodes**: Designed with Wi-Fi 6 & Bluetooth 6.0 for industrial rotating equipment & structural health monitoring.

• **Smart Sensor Integration**: Embedded vibration, thermal, strain, and acoustic sensors with microcontrollers (ESP32, STM32, nRF).

• **Edge Computing & AI**: Deployed AI models directly on sensors for anomaly detection & predictive maintenance.

• **Cloud-Based IoT Pipeline**: Implemented MQTT + database infrastructure for remote monitoring, reporting, and trend analysis.

**Applications**: Power plants, refineries, FPSOs, offshore jackets, mining equipment, and bridges.`
  },
  {
    id: 'section-2',
    title: 'AI & Robotics in NDT Testing & Inspection',
    slug: 'ai-robotics-ndt-testing-inspection',
    description: 'We integrate AI and robotics into traditional NDT services for higher accuracy, efficiency, and operator safety.',
    image: '/ai-robotics-bg.jpg',
    content: `We integrate AI and robotics into traditional NDT services for higher accuracy, efficiency, and operator safety.

**Key innovations include:**

• **AI-Powered NDT** – Automated flaw detection in ultrasonic, radiographic, thermographic inspections.

• **Robotic Inspection** – Crawlers, UAVs, and drones for high-risk inspections in pipelines, tanks, jackets, chimneys, and offshore assets.

• **Digital Twin Technology** – Real-time 3D replicas of assets for structural health monitoring and lifecycle management.

• **Augmented Reality (AR)** – Remote collaboration and inspection visualization.`
  },
  {
    id: 'section-3',
    title: 'Future Roadmap – Smart Industry 4.0 Transformation',
    slug: 'future-roadmap-smart-industry-4-0',
    description: 'We continuously invest in R&D and emerging technologies to stay ahead of industrial challenges.',
    image: '/industry-4-0-bg.jpg',
    content: `We continuously invest in R&D and emerging technologies to stay ahead of industrial challenges.

**Our Focus Areas:**

• **5G-Enabled Remote Monitoring** – ultra-fast, low-latency inspection networks

• **Digital Twin Ecosystems** – advanced asset lifecycle & failure prediction

• **Smart Factories** – end-to-end IoT integration for predictive maintenance

• **Green Energy & Sustainability** – CBM solutions for wind, solar, and hydrogen plants

**Value Proposition:**

• **24/7 Global Reach** – Inspectors & Experts across all continents

• **Certified Professionals** – Compliance with ISO, ASME, API, ASTM, EN standards

• **Industry Coverage** – Oil & Gas (Onshore/Offshore), Mining, Marine, FPSO/FSO, Power, and Infrastructure

• **Innovation Driven** – IoT, AI, Robotics, Digital Twin, and Industry 4.0

**Tagline:** "360° Worldwide – Redefining Testing, Inspection, and Monitoring through IoT, AI & Robotics."`
  }
];

// Function to get innovation-rd item by slug
export function getInnovationRDItemBySlug(slug: string): InnovationRDSection | undefined {
  return innovationRDSections.find(section => section.slug === slug);
}

