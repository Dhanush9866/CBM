

const translations = {
    en: {
      navbar: {
        services: "Services",
        industries: "Industries",
        about: "About",
        careers: "Careers",
        blog: "Blog",
        contact: "Contact",
        getQuote: "Get Quote",
        contactUs: "Contact Us",
      },
      footer: {
        company: "CBM",
        description:
          "Leading provider of testing, inspection, certification, and advisory services. Committed to safety, security, and sustainability worldwide.",
        services: {
          title: "Services",
          list: [
            "Testing & Certification",
            "Inspection Services",
            "Audit & Assessment",
            "Training & Education",
            "Digital Solutions",
            "Consulting Services",
          ],
        },
        industries: {
          title: "Industries",
          list: [
            "Automotive",
            "Healthcare & Medical",
            "Energy & Utilities",
            "Manufacturing",
            "Construction",
            "Food & Agriculture",
          ],
        },
        contact: {
          title: "Contact",
          address: "CBM America\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Stay Updated",
        placeholderEmail: "Enter your email",
      },
      pages: {
        services: {
          hero: {
            title: "Leading Testing, Inspection & Certification Services",
            subtitle: "Trusted Worldwide",
            description: "Ensuring safety, security, and sustainability across industries with comprehensive testing, inspection, certification, and advisory services.",
            primaryCTAText: "Explore Services",
            secondaryCTAText: "Get Quote",
          },
        },
        about: {
          title: "About",
          breadcrumb: {
            home: "Home",
            about: "About"
          },
          loading: "Loading...",
          error: "Failed to load content"
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Complete Service Portfolio",
          subheading: "From product testing to regulatory compliance, we provide comprehensive solutions to help you succeed in global markets.",
        },
        servicesList: [
          {
            id: 1,
            title: "Testing (T)",
            description: "Comprehensive testing services to validate safety, performance, and compliance.",
            icon: "Search",
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
            icon: "Settings",
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
            icon: "Shield",
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
            icon: "FileText",
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
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Management systems",
              "Product certification",
              "Regulatory approvals",
            ]
          },
          {
            id: 6,
            title: "Innovation & R&D",
            description: "Next-generation solutions powered by IoT, AI, Robotics, and Industry 4.0 technologies.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "IoT & AI monitoring",
              "Robotic inspection",
              "Digital twin technology",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "150+",
          label: "Countries Served",
          description: "Global presence with local expertise"
        },
        {
          number: "25,000+",
          label: "Experts Worldwide",
          description: "Highly qualified professionals"
        },
        {
          number: "1,000+",
          label: "Testing Laboratories",
          description: "State-of-the-art facilities"
        },
        {
          number: "150",
          label: "Years of Excellence",
          description: "Trusted since 1866"
        }
      ],
    },
  
    fr: {
      navbar: {
        services: "Services",
        industries: "Industries",
        about: "À propos",
        careers: "Carrières",
        blog: "Blog",
        contact: "Contact",
        getQuote: "Obtenir un devis",
        contactUs: "Contactez-nous",
      },
      footer: {
        company: "CBM",
        description:
          "Fournisseur leader de services de test, d'inspection, de certification et de conseil. Engagé pour la sécurité, la sûreté et la durabilité dans le monde entier.",
        services: {
          title: "Services",
          list: [
            "Tests et certification",
            "Services d'inspection",
            "Audit et évaluation",
            "Formation et éducation",
            "Solutions numériques",
            "Services de conseil",
          ],
        },
        industries: {
          title: "Industries",
          list: [
            "Automobile",
            "Santé & médical",
            "Énergie & services publics",
            "Fabrication",
            "Construction",
            "Alimentation & agriculture",
          ],
        },
        contact: {
          title: "Contact",
          address: "CBM Amérique\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Restez informé",
        placeholderEmail: "Entrez votre email",
      },
      pages: {
        services: {
          hero: {
            title: "Services de test, d'inspection et de certification de premier plan",
            subtitle: "De confiance dans le monde entier",
            description: "Garantir la sécurité, la sûreté et la durabilité dans tous les secteurs grâce à des services complets de test, d'inspection, de certification et de conseil.",
            primaryCTAText: "Explorer les services",
            secondaryCTAText: "Obtenir un devis",
          },
        },
        about: {
          title: "À propos",
          breadcrumb: {
            home: "Accueil",
            about: "À propos"
          },
          loading: "Chargement...",
          error: "Échec du chargement du contenu"
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Portfolio de services complet",
          subheading: "Des tests de produits à la conformité réglementaire, nous fournissons des solutions complètes pour vous aider à réussir sur les marchés mondiaux.",
        },
        servicesList: [
          {
            id: 1,
            title: "Tests (T)",
            description: "Services de test complets pour valider la sécurité, les performances et la conformité.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Tests non destructifs",
              "Performance et fiabilité",
              "Conformité aux normes",
            ]
          },
          {
            id: 2,
            title: "Surveillance basée sur l'état (CBM)",
            description: "Maintenance prédictive utilisant l'analytique, les capteurs et les diagnostics pour réduire les temps d'arrêt.",
            icon: "Settings",
            link: "/services/cbm",
            features: [
              "Analyse vibratoire et acoustique",
              "Thermographie et analyse d'huile",
              "Tableaux de bord de santé des actifs",
            ]
          },
          {
            id: 3,
            title: "Inspection (I)",
            description: "Services d'inspection indépendants garantissant la qualité et le respect de la réglementation.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Inspection tierce partie",
              "Surveillance des fournisseurs",
              "Audits de site et d'usine",
            ]
          },
          {
            id: 4,
            title: "Audit (A)",
            description: "Audits de processus, de fournisseurs et de systèmes pour identifier les risques et stimuler l'amélioration.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Audits de fournisseurs",
              "Examens de capacité de processus",
              "Analyse des écarts de conformité",
            ]
          },
          {
            id: 5,
            title: "Vérification et Certification (VC)",
            description: "Services de vérification et de certification pour démontrer la confiance et la conformité.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Systèmes de management",
              "Certification de produits",
              "Approbations réglementaires",
            ]
          },
          {
            id: 6,
            title: "Innovation et R&D",
            description: "Solutions de nouvelle génération alimentées par l'IoT, l'IA, la robotique et les technologies Industrie 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Surveillance IoT et IA",
              "Inspection robotique",
              "Technologie de jumeau numérique",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "150+",
          label: "Pays Desservis",
          description: "Présence mondiale avec expertise locale"
        },
        {
          number: "25,000+",
          label: "Experts dans le Monde",
          description: "Professionnels hautement qualifiés"
        },
        {
          number: "1,000+",
          label: "Laboratoires de Test",
          description: "Installations de pointe"
        },
        {
          number: "150",
          label: "Années d'Excellence",
          description: "De confiance depuis 1866"
        }
      ],
    },
  
    pt: {
      navbar: {
        services: "Serviços",
        industries: "Indústrias",
        about: "Sobre",
        careers: "Carreiras",
        blog: "Blog",
        contact: "Contato",
        getQuote: "Solicitar Orçamento",
        contactUs: "Contate-Nos",
      },
      footer: {
        company: "CBM",
        description:
          "Fornecedor líder de serviços de teste, inspeção, certificação e consultoria. Comprometido com segurança, proteção e sustentabilidade em todo o mundo.",
        services: {
          title: "Serviços",
          list: [
            "Teste & Certificação",
            "Serviços de Inspeção",
            "Auditoria & Avaliação",
            "Treinamento & Educação",
            "Soluções Digitais",
            "Serviços de Consultoria",
          ],
        },
        industries: {
          title: "Indústrias",
          list: [
            "Automotivo",
            "Saúde & Médico",
            "Energia & Utilidades",
            "Manufatura",
            "Construção",
            "Alimentação & Agricultura",
          ],
        },
        contact: {
          title: "Contato",
          address: "CBM América\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Fique Atualizado",
        placeholderEmail: "Digite seu email",
      },
      pages: {
        services: {
          hero: {
            title: "Principais serviços de Teste, Inspeção e Certificação",
            subtitle: "Confiável em todo o mundo",
            description: "Garantindo segurança, proteção e sustentabilidade em diversos setores com serviços abrangentes de teste, inspeção, certificação e consultoria.",
            primaryCTAText: "Explorar Serviços",
            secondaryCTAText: "Solicitar Orçamento",
          },
        },
        about: {
          title: "Sobre",
          breadcrumb: {
            home: "Início",
            about: "Sobre"
          },
          loading: "Carregando...",
          error: "Falha ao carregar conteúdo"
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Portfólio Completo de Serviços",
          subheading: "Desde testes de produtos até conformidade regulatória, fornecemos soluções abrangentes para ajudá-lo a ter sucesso nos mercados globais.",
        },
        servicesList: [
          {
            id: 1,
            title: "Testes (T)",
            description: "Serviços abrangentes de teste para validar segurança, desempenho e conformidade.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Testes não destrutivos",
              "Desempenho e confiabilidade",
              "Conformidade com padrões",
            ]
          },
          {
            id: 2,
            title: "Monitoramento Baseado em Condição (CBM)",
            description: "Manutenção preditiva usando análise, sensores e diagnósticos para reduzir tempo de inatividade.",
            icon: "Settings",
            link: "/services/cbm",
            features: [
              "Análise de vibração e acústica",
              "Termografia e análise de óleo",
              "Dashboards de saúde de ativos",
            ]
          },
          {
            id: 3,
            title: "Inspeção (I)",
            description: "Serviços de inspeção independentes garantindo qualidade e aderência regulatória.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Inspeção de terceiros",
              "Vigilância de fornecedores",
              "Auditorias de site e fábrica",
            ]
          },
          {
            id: 4,
            title: "Auditoria (A)",
            description: "Auditorias de processo, fornecedor e sistema para identificar riscos e impulsionar melhorias.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Auditorias de fornecedores",
              "Revisões de capacidade de processo",
              "Análise de lacunas de conformidade",
            ]
          },
          {
            id: 5,
            title: "Verificação e Certificação (VC)",
            description: "Serviços de verificação e certificação para demonstrar confiança e conformidade.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Sistemas de gestão",
              "Certificação de produtos",
              "Aprovações regulatórias",
            ]
          },
          {
            id: 6,
            title: "Inovação e P&D",
            description: "Soluções de próxima geração alimentadas por IoT, IA, Robótica e tecnologias Indústria 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Monitoramento IoT e IA",
              "Inspeção robótica",
              "Tecnologia de gêmeo digital",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "150+",
          label: "Países Atendidos",
          description: "Presença global com expertise local"
        },
        {
          number: "25,000+",
          label: "Especialistas no Mundo",
          description: "Profissionais altamente qualificados"
        },
        {
          number: "1,000+",
          label: "Laboratórios de Teste",
          description: "Instalações de última geração"
        },
        {
          number: "150",
          label: "Anos de Excelência",
          description: "Confiável desde 1866"
        }
      ],
    },
  
    es: {
      navbar: {
        services: "Servicios",
        industries: "Industrias",
        about: "Acerca de",
        careers: "Carreras",
        blog: "Blog",
        contact: "Contacto",
        getQuote: "Obtener Cotización",
        contactUs: "Contáctenos",
      },
      footer: {
        company: "CBM",
        description:
          "Proveedor líder de servicios de prueba, inspección, certificación y asesoría. Comprometido con la seguridad, la protección y la sostenibilidad en todo el mundo.",
        services: {
          title: "Servicios",
          list: [
            "Pruebas & Certificación",
            "Servicios de Inspección",
            "Auditoría & Evaluación",
            "Capacitación & Educación",
            "Soluciones Digitales",
            "Servicios de Consultoría",
          ],
        },
        industries: {
          title: "Industrias",
          list: [
            "Automotriz",
            "Salud & Médico",
            "Energía & Utilidades",
            "Manufactura",
            "Construcción",
            "Alimentos & Agricultura",
          ],
        },
        contact: {
          title: "Contacto",
          address: "CBM América\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Mantente Actualizado",
        placeholderEmail: "Ingrese su correo electrónico",
      },
      pages: {
        services: {
          hero: {
            title: "Servicios líderes de Pruebas, Inspección y Certificación",
            subtitle: "De confianza en todo el mundo",
            description: "Garantizando la seguridad, la protección y la sostenibilidad en todas las industrias con servicios integrales de prueba, inspección, certificación y asesoría.",
            primaryCTAText: "Explorar Servicios",
            secondaryCTAText: "Obtener Cotización",
          },
        },
        about: {
          title: "Acerca de",
          breadcrumb: {
            home: "Inicio",
            about: "Acerca de"
          },
          loading: "Cargando...",
          error: "Error al cargar contenido"
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Portafolio Completo de Servicios",
          subheading: "Desde pruebas de productos hasta cumplimiento regulatorio, proporcionamos soluciones integrales para ayudarle a tener éxito en los mercados globales.",
        },
        servicesList: [
          {
            id: 1,
            title: "Pruebas (T)",
            description: "Servicios integrales de prueba para validar seguridad, rendimiento y cumplimiento.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Pruebas no destructivas",
              "Rendimiento y confiabilidad",
              "Cumplimiento de estándares",
            ]
          },
          {
            id: 2,
            title: "Monitoreo Basado en Condición (CBM)",
            description: "Mantenimiento predictivo utilizando análisis, sensores y diagnósticos para reducir el tiempo de inactividad.",
            icon: "Settings",
            link: "/services/cbm",
            features: [
              "Análisis de vibración y acústica",
              "Termografía y análisis de aceite",
              "Tableros de salud de activos",
            ]
          },
          {
            id: 3,
            title: "Inspección (I)",
            description: "Servicios de inspección independientes que garantizan calidad y adherencia regulatoria.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Inspección de terceros",
              "Vigilancia de proveedores",
              "Auditorías de sitio y fábrica",
            ]
          },
          {
            id: 4,
            title: "Auditoría (A)",
            description: "Auditorías de proceso, proveedor y sistema para identificar riesgos e impulsar mejoras.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Auditorías de proveedores",
              "Revisiones de capacidad de proceso",
              "Análisis de brechas de cumplimiento",
            ]
          },
          {
            id: 5,
            title: "Verificación y Certificación (VC)",
            description: "Servicios de verificación y certificación para demostrar confianza y cumplimiento.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Sistemas de gestión",
              "Certificación de productos",
              "Aprobaciones regulatorias",
            ]
          },
          {
            id: 6,
            title: "Innovación y I+D",
            description: "Soluciones de próxima generación impulsadas por IoT, IA, Robótica y tecnologías Industria 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Monitoreo IoT e IA",
              "Inspección robótica",
              "Tecnología de gemelo digital",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "150+",
          label: "Países Atendidos",
          description: "Presencia global con experiencia local"
        },
        {
          number: "25,000+",
          label: "Expertos en el Mundo",
          description: "Profesionales altamente calificados"
        },
        {
          number: "1,000+",
          label: "Laboratorios de Prueba",
          description: "Instalaciones de vanguardia"
        },
        {
          number: "150",
          label: "Años de Excelencia",
          description: "Confiable desde 1866"
        }
      ],
    },
  
    ru: {
      navbar: {
        services: "Услуги",
        industries: "Отрасли",
        about: "О нас",
        careers: "Карьера",
        blog: "Блог",
        contact: "Контакты",
        getQuote: "Получить предложение",
        contactUs: "Свяжитесь с нами",
      },
      footer: {
        company: "CBM",
        description:
          "Ведущий поставщик услуг по тестированию, инспекции, сертификации и консультированию. Привержен безопасности, защите и устойчивости по всему миру.",
        services: {
          title: "Услуги",
          list: [
            "Тестирование и сертификация",
            "Инспекционные услуги",
            "Аудит и оценка",
            "Обучение и образование",
            "Цифровые решения",
            "Консалтинговые услуги",
          ],
        },
        industries: {
          title: "Отрасли",
          list: [
            "Автомобильная промышленность",
            "Здравоохранение и медицина",
            "Энергетика и коммунальные услуги",
            "Производство",
            "Строительство",
            "Продовольствие и сельское хозяйство",
          ],
        },
        contact: {
          title: "Контакты",
          address: "CBM Америка\n10040 Mesa Rim Road\nСан-Диего, Калифорния 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Будьте в курсе",
        placeholderEmail: "Введите ваш email",
      },
      pages: {
        services: {
          hero: {
            title: "Ведущие услуги по тестированию, инспекции и сертификации",
            subtitle: "Доверие по всему миру",
            description: "Обеспечение безопасности, надежности и устойчивого развития в различных отраслях благодаря комплексным услугам по тестированию, инспекции, сертификации и консультированию.",
            primaryCTAText: "Изучить услуги",
            secondaryCTAText: "Получить предложение",
          },
        },
        about: {
          title: "О нас",
          breadcrumb: {
            home: "Главная",
            about: "О нас"
          },
          loading: "Загрузка...",
          error: "Ошибка загрузки контента"
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Полный портфель услуг",
          subheading: "От тестирования продуктов до соблюдения нормативных требований, мы предоставляем комплексные решения для успеха на глобальных рынках.",
        },
        servicesList: [
          {
            id: 1,
            title: "Тестирование (T)",
            description: "Комплексные услуги тестирования для проверки безопасности, производительности и соответствия требованиям.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Неразрушающий контроль",
              "Производительность и надежность",
              "Соответствие стандартам",
            ]
          },
          {
            id: 2,
            title: "Мониторинг по состоянию (CBM)",
            description: "Предиктивное обслуживание с использованием аналитики, датчиков и диагностики для снижения простоев.",
            icon: "Settings",
            link: "/services/cbm",
            features: [
              "Анализ вибрации и акустики",
              "Термография и анализ масла",
              "Панели состояния активов",
            ]
          },
          {
            id: 3,
            title: "Инспекция (I)",
            description: "Независимые инспекционные услуги, обеспечивающие качество и соблюдение нормативных требований.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Инспекция третьей стороной",
              "Надзор за поставщиками",
              "Аудит площадок и заводов",
            ]
          },
          {
            id: 4,
            title: "Аудит (A)",
            description: "Аудит процессов, поставщиков и систем для выявления рисков и стимулирования улучшений.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Аудит поставщиков",
              "Обзор производственных возможностей",
              "Анализ пробелов в соответствии",
            ]
          },
          {
            id: 5,
            title: "Верификация и Сертификация (VC)",
            description: "Услуги верификации и сертификации для демонстрации доверия и соответствия требованиям.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Системы менеджмента",
              "Сертификация продукции",
              "Регуляторные одобрения",
            ]
          },
          {
            id: 6,
            title: "Инновации и НИОКР",
            description: "Решения следующего поколения на основе IoT, ИИ, робототехники и технологий Индустрии 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Мониторинг IoT и ИИ",
              "Роботизированная инспекция",
              "Технология цифрового двойника",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "150+",
          label: "Обслуживаемые Страны",
          description: "Глобальное присутствие с местной экспертизой"
        },
        {
          number: "25,000+",
          label: "Экспертов по Миру",
          description: "Высококвалифицированные специалисты"
        },
        {
          number: "1,000+",
          label: "Испытательных Лабораторий",
          description: "Современные объекты"
        },
        {
          number: "150",
          label: "Лет Совершенства",
          description: "Доверие с 1866 года"
        }
      ],
    },
  };
  
  module.exports = translations;

