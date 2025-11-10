import { apiClient } from '@/utils/api';

export interface CloudinaryImage {
  url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  tags: string[];
}

export interface ImageResponse {
  success: boolean;
  data: {
    serviceType: string;
    subService: string;
    images: CloudinaryImage[];
    totalImages: number;
  };
}

class ImageService {
  // Fallback Cloudinary URLs for Testing services
  private fallbackTestingImages: { [key: string]: CloudinaryImage[] } = {
    'visual-testing': [
    {
      url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755871450/cbm/testing/visual-testing/cbm/testing/visual-testing/image52.jpg',
      public_id: 'cbm/testing/visual-testing/cbm/testing/visual-testing/image52',
      width: 686,
      height: 386,
      format: 'jpg',
      created_at: '2025-08-22T14:04:10Z',
      tags: ['testing', 'visual-testing', 'cbm']
    },
    {
      url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755871452/cbm/testing/visual-testing/cbm/testing/visual-testing/image53.jpg',
      public_id: 'cbm/testing/visual-testing/cbm/testing/visual-testing/image53',
      width: 733,
      height: 470,
      format: 'jpg',
      created_at: '2025-08-22T14:04:12Z',
      tags: ['testing', 'visual-testing', 'cbm']
    },
    {
      url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755871455/cbm/testing/visual-testing/cbm/testing/visual-testing/image54.jpg',
      public_id: 'cbm/testing/visual-testing/cbm/testing/visual-testing/image54',
      width: 748,
      height: 420,
      format: 'jpg',
      created_at: '2025-08-22T14:04:15Z',
      tags: ['testing', 'visual-testing', 'cbm']
    }
    ],
    'drone-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879101/cbm/testing/drone-inspection/cbm/testing/drone-inspection/image58.jpg',
        public_id: 'cbm/testing/drone-inspection/cbm/testing/drone-inspection/image58',
        width: 715,
        height: 502,
        format: 'jpg',
        created_at: '2025-08-22T15:51:41Z',
        tags: ['testing', 'drone-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879102/cbm/testing/drone-inspection/cbm/testing/drone-inspection/image59.jpg',
        public_id: 'cbm/testing/drone-inspection/cbm/testing/drone-inspection/image59',
        width: 743,
        height: 431,
        format: 'jpg',
        created_at: '2025-08-22T15:51:42Z',
        tags: ['testing', 'drone-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879342/cbm/testing/drone-inspection/cbm/testing/drone-inspection/image60.jpg',
        public_id: 'cbm/testing/drone-inspection/cbm/testing/drone-inspection/image60',
        width: 4592,
        height: 2584,
        format: 'jpg',
        created_at: '2025-08-22T15:55:42Z',
        tags: ['testing', 'drone-inspection', 'cbm']
      }
    ],
    'borescope-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879057/cbm/testing/borescope-inspection/cbm/testing/borescope-inspection/image55.jpg',
        public_id: 'cbm/testing/borescope-inspection/cbm/testing/borescope-inspection/image55',
        width: 458,
        height: 204,
        format: 'jpg',
        created_at: '2025-08-22T15:50:57Z',
        tags: ['testing', 'borescope-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879072/cbm/testing/borescope-inspection/cbm/testing/borescope-inspection/image56.jpg',
        public_id: 'cbm/testing/borescope-inspection/cbm/testing/borescope-inspection/image56',
        width: 816,
        height: 479,
        format: 'jpg',
        created_at: '2025-08-22T15:51:12Z',
        tags: ['testing', 'borescope-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879051/cbm/testing/borescope-inspection/cbm/testing/borescope-inspection/image57.jpg',
        public_id: 'cbm/testing/borescope-inspection/cbm/testing/borescope-inspection/image57',
        width: 660,
        height: 440,
        format: 'jpg',
        created_at: '2025-08-22T15:50:51Z',
        tags: ['testing', 'borescope-inspection', 'cbm']
      }
    ],
    'ultrasonic-testing': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879436/cbm/testing/ultrasonic-testing/cbm/testing/ultrasonic-testing/image68.jpg',
        public_id: 'cbm/testing/ultrasonic-testing/cbm/testing/ultrasonic-testing/image68',
        width: 640,
        height: 480,
        format: 'jpg',
        created_at: '2025-08-22T15:57:16Z',
        tags: ['testing', 'ultrasonic-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879441/cbm/testing/ultrasonic-testing/cbm/testing/ultrasonic-testing/image69.jpg',
        public_id: 'cbm/testing/ultrasonic-testing/cbm/testing/ultrasonic-testing/image69',
        width: 744,
        height: 450,
        format: 'jpg',
        created_at: '2025-08-22T15:57:21Z',
        tags: ['testing', 'ultrasonic-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879441/cbm/testing/ultrasonic-testing/cbm/testing/ultrasonic-testing/image70.jpg',
        public_id: 'cbm/testing/ultrasonic-testing/cbm/testing/ultrasonic-testing/image70',
        width: 900,
        height: 550,
        format: 'jpg',
        created_at: '2025-08-22T15:57:21Z',
        tags: ['testing', 'ultrasonic-testing', 'cbm']
      }
    ],
    'phased-array-ut': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879364/cbm/testing/phased-array-ut/cbm/testing/phased-array-ut/image61.jpg',
        public_id: 'cbm/testing/phased-array-ut/cbm/testing/phased-array-ut/image61',
        width: 900,
        height: 335,
        format: 'jpg',
        created_at: '2025-08-22T15:56:04Z',
        tags: ['testing', 'phased-array-ut', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879417/cbm/testing/phased-array-ut/cbm/testing/phased-array-ut/image62.jpg',
        public_id: 'cbm/testing/phased-array-ut/cbm/testing/phased-array-ut/image62',
        width: 1071,
        height: 714,
        format: 'jpg',
        created_at: '2025-08-22T15:56:57Z',
        tags: ['testing', 'phased-array-ut', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879366/cbm/testing/phased-array-ut/cbm/testing/phased-array-ut/image63.jpg',
        public_id: 'cbm/testing/phased-array-ut/cbm/testing/phased-array-ut/image63',
        width: 789,
        height: 444,
        format: 'jpg',
        created_at: '2025-08-22T15:56:06Z',
        tags: ['testing', 'phased-array-ut', 'cbm']
      }
    ],
    'guided-wave-lrut': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879506/cbm/testing/guided-wave-lrut/cbm/testing/guided-wave-lrut/image71.jpg',
        public_id: 'cbm/testing/guided-wave-lrut/cbm/testing/guided-wave-lrut/image71',
        width: 1500,
        height: 912,
        format: 'jpg',
        created_at: '2025-08-22T15:58:26Z',
        tags: ['testing', 'guided-wave-lrut', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879447/cbm/testing/guided-wave-lrut/cbm/testing/guided-wave-lrut/image72.jpg',
        public_id: 'cbm/testing/guided-wave-lrut/cbm/testing/guided-wave-lrut/image72',
        width: 970,
        height: 630,
        format: 'jpg',
        created_at: '2025-08-22T15:57:27Z',
        tags: ['testing', 'guided-wave-lrut', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879457/cbm/testing/guided-wave-lrut/cbm/testing/guided-wave-lrut/image73.jpg',
        public_id: 'cbm/testing/guided-wave-lrut/cbm/testing/guided-wave-lrut/image73',
        width: 913,
        height: 565,
        format: 'jpg',
        created_at: '2025-08-22T15:57:37Z',
        tags: ['testing', 'guided-wave-lrut', 'cbm']
      }
    ],
    'radiographic-testing': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879511/cbm/testing/radiographic-testing/cbm/testing/radiographic-testing/image74.jpg',
        public_id: 'cbm/testing/radiographic-testing/cbm/testing/radiographic-testing/image74',
        width: 554,
        height: 370,
        format: 'jpg',
        created_at: '2025-08-22T15:58:31Z',
        tags: ['testing', 'radiographic-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879514/cbm/testing/radiographic-testing/cbm/testing/radiographic-testing/image75.jpg',
        public_id: 'cbm/testing/radiographic-testing/cbm/testing/radiographic-testing/image75',
        width: 612,
        height: 408,
        format: 'jpg',
        created_at: '2025-08-22T15:58:34Z',
        tags: ['testing', 'radiographic-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879587/cbm/testing/radiographic-testing/cbm/testing/radiographic-testing/image76.jpg',
        public_id: 'cbm/testing/radiographic-testing/cbm/testing/radiographic-testing/image76',
        width: 2556,
        height: 1693,
        format: 'jpg',
        created_at: '2025-08-22T15:59:47Z',
        tags: ['testing', 'radiographic-testing', 'cbm']
      }
    ],
    'eddy-current-testing': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879597/cbm/testing/eddy-current-testing/cbm/testing/eddy-current-testing/image77.jpg',
        public_id: 'cbm/testing/eddy-current-testing/cbm/testing/eddy-current-testing/image77',
        width: 967,
        height: 359,
        format: 'jpg',
        created_at: '2025-08-22T15:59:57Z',
        tags: ['testing', 'eddy-current-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879617/cbm/testing/eddy-current-testing/cbm/testing/eddy-current-testing/image78.jpg',
        public_id: 'cbm/testing/eddy-current-testing/cbm/testing/eddy-current-testing/image78',
        width: 500,
        height: 281,
        format: 'jpg',
        created_at: '2025-08-22T16:00:17Z',
        tags: ['testing', 'eddy-current-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879611/cbm/testing/eddy-current-testing/cbm/testing/eddy-current-testing/image79.png',
        public_id: 'cbm/testing/eddy-current-testing/cbm/testing/eddy-current-testing/image79',
        width: 700,
        height: 564,
        format: 'png',
        created_at: '2025-08-22T16:00:11Z',
        tags: ['testing', 'eddy-current-testing', 'cbm']
      }
    ],
    'liquid-penetrant-testing': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879623/cbm/testing/liquid-penetrant-testing/cbm/testing/liquid-penetrant-testing/image80.jpg',
        public_id: 'cbm/testing/liquid-penetrant-testing/cbm/testing/liquid-penetrant-testing/image80',
        width: 830,
        height: 467,
        format: 'jpg',
        created_at: '2025-08-22T16:00:23Z',
        tags: ['testing', 'liquid-penetrant-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879641/cbm/testing/liquid-penetrant-testing/cbm/testing/liquid-penetrant-testing/image81.jpg',
        public_id: 'cbm/testing/liquid-penetrant-testing/cbm/testing/liquid-penetrant-testing/image81',
        width: 480,
        height: 270,
        format: 'jpg',
        created_at: '2025-08-22T16:00:41Z',
        tags: ['testing', 'liquid-penetrant-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879647/cbm/testing/liquid-penetrant-testing/cbm/testing/liquid-penetrant-testing/image82.jpg',
        public_id: 'cbm/testing/liquid-penetrant-testing/cbm/testing/liquid-penetrant-testing/image82',
        width: 1200,
        height: 600,
        format: 'jpg',
        created_at: '2025-08-22T16:00:47Z',
        tags: ['testing', 'liquid-penetrant-testing', 'cbm']
      }
    ],
    'magnetic-particle-testing': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879779/cbm/testing/magnetic-particle-testing/cbm/testing/magnetic-particle-testing/image83.jpg',
        public_id: 'cbm/testing/magnetic-particle-testing/cbm/testing/magnetic-particle-testing/image83',
        width: 1920,
        height: 1440,
        format: 'jpg',
        created_at: '2025-08-22T16:02:59Z',
        tags: ['testing', 'magnetic-particle-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879695/cbm/testing/magnetic-particle-testing/cbm/testing/magnetic-particle-testing/image84.jpg',
        public_id: 'cbm/testing/magnetic-particle-testing/cbm/testing/magnetic-particle-testing/image84',
        width: 1000,
        height: 500,
        format: 'jpg',
        created_at: '2025-08-22T16:01:35Z',
        tags: ['testing', 'magnetic-particle-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879662/cbm/testing/magnetic-particle-testing/cbm/testing/magnetic-particle-testing/image85.jpg',
        public_id: 'cbm/testing/magnetic-particle-testing/cbm/testing/magnetic-particle-testing/image85',
        width: 592,
        height: 446,
        format: 'jpg',
        created_at: '2025-08-22T16:01:02Z',
        tags: ['testing', 'magnetic-particle-testing', 'cbm']
      }
    ],
    'time-of-flight-diffraction': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879434/cbm/testing/time-of-flight-diffraction/cbm/testing/time-of-flight-diffraction/image65.jpg',
        public_id: 'cbm/testing/time-of-flight-diffraction/cbm/testing/time-of-flight-diffraction/image65',
        width: 800,
        height: 500,
        format: 'jpg',
        created_at: '2025-08-22T15:57:14Z',
        tags: ['testing', 'time-of-flight-diffraction', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879428/cbm/testing/time-of-flight-diffraction/cbm/testing/time-of-flight-diffraction/image66.jpg',
        public_id: 'cbm/testing/time-of-flight-diffraction/cbm/testing/time-of-flight-diffraction/image66',
        width: 727,
        height: 412,
        format: 'jpg',
        created_at: '2025-08-22T15:57:08Z',
        tags: ['testing', 'time-of-flight-diffraction', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879425/cbm/testing/time-of-flight-diffraction/cbm/testing/time-of-flight-diffraction/image67.jpg',
        public_id: 'cbm/testing/time-of-flight-diffraction/cbm/testing/time-of-flight-diffraction/image67',
        width: 760,
        height: 493,
        format: 'jpg',
        created_at: '2025-08-22T15:57:05Z',
        tags: ['testing', 'time-of-flight-diffraction', 'cbm']
      }
    ],
    'hardness-testing': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879783/cbm/testing/hardness-testing/cbm/testing/hardness-testing/image86.jpg',
        public_id: 'cbm/testing/hardness-testing/cbm/testing/hardness-testing/image86',
        width: 612,
        height: 408,
        format: 'jpg',
        created_at: '2025-08-22T16:03:03Z',
        tags: ['testing', 'hardness-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879818/cbm/testing/hardness-testing/cbm/testing/hardness-testing/image87.jpg',
        public_id: 'cbm/testing/hardness-testing/cbm/testing/hardness-testing/image87',
        width: 1080,
        height: 640,
        format: 'jpg',
        created_at: '2025-08-22T16:03:38Z',
        tags: ['testing', 'hardness-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879787/cbm/testing/hardness-testing/cbm/testing/hardness-testing/image88.jpg',
        public_id: 'cbm/testing/hardness-testing/cbm/testing/hardness-testing/image88',
        width: 606,
        height: 351,
        format: 'jpg',
        created_at: '2025-08-22T16:03:07Z',
        tags: ['testing', 'hardness-testing', 'cbm']
      }
    ],
    'lifting-gear-load-testing': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879982/cbm/testing/lifting-gear-load-testing/cbm/testing/lifting-gear-load-testing/image95.jpg',
        public_id: 'cbm/testing/lifting-gear-load-testing/cbm/testing/lifting-gear-load-testing/image95',
        width: 675,
        height: 397,
        format: 'jpg',
        created_at: '2025-08-22T16:06:22Z',
        tags: ['testing', 'lifting-gear-load-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879985/cbm/testing/lifting-gear-load-testing/cbm/testing/lifting-gear-load-testing/image96.jpg',
        public_id: 'cbm/testing/lifting-gear-load-testing/cbm/testing/lifting-gear-load-testing/image96',
        width: 743,
        height: 444,
        format: 'jpg',
        created_at: '2025-08-22T16:06:25Z',
        tags: ['testing', 'lifting-gear-load-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879985/cbm/testing/lifting-gear-load-testing/cbm/testing/lifting-gear-load-testing/image97.jpg',
        public_id: 'cbm/testing/lifting-gear-load-testing/cbm/testing/lifting-gear-load-testing/image97',
        width: 486,
        height: 323,
        format: 'jpg',
        created_at: '2025-08-22T16:06:25Z',
        tags: ['testing', 'lifting-gear-load-testing', 'cbm']
      }
    ],
    'leak-testing': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879975/cbm/testing/leak-testing/cbm/testing/leak-testing/image92.jpg',
        public_id: 'cbm/testing/leak-testing/cbm/testing/leak-testing/image92',
        width: 1920,
        height: 1281,
        format: 'jpg',
        created_at: '2025-08-22T16:06:15Z',
        tags: ['testing', 'leak-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879831/cbm/testing/leak-testing/cbm/testing/leak-testing/image93.jpg',
        public_id: 'cbm/testing/leak-testing/cbm/testing/leak-testing/image93',
        width: 1080,
        height: 720,
        format: 'jpg',
        created_at: '2025-08-22T16:03:51Z',
        tags: ['testing', 'leak-testing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879887/cbm/testing/leak-testing/cbm/testing/leak-testing/image94.jpg',
        public_id: 'cbm/testing/leak-testing/cbm/testing/leak-testing/image94',
        width: 1280,
        height: 430,
        format: 'jpg',
        created_at: '2025-08-22T16:04:47Z',
        tags: ['testing', 'leak-testing', 'cbm']
      }
    ],
    'positive-material-identification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879821/cbm/testing/positive-material-identification/cbm/testing/positive-material-identification/image89.jpg',
        public_id: 'cbm/testing/positive-material-identification/cbm/testing/positive-material-identification/image89',
        width: 700,
        height: 526,
        format: 'jpg',
        created_at: '2025-08-22T16:03:41Z',
        tags: ['testing', 'positive-material-identification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879827/cbm/testing/positive-material-identification/cbm/testing/positive-material-identification/image90.jpg',
        public_id: 'cbm/testing/positive-material-identification/cbm/testing/positive-material-identification/image90',
        width: 880,
        height: 286,
        format: 'jpg',
        created_at: '2025-08-22T16:03:47Z',
        tags: ['testing', 'positive-material-identification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879823/cbm/testing/positive-material-identification/cbm/testing/positive-material-identification/image91.jpg',
        public_id: 'cbm/testing/positive-material-identification/cbm/testing/positive-material-identification/image91',
        width: 1200,
        height: 320,
        format: 'jpg',
        created_at: '2025-08-22T16:03:43Z',
        tags: ['testing', 'positive-material-identification', 'cbm']
      }
    ]
  };

  // Fallback Cloudinary URLs for Auditing services
  private fallbackAuditingImages: { [key: string]: CloudinaryImage[] } = {
    'technical-audit': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880903/cbm/auditing/technical-audit/cbm/auditing/technical-audit/image158.jpg',
        public_id: 'cbm/auditing/technical-audit/cbm/auditing/technical-audit/image158',
        width: 845,
        height: 357,
        format: 'jpg',
        created_at: '2025-08-22T16:15:03Z',
        tags: ['auditing', 'technical-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880919/cbm/auditing/technical-audit/cbm/auditing/technical-audit/image159.jpg',
        public_id: 'cbm/auditing/technical-audit/cbm/auditing/technical-audit/image159',
        width: 615,
        height: 461,
        format: 'jpg',
        created_at: '2025-08-22T16:15:19Z',
        tags: ['auditing', 'technical-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880913/cbm/auditing/technical-audit/cbm/auditing/technical-audit/image160.jpg',
        public_id: 'cbm/auditing/technical-audit/cbm/auditing/technical-audit/image160',
        width: 643,
        height: 429,
        format: 'jpg',
        created_at: '2025-08-22T16:15:13Z',
        tags: ['auditing', 'technical-audit', 'cbm']
      }
    ],
    'operational-audit': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880934/cbm/auditing/operational-audit/cbm/auditing/operational-audit/image161.jpg',
        public_id: 'cbm/auditing/operational-audit/cbm/auditing/operational-audit/image161',
        width: 698,
        height: 403,
        format: 'jpg',
        created_at: '2025-08-22T16:15:34Z',
        tags: ['auditing', 'operational-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880945/cbm/auditing/operational-audit/cbm/auditing/operational-audit/image162.jpg',
        public_id: 'cbm/auditing/operational-audit/cbm/auditing/operational-audit/image162',
        width: 686,
        height: 422,
        format: 'jpg',
        created_at: '2025-08-22T16:15:45Z',
        tags: ['auditing', 'operational-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880964/cbm/auditing/operational-audit/cbm/auditing/operational-audit/image163.jpg',
        public_id: 'cbm/auditing/operational-audit/cbm/auditing/operational-audit/image163',
        width: 659,
        height: 371,
        format: 'jpg',
        created_at: '2025-08-22T16:15:64Z',
        tags: ['auditing', 'operational-audit', 'cbm']
      }
    ],
    'hse-health-safety-environment-audit': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881064/cbm/auditing/hse-health-safety-environment-audit/cbm/auditing/hse-health-safety-environment-audit/image164.jpg',
        public_id: 'cbm/auditing/hse-health-safety-environment-audit/cbm/auditing/hse-health-safety-environment-audit/image164',
        width: 1320,
        height: 880,
        format: 'jpg',
        created_at: '2025-08-22T16:17:44Z',
        tags: ['auditing', 'hse-health-safety-environment-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880996/cbm/auditing/hse-health-safety-environment-audit/cbm/auditing/hse-health-safety-environment-audit/image165.jpg',
        public_id: 'cbm/auditing/hse-health-safety-environment-audit/cbm/auditing/hse-health-safety-environment-audit/image165',
        width: 664,
        height: 374,
        format: 'jpg',
        created_at: '2025-08-22T16:16:36Z',
        tags: ['auditing', 'hse-health-safety-environment-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880974/cbm/auditing/hse-health-safety-environment-audit/cbm/auditing/hse-health-safety-environment-audit/image166.jpg',
        public_id: 'cbm/auditing/hse-health-safety-environment-audit/cbm/auditing/hse-health-safety-environment-audit/image166',
        width: 1024,
        height: 555,
        format: 'jpg',
        created_at: '2025-08-22T16:16:14Z',
        tags: ['auditing', 'hse-health-safety-environment-audit', 'cbm']
      }
    ],
    'fire-and-safety-audit': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881068/cbm/auditing/fire-and-safety-audit/cbm/auditing/fire-and-safety-audit/image167.jpg',
        public_id: 'cbm/auditing/fire-and-safety-audit/cbm/auditing/fire-and-safety-audit/image167',
        width: 632,
        height: 379,
        format: 'jpg',
        created_at: '2025-08-22T16:17:48Z',
        tags: ['auditing', 'fire-and-safety-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881078/cbm/auditing/fire-and-safety-audit/cbm/auditing/fire-and-safety-audit/image168.jpg',
        public_id: 'cbm/auditing/fire-and-safety-audit/cbm/auditing/fire-and-safety-audit/image168',
        width: 613,
        height: 407,
        format: 'jpg',
        created_at: '2025-08-22T16:17:58Z',
        tags: ['auditing', 'fire-and-safety-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881077/cbm/auditing/fire-and-safety-audit/cbm/auditing/fire-and-safety-audit/image169.jpg',
        public_id: 'cbm/auditing/fire-and-safety-audit/cbm/auditing/fire-and-safety-audit/image169',
        width: 636,
        height: 424,
        format: 'jpg',
        created_at: '2025-08-22T16:17:57Z',
        tags: ['auditing', 'fire-and-safety-audit', 'cbm']
      }
    ],
    'asset-integrity-management-audit': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881119/cbm/auditing/asset-integrity-management-audit/cbm/auditing/asset-integrity-management-audit/image170.jpg',
        public_id: 'cbm/auditing/asset-integrity-management-audit/cbm/auditing/asset-integrity-management-audit/image170',
        width: 779,
        height: 443,
        format: 'jpg',
        created_at: '2025-08-22T16:18:39Z',
        tags: ['auditing', 'asset-integrity-management-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881097/cbm/auditing/asset-integrity-management-audit/cbm/auditing/asset-integrity-management-audit/image171.jpg',
        public_id: 'cbm/auditing/asset-integrity-management-audit/cbm/auditing/asset-integrity-management-audit/image171',
        width: 860,
        height: 465,
        format: 'jpg',
        created_at: '2025-08-22T16:18:17Z',
        tags: ['auditing', 'asset-integrity-management-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881133/cbm/auditing/asset-integrity-management-audit/cbm/auditing/asset-integrity-management-audit/image172.jpg',
        public_id: 'cbm/auditing/asset-integrity-management-audit/cbm/auditing/asset-integrity-management-audit/image172',
        width: 684,
        height: 448,
        format: 'jpg',
        created_at: '2025-08-22T16:18:53Z',
        tags: ['auditing', 'asset-integrity-management-audit', 'cbm']
      }
    ],
    'production-import-export-audit': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881155/cbm/auditing/production-import-export-audit/cbm/auditing/production-import-export-audit/image173.jpg',
        public_id: 'cbm/auditing/production-import-export-audit/cbm/auditing/production-import-export-audit/image173',
        width: 820,
        height: 418,
        format: 'jpg',
        created_at: '2025-08-22T16:19:15Z',
        tags: ['auditing', 'production-import-export-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881587/cbm/auditing/production-import-export-audit/cbm/auditing/production-import-export-audit/image174.jpg',
        public_id: 'cbm/auditing/production-import-export-audit/cbm/auditing/production-import-export-audit/image174',
        width: 2048,
        height: 1365,
        format: 'jpg',
        created_at: '2025-08-22T16:26:27Z',
        tags: ['auditing', 'production-import-export-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881250/cbm/auditing/production-import-export-audit/cbm/auditing/production-import-export-audit/image175.jpg',
        public_id: 'cbm/auditing/production-import-export-audit/cbm/auditing/production-import-export-audit/image175',
        width: 720,
        height: 480,
        format: 'jpg',
        created_at: '2025-08-22T16:20:50Z',
        tags: ['auditing', 'production-import-export-audit', 'cbm']
      }
    ],
    'financial-audit': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881594/cbm/auditing/financial-audit/cbm/auditing/financial-audit/image176.jpg',
        public_id: 'cbm/auditing/financial-audit/cbm/auditing/financial-audit/image176',
        width: 1400,
        height: 933,
        format: 'jpg',
        created_at: '2025-08-22T16:26:34Z',
        tags: ['auditing', 'financial-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881601/cbm/auditing/financial-audit/cbm/auditing/financial-audit/image177.jpg',
        public_id: 'cbm/auditing/financial-audit/cbm/auditing/financial-audit/image177',
        width: 1000,
        height: 667,
        format: 'jpg',
        created_at: '2025-08-22T16:26:41Z',
        tags: ['auditing', 'financial-audit', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881599/cbm/auditing/financial-audit/cbm/auditing/financial-audit/image178.jpg',
        public_id: 'cbm/auditing/financial-audit/cbm/auditing/financial-audit/image178',
        width: 768,
        height: 403,
        format: 'jpg',
        created_at: '2025-08-22T16:26:39Z',
        tags: ['auditing', 'financial-audit', 'cbm']
      }
    ]
  };

  // Fallback Cloudinary URLs for CBM services
  private fallbackCBMImages: { [key: string]: CloudinaryImage[] } = {
    'vibration-analysis-balancing': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879993/cbm/cbm/vibration-analysis-balancing/cbm/cbm/vibration-analysis-balancing/image100.jpg',
        public_id: 'cbm/cbm/vibration-analysis-balancing/cbm/cbm/vibration-analysis-balancing/image100',
        width: 877,
        height: 344,
        format: 'jpg',
        created_at: '2025-08-22T15:59:53Z',
        tags: ['cbm', 'vibration-analysis-balancing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880030/cbm/cbm/vibration-analysis-balancing/cbm/cbm/vibration-analysis-balancing/image98.jpg',
        public_id: 'cbm/cbm/vibration-analysis-balancing/cbm/cbm/vibration-analysis-balancing/image98',
        width: 1000,
        height: 667,
        format: 'jpg',
        created_at: '2025-08-22T16:00:30Z',
        tags: ['cbm', 'vibration-analysis-balancing', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755879989/cbm/cbm/vibration-analysis-balancing/cbm/cbm/vibration-analysis-balancing/image99.jpg',
        public_id: 'cbm/cbm/vibration-analysis-balancing/cbm/cbm/vibration-analysis-balancing/image99',
        width: 1000,
        height: 665,
        format: 'jpg',
        created_at: '2025-08-22T16:00:29Z',
        tags: ['cbm', 'vibration-analysis-balancing', 'cbm']
      }
    ],
    'laser-shaft-alignment': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880035/cbm/cbm/laser-shaft-alignment/cbm/cbm/laser-shaft-alignment/image101.jpg',
        public_id: 'cbm/cbm/laser-shaft-alignment/cbm/cbm/laser-shaft-alignment/image101',
        width: 882,
        height: 402,
        format: 'jpg',
        created_at: '2025-08-22T16:00:35Z',
        tags: ['cbm', 'laser-shaft-alignment', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880041/cbm/cbm/laser-shaft-alignment/cbm/cbm/laser-shaft-alignment/image102.jpg',
        public_id: 'cbm/cbm/laser-shaft-alignment/cbm/cbm/laser-shaft-alignment/image102',
        width: 1024,
        height: 768,
        format: 'jpg',
        created_at: '2025-08-22T16:00:41Z',
        tags: ['cbm', 'laser-shaft-alignment', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880038/cbm/cbm/laser-shaft-alignment/cbm/cbm/laser-shaft-alignment/image103.jpg',
        public_id: 'cbm/cbm/laser-shaft-alignment/cbm/cbm/laser-shaft-alignment/image103',
        width: 544,
        height: 340,
        format: 'jpg',
        created_at: '2025-08-22T16:00:38Z',
        tags: ['cbm', 'laser-shaft-alignment', 'cbm']
      }
    ],
    'remote-cbm-iot-cloud': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880056/cbm/cbm/remote-cbm-iot-cloud/cbm/cbm/remote-cbm-iot-cloud/image104.jpg',
        public_id: 'cbm/cbm/remote-cbm-iot-cloud/cbm/cbm/remote-cbm-iot-cloud/image104',
        width: 600,
        height: 400,
        format: 'jpg',
        created_at: '2025-08-22T16:00:56Z',
        tags: ['cbm', 'remote-cbm-iot-cloud', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880049/cbm/cbm/remote-cbm-iot-cloud/cbm/cbm/remote-cbm-iot-cloud/image105.jpg',
        public_id: 'cbm/cbm/remote-cbm-iot-cloud/cbm/cbm/remote-cbm-iot-cloud/image105',
        width: 800,
        height: 372,
        format: 'jpg',
        created_at: '2025-08-22T16:00:49Z',
        tags: ['cbm', 'remote-cbm-iot-cloud', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880055/cbm/cbm/remote-cbm-iot-cloud/cbm/cbm/remote-cbm-iot-cloud/image106.jpg',
        public_id: 'cbm/cbm/remote-cbm-iot-cloud/cbm/cbm/remote-cbm-iot-cloud/image106',
        width: 627,
        height: 404,
        format: 'jpg',
        created_at: '2025-08-22T16:00:55Z',
        tags: ['cbm', 'remote-cbm-iot-cloud', 'cbm']
      }
    ],
    'infrared-thermography': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880143/cbm/cbm/infrared-thermography/cbm/cbm/infrared-thermography/image107.jpg',
        public_id: 'cbm/cbm/infrared-thermography/cbm/cbm/infrared-thermography/image107',
        width: 1500,
        height: 1000,
        format: 'jpg',
        created_at: '2025-08-22T16:02:23Z',
        tags: ['cbm', 'infrared-thermography', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880128/cbm/cbm/infrared-thermography/cbm/cbm/infrared-thermography/image108.jpg',
        public_id: 'cbm/cbm/infrared-thermography/cbm/cbm/infrared-thermography/image108',
        width: 950,
        height: 559,
        format: 'jpg',
        created_at: '2025-08-22T16:02:08Z',
        tags: ['cbm', 'infrared-thermography', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880079/cbm/cbm/infrared-thermography/cbm/cbm/infrared-thermography/image109.jpg',
        public_id: 'cbm/cbm/infrared-thermography/cbm/cbm/infrared-thermography/image109',
        width: 606,
        height: 233,
        format: 'jpg',
        created_at: '2025-08-22T16:01:19Z',
        tags: ['cbm', 'infrared-thermography', 'cbm']
      }
    ],
    'lubrication-oil-analysis': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880155/cbm/cbm/lubrication-oil-analysis/cbm/cbm/lubrication-oil-analysis/image110.jpg',
        public_id: 'cbm/cbm/lubrication-oil-analysis/cbm/cbm/lubrication-oil-analysis/image110',
        width: 759,
        height: 400,
        format: 'jpg',
        created_at: '2025-08-22T16:02:35Z',
        tags: ['cbm', 'lubrication-oil-analysis', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880195/cbm/cbm/lubrication-oil-analysis/cbm/cbm/lubrication-oil-analysis/image111.jpg',
        public_id: 'cbm/cbm/lubrication-oil-analysis/cbm/cbm/lubrication-oil-analysis/image111',
        width: 950,
        height: 559,
        format: 'jpg',
        created_at: '2025-08-22T16:03:15Z',
        tags: ['cbm', 'lubrication-oil-analysis', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880159/cbm/cbm/lubrication-oil-analysis/cbm/cbm/lubrication-oil-analysis/image112.jpg',
        public_id: 'cbm/cbm/lubrication-oil-analysis/cbm/cbm/lubrication-oil-analysis/image112',
        width: 779,
        height: 452,
        format: 'jpg',
        created_at: '2025-08-22T16:02:39Z',
        tags: ['cbm', 'lubrication-oil-analysis', 'cbm']
      }
    ]
  };

  // Fallback Cloudinary URLs for Inspection services
  private fallbackInspectionImages: { [key: string]: CloudinaryImage[] } = {
    'third-party-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880214/cbm/inspection/third-party-inspection/cbm/inspection/third-party-inspection/image113.jpg',
        public_id: 'cbm/inspection/third-party-inspection/cbm/inspection/third-party-inspection/image113',
        width: 593,
        height: 396,
        format: 'jpg',
        created_at: '2025-08-22T16:03:34Z',
        tags: ['inspection', 'third-party-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880237/cbm/inspection/third-party-inspection/cbm/inspection/third-party-inspection/image114.jpg',
        public_id: 'cbm/inspection/third-party-inspection/cbm/inspection/third-party-inspection/image114',
        width: 753,
        height: 445,
        format: 'jpg',
        created_at: '2025-08-22T16:03:57Z',
        tags: ['inspection', 'third-party-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880235/cbm/inspection/third-party-inspection/cbm/inspection/third-party-inspection/image115.jpg',
        public_id: 'cbm/inspection/third-party-inspection/cbm/inspection/third-party-inspection/image115',
        width: 626,
        height: 417,
        format: 'jpg',
        created_at: '2025-08-22T16:03:55Z',
        tags: ['inspection', 'third-party-inspection', 'cbm']
      }
    ],
    'welding-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880300/cbm/inspection/welding-inspection/cbm/inspection/welding-inspection/image125.jpg',
        public_id: 'cbm/inspection/welding-inspection/cbm/inspection/welding-inspection/image125',
        width: 800,
        height: 450,
        format: 'jpg',
        created_at: '2025-08-22T16:05:00Z',
        tags: ['inspection', 'welding-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880309/cbm/inspection/welding-inspection/cbm/inspection/welding-inspection/image126.jpg',
        public_id: 'cbm/inspection/welding-inspection/cbm/inspection/welding-inspection/image126',
        width: 1024,
        height: 582,
        format: 'jpg',
        created_at: '2025-08-22T16:05:09Z',
        tags: ['inspection', 'welding-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880318/cbm/inspection/welding-inspection/cbm/inspection/welding-inspection/image127.jpg',
        public_id: 'cbm/inspection/welding-inspection/cbm/inspection/welding-inspection/image127',
        width: 626,
        height: 417,
        format: 'jpg',
        created_at: '2025-08-22T16:05:18Z',
        tags: ['inspection', 'welding-inspection', 'cbm']
      }
    ],
    'asset-integrity-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880264/cbm/inspection/asset-integrity-inspection/cbm/inspection/asset-integrity-inspection/image116.jpg',
        public_id: 'cbm/inspection/asset-integrity-inspection/cbm/inspection/asset-integrity-inspection/image116',
        width: 900,
        height: 675,
        format: 'jpg',
        created_at: '2025-08-22T16:04:24Z',
        tags: ['inspection', 'asset-integrity-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880270/cbm/inspection/asset-integrity-inspection/cbm/inspection/asset-integrity-inspection/image117.jpg',
        public_id: 'cbm/inspection/asset-integrity-inspection/cbm/inspection/asset-integrity-inspection/image117',
        width: 599,
        height: 337,
        format: 'jpg',
        created_at: '2025-08-22T16:04:30Z',
        tags: ['inspection', 'asset-integrity-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880266/cbm/inspection/asset-integrity-inspection/cbm/inspection/asset-integrity-inspection/image118.jpg',
        public_id: 'cbm/inspection/asset-integrity-inspection/cbm/inspection/asset-integrity-inspection/image118',
        width: 785,
        height: 419,
        format: 'jpg',
        created_at: '2025-08-22T16:04:26Z',
        tags: ['inspection', 'asset-integrity-inspection', 'cbm']
      }
    ],
    'environmental-monitoring-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880273/cbm/inspection/environmental-monitoring-inspection/cbm/inspection/environmental-monitoring-inspection/image119.jpg',
        public_id: 'cbm/inspection/environmental-monitoring-inspection/cbm/inspection/environmental-monitoring-inspection/image119',
        width: 1080,
        height: 603,
        format: 'jpg',
        created_at: '2025-08-22T16:04:33Z',
        tags: ['inspection', 'environmental-monitoring-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880281/cbm/inspection/environmental-monitoring-inspection/cbm/inspection/environmental-monitoring-inspection/image120.jpg',
        public_id: 'cbm/inspection/environmental-monitoring-inspection/cbm/inspection/environmental-monitoring-inspection/image120',
        width: 757,
        height: 436,
        format: 'jpg',
        created_at: '2025-08-22T16:04:41Z',
        tags: ['inspection', 'environmental-monitoring-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880278/cbm/inspection/environmental-monitoring-inspection/cbm/inspection/environmental-monitoring-inspection/image121.jpg',
        public_id: 'cbm/inspection/environmental-monitoring-inspection/cbm/inspection/environmental-monitoring-inspection/image121',
        width: 637,
        height: 373,
        format: 'jpg',
        created_at: '2025-08-22T16:04:38Z',
        tags: ['inspection', 'environmental-monitoring-inspection', 'cbm']
      }
    ],
    'risk-based-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880290/cbm/inspection/risk-based-inspection/cbm/inspection/risk-based-inspection/image122.jpg',
        public_id: 'cbm/inspection/risk-based-inspection/cbm/inspection/risk-based-inspection/image122',
        width: 731,
        height: 409,
        format: 'jpg',
        created_at: '2025-08-22T16:04:50Z',
        tags: ['inspection', 'risk-based-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880285/cbm/inspection/risk-based-inspection/cbm/inspection/risk-based-inspection/image123.jpg',
        public_id: 'cbm/inspection/risk-based-inspection/cbm/inspection/risk-based-inspection/image123',
        width: 900,
        height: 506,
        format: 'jpg',
        created_at: '2025-08-22T16:04:45Z',
        tags: ['inspection', 'risk-based-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880297/cbm/inspection/risk-based-inspection/cbm/inspection/risk-based-inspection/image124.jpg',
        public_id: 'cbm/inspection/risk-based-inspection/cbm/inspection/risk-based-inspection/image124',
        width: 712,
        height: 432,
        format: 'jpg',
        created_at: '2025-08-22T16:04:57Z',
        tags: ['inspection', 'risk-based-inspection', 'cbm']
      }
    ],
    'Mechanical-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880321/cbm/inspection/Mechanical-inspection/cbm/inspection/Mechanical-inspection/image128.jpg',
        public_id: 'cbm/inspection/Mechanical-inspection/cbm/inspection/Mechanical-inspection/image128',
        width: 1130,
        height: 730,
        format: 'jpg',
        created_at: '2025-08-22T16:05:21Z',
        tags: ['inspection', 'Mechanical-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880331/cbm/inspection/Mechanical-inspection/cbm/inspection/Mechanical-inspection/image129.jpg',
        public_id: 'cbm/inspection/Mechanical-inspection/cbm/inspection/Mechanical-inspection/image129',
        width: 960,
        height: 600,
        format: 'jpg',
        created_at: '2025-08-22T16:05:31Z',
        tags: ['inspection', 'Mechanical-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880331/cbm/inspection/Mechanical-inspection/cbm/inspection/Mechanical-inspection/image130.jpg',
        public_id: 'cbm/inspection/Mechanical-inspection/cbm/inspection/Mechanical-inspection/image130',
        width: 622,
        height: 389,
        format: 'jpg',
        created_at: '2025-08-22T16:05:31Z',
        tags: ['inspection', 'Mechanical-inspection', 'cbm']
      }
    ],
    'painting-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880334/cbm/inspection/painting-inspection/cbm/inspection/painting-inspection/image131.jpg',
        public_id: 'cbm/inspection/painting-inspection/cbm/inspection/painting-inspection/image131',
        width: 612,
        height: 436,
        format: 'jpg',
        created_at: '2025-08-22T16:05:34Z',
        tags: ['inspection', 'painting-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880333/cbm/inspection/painting-inspection/cbm/inspection/painting-inspection/image132.jpg',
        public_id: 'cbm/inspection/painting-inspection/cbm/inspection/painting-inspection/image132',
        width: 612,
        height: 408,
        format: 'jpg',
        created_at: '2025-08-22T16:05:33Z',
        tags: ['inspection', 'painting-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880335/cbm/inspection/painting-inspection/cbm/inspection/painting-inspection/image133.jpg',
        public_id: 'cbm/inspection/painting-inspection/cbm/inspection/painting-inspection/image133',
        width: 460,
        height: 365,
        format: 'jpg',
        created_at: '2025-08-22T16:05:35Z',
        tags: ['inspection', 'painting-inspection', 'cbm']
      }
    ],
    'electrical-instrumentation-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880396/cbm/inspection/electrical-instrumentation-inspection/cbm/inspection/electrical-instrumentation-inspection/image134.jpg',
        public_id: 'cbm/inspection/electrical-instrumentation-inspection/cbm/inspection/electrical-instrumentation-inspection/image134',
        width: 1170,
        height: 740,
        format: 'jpg',
        created_at: '2025-08-22T16:06:36Z',
        tags: ['inspection', 'electrical-instrumentation-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880351/cbm/inspection/electrical-instrumentation-inspection/cbm/inspection/electrical-instrumentation-inspection/image135.jpg',
        public_id: 'cbm/inspection/electrical-instrumentation-inspection/cbm/inspection/electrical-instrumentation-inspection/image135',
        width: 660,
        height: 371,
        format: 'jpg',
        created_at: '2025-08-22T16:05:51Z',
        tags: ['inspection', 'electrical-instrumentation-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880379/cbm/inspection/electrical-instrumentation-inspection/cbm/inspection/electrical-instrumentation-inspection/image136.jpg',
        public_id: 'cbm/inspection/electrical-instrumentation-inspection/cbm/inspection/electrical-instrumentation-inspection/image136',
        width: 750,
        height: 422,
        format: 'jpg',
        created_at: '2025-08-22T16:06:19Z',
        tags: ['inspection', 'electrical-instrumentation-inspection', 'cbm']
      }
    ],
    'gearbox-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880401/cbm/inspection/gearbox-inspection/cbm/inspection/gearbox-inspection/image137.jpg',
        public_id: 'cbm/inspection/gearbox-inspection/cbm/inspection/gearbox-inspection/image137',
        width: 689,
        height: 422,
        format: 'jpg',
        created_at: '2025-08-22T16:06:41Z',
        tags: ['inspection', 'gearbox-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880407/cbm/inspection/gearbox-inspection/cbm/inspection/gearbox-inspection/image138.jpg',
        public_id: 'cbm/inspection/gearbox-inspection/cbm/inspection/gearbox-inspection/image138',
        width: 722,
        height: 408,
        format: 'jpg',
        created_at: '2025-08-22T16:06:47Z',
        tags: ['inspection', 'gearbox-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880520/cbm/inspection/gearbox-inspection/cbm/inspection/gearbox-inspection/image139.jpg',
        public_id: 'cbm/inspection/gearbox-inspection/cbm/inspection/gearbox-inspection/image139',
        width: 2020,
        height: 1347,
        format: 'jpg',
        created_at: '2025-08-22T16:08:40Z',
        tags: ['inspection', 'gearbox-inspection', 'cbm']
      }
    ],
    'topside-fitness-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880524/cbm/inspection/topside-fitness-inspection/cbm/inspection/topside-fitness-inspection/image140.jpg',
        public_id: 'cbm/inspection/topside-fitness-inspection/cbm/inspection/topside-fitness-inspection/image140',
        width: 715,
        height: 402,
        format: 'jpg',
        created_at: '2025-08-22T16:08:44Z',
        tags: ['inspection', 'topside-fitness-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880531/cbm/inspection/topside-fitness-inspection/cbm/inspection/topside-fitness-inspection/image141.jpg',
        public_id: 'cbm/inspection/topside-fitness-inspection/cbm/inspection/topside-fitness-inspection/image141',
        width: 800,
        height: 599,
        format: 'jpg',
        created_at: '2025-08-22T16:08:51Z',
        tags: ['inspection', 'topside-fitness-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880532/cbm/inspection/topside-fitness-inspection/cbm/inspection/topside-fitness-inspection/image142.jpg',
        public_id: 'cbm/inspection/topside-fitness-inspection/cbm/inspection/topside-fitness-inspection/image142',
        width: 633,
        height: 415,
        format: 'jpg',
        created_at: '2025-08-22T16:08:52Z',
        tags: ['inspection', 'topside-fitness-inspection', 'cbm']
      }
    ],
    'hse-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880536/cbm/inspection/hse-inspection/cbm/inspection/hse-inspection/image143.jpg',
        public_id: 'cbm/inspection/hse-inspection/cbm/inspection/hse-inspection/image143',
        width: 753,
        height: 424,
        format: 'jpg',
        created_at: '2025-08-22T16:08:56Z',
        tags: ['inspection', 'hse-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880534/cbm/inspection/hse-inspection/cbm/inspection/hse-inspection/image144.jpg',
        public_id: 'cbm/inspection/hse-inspection/cbm/inspection/hse-inspection/image144',
        width: 612,
        height: 408,
        format: 'jpg',
        created_at: '2025-08-22T16:08:54Z',
        tags: ['inspection', 'hse-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880537/cbm/inspection/hse-inspection/cbm/inspection/hse-inspection/image145.jpg',
        public_id: 'cbm/inspection/hse-inspection/cbm/inspection/hse-inspection/image145',
        width: 698,
        height: 406,
        format: 'jpg',
        created_at: '2025-08-22T16:08:57Z',
        tags: ['inspection', 'hse-inspection', 'cbm']
      }
    ],
    'underground-mine-shaft-safety-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880541/cbm/inspection/underground-mine-shaft-safety-inspection/cbm/inspection/underground-mine-shaft-safety-inspection/image146.jpg',
        public_id: 'cbm/inspection/underground-mine-shaft-safety-inspection/cbm/inspection/underground-mine-shaft-safety-inspection/image146',
        width: 748,
        height: 418,
        format: 'jpg',
        created_at: '2025-08-22T16:09:01Z',
        tags: ['inspection', 'underground-mine-shaft-safety-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880546/cbm/inspection/underground-mine-shaft-safety-inspection/cbm/inspection/underground-mine-shaft-safety-inspection/image147.jpg',
        public_id: 'cbm/inspection/underground-mine-shaft-safety-inspection/cbm/inspection/underground-mine-shaft-safety-inspection/image147',
        width: 570,
        height: 437,
        format: 'jpg',
        created_at: '2025-08-22T16:09:06Z',
        tags: ['inspection', 'underground-mine-shaft-safety-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880614/cbm/inspection/underground-mine-shaft-safety-inspection/cbm/inspection/underground-mine-shaft-safety-inspection/image148.jpg',
        public_id: 'cbm/inspection/underground-mine-shaft-safety-inspection/cbm/inspection/underground-mine-shaft-safety-inspection/image148',
        width: 1800,
        height: 1200,
        format: 'jpg',
        created_at: '2025-08-22T16:10:14Z',
        tags: ['inspection', 'underground-mine-shaft-safety-inspection', 'cbm']
      }
    ],
    'on-site-laboratory-sampling': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880645/cbm/inspection/on-site-laboratory-sampling/cbm/inspection/on-site-laboratory-sampling/image149.jpg',
        public_id: 'cbm/inspection/on-site-laboratory-sampling/cbm/inspection/on-site-laboratory-sampling/image149',
        width: 800,
        height: 451,
        format: 'jpg',
        created_at: '2025-08-22T16:10:45Z',
        tags: ['inspection', 'on-site-laboratory-sampling', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880637/cbm/inspection/on-site-laboratory-sampling/cbm/inspection/on-site-laboratory-sampling/image150.jpg',
        public_id: 'cbm/inspection/on-site-laboratory-sampling/cbm/inspection/on-site-laboratory-sampling/image150',
        width: 775,
        height: 425,
        format: 'jpg',
        created_at: '2025-08-22T16:10:37Z',
        tags: ['inspection', 'on-site-laboratory-sampling', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880628/cbm/inspection/on-site-laboratory-sampling/cbm/inspection/on-site-laboratory-sampling/image151.jpg',
        public_id: 'cbm/inspection/on-site-laboratory-sampling/cbm/inspection/on-site-laboratory-sampling/image151',
        width: 559,
        height: 373,
        format: 'jpg',
        created_at: '2025-08-22T16:10:28Z',
        tags: ['inspection', 'on-site-laboratory-sampling', 'cbm']
      }
    ],
    'marine-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880651/cbm/inspection/marine-inspection/cbm/inspection/marine-inspection/image152.jpg',
        public_id: 'cbm/inspection/marine-inspection/cbm/inspection/marine-inspection/image152',
        width: 653,
        height: 435,
        format: 'jpg',
        created_at: '2025-08-22T16:10:51Z',
        tags: ['inspection', 'marine-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880656/cbm/inspection/marine-inspection/cbm/inspection/marine-inspection/image153.jpg',
        public_id: 'cbm/inspection/marine-inspection/cbm/inspection/marine-inspection/image153',
        width: 667,
        height: 367,
        format: 'jpg',
        created_at: '2025-08-22T16:10:56Z',
        tags: ['inspection', 'marine-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880655/cbm/inspection/marine-inspection/cbm/inspection/marine-inspection/image154.jpg',
        public_id: 'cbm/inspection/marine-inspection/cbm/inspection/marine-inspection/image154',
        width: 630,
        height: 420,
        format: 'jpg',
        created_at: '2025-08-22T16:10:55Z',
        tags: ['inspection', 'marine-inspection', 'cbm']
      }
    ],
    'pre-shipment-inspection': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880896/cbm/inspection/pre-shipment-inspection/cbm/inspection/pre-shipment-inspection/image155.jpg',
        public_id: 'cbm/inspection/pre-shipment-inspection/cbm/inspection/pre-shipment-inspection/image155',
        width: 2048,
        height: 1365,
        format: 'jpg',
        created_at: '2025-08-22T16:14:56Z',
        tags: ['inspection', 'pre-shipment-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880659/cbm/inspection/pre-shipment-inspection/cbm/inspection/pre-shipment-inspection/image156.jpg',
        public_id: 'cbm/inspection/pre-shipment-inspection/cbm/inspection/pre-shipment-inspection/image156',
        width: 590,
        height: 431,
        format: 'jpg',
        created_at: '2025-08-22T16:10:59Z',
        tags: ['inspection', 'pre-shipment-inspection', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755880716/cbm/inspection/pre-shipment-inspection/cbm/inspection/pre-shipment-inspection/image157.jpg',
        public_id: 'cbm/inspection/pre-shipment-inspection/cbm/inspection/pre-shipment-inspection/image157',
        width: 1200,
        height: 800,
        format: 'jpg',
        created_at: '2025-08-22T16:11:56Z',
        tags: ['inspection', 'pre-shipment-inspection', 'cbm']
      }
    ]
  };

  // Fallback Cloudinary URLs for Verification & Certification services
  private fallbackVerificationCertificationImages: { [key: string]: CloudinaryImage[] } = {
    'production-import-export-verification-certification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881749/cbm/verification-certification/production-import-export-verification-certification/cbm/verification-certification/production-import-export-verification-certification/image179.jpg',
        public_id: 'cbm/verification-certification/production-import-export-verification-certification/cbm/verification-certification/production-import-export-verification-certification/image179',
        width: 1915,
        height: 1274,
        format: 'jpg',
        created_at: '2025-08-22T16:29:09Z',
        tags: ['verification-certification', 'production-import-export-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881614/cbm/verification-certification/production-import-export-verification-certification/cbm/verification-certification/production-import-export-verification-certification/image180.jpg',
        public_id: 'cbm/verification-certification/production-import-export-verification-certification/cbm/verification-certification/production-import-export-verification-certification/image180',
        width: 640,
        height: 360,
        format: 'jpg',
        created_at: '2025-08-22T16:26:54Z',
        tags: ['verification-certification', 'production-import-export-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881621/cbm/verification-certification/production-import-export-verification-certification/cbm/verification-certification/production-import-export-verification-certification/image181.jpg',
        public_id: 'cbm/verification-certification/production-import-export-verification-certification/cbm/verification-certification/production-import-export-verification-certification/image181',
        width: 633,
        height: 421,
        format: 'jpg',
        created_at: '2025-08-22T16:27:01Z',
        tags: ['verification-certification', 'production-import-export-verification-certification', 'cbm']
      }
    ],
    'asset-integrity-fitness-verification-certification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881771/cbm/verification-certification/asset-integrity-fitness-verification-certification/cbm/verification-certification/asset-integrity-fitness-verification-certification/image182.jpg',
        public_id: 'cbm/verification-certification/asset-integrity-fitness-verification-certification/cbm/verification-certification/asset-integrity-fitness-verification-certification/image182',
        width: 800,
        height: 449,
        format: 'jpg',
        created_at: '2025-08-22T16:29:31Z',
        tags: ['verification-certification', 'asset-integrity-fitness-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881767/cbm/verification-certification/asset-integrity-fitness-verification-certification/cbm/verification-certification/asset-integrity-fitness-verification-certification/image183.jpg',
        public_id: 'cbm/verification-certification/asset-integrity-fitness-verification-certification/cbm/verification-certification/asset-integrity-fitness-verification-certification/image183',
        width: 634,
        height: 356,
        format: 'jpg',
        created_at: '2025-08-22T16:29:27Z',
        tags: ['verification-certification', 'asset-integrity-fitness-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881760/cbm/verification-certification/asset-integrity-fitness-verification-certification/cbm/verification-certification/asset-integrity-fitness-verification-certification/image184.jpg',
        public_id: 'cbm/verification-certification/asset-integrity-fitness-verification-certification/cbm/verification-certification/asset-integrity-fitness-verification-certification/image184',
        width: 607,
        height: 341,
        format: 'jpg',
        created_at: '2025-08-22T16:29:20Z',
        tags: ['verification-certification', 'asset-integrity-fitness-verification-certification', 'cbm']
      }
    ],
    'environmental-damage-verification-certification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881780/cbm/verification-certification/environmental-damage-verification-certification/cbm/verification-certification/environmental-damage-verification-certification/image185.jpg',
        public_id: 'cbm/verification-certification/environmental-damage-verification-certification/cbm/verification-certification/environmental-damage-verification-certification/image185',
        width: 769,
        height: 383,
        format: 'jpg',
        created_at: '2025-08-22T16:29:40Z',
        tags: ['verification-certification', 'environmental-damage-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881778/cbm/verification-certification/environmental-damage-verification-certification/cbm/verification-certification/environmental-damage-verification-certification/image186.jpg',
        public_id: 'cbm/verification-certification/environmental-damage-verification-certification/cbm/verification-certification/environmental-damage-verification-certification/image186',
        width: 397,
        height: 264,
        format: 'jpg',
        created_at: '2025-08-22T16:29:38Z',
        tags: ['verification-certification', 'environmental-damage-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881787/cbm/verification-certification/environmental-damage-verification-certification/cbm/verification-certification/environmental-damage-verification-certification/image187.jpg',
        public_id: 'cbm/verification-certification/environmental-damage-verification-certification/cbm/verification-certification/environmental-damage-verification-certification/image187',
        width: 652,
        height: 367,
        format: 'jpg',
        created_at: '2025-08-22T16:29:47Z',
        tags: ['verification-certification', 'environmental-damage-verification-certification', 'cbm']
      }
    ],
    'pressure-vessels-boilers-verification-certification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881793/cbm/verification-certification/pressure-vessels-boilers-verification-certification/cbm/verification-certification/pressure-vessels-boilers-verification-certification/image188.jpg',
        public_id: 'cbm/verification-certification/pressure-vessels-boilers-verification-certification/cbm/verification-certification/pressure-vessels-boilers-verification-certification/image188',
        width: 800,
        height: 535,
        format: 'jpg',
        created_at: '2025-08-22T16:29:53Z',
        tags: ['verification-certification', 'pressure-vessels-boilers-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881796/cbm/verification-certification/pressure-vessels-boilers-verification-certification/cbm/verification-certification/pressure-vessels-boilers-verification-certification/image189.jpg',
        public_id: 'cbm/verification-certification/pressure-vessels-boilers-verification-certification/cbm/verification-certification/pressure-vessels-boilers-verification-certification/image189',
        width: 737,
        height: 388,
        format: 'jpg',
        created_at: '2025-08-22T16:29:56Z',
        tags: ['verification-certification', 'pressure-vessels-boilers-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881800/cbm/verification-certification/pressure-vessels-boilers-verification-certification/cbm/verification-certification/pressure-vessels-boilers-verification-certification/image190.jpg',
        public_id: 'cbm/verification-certification/pressure-vessels-boilers-verification-certification/cbm/verification-certification/pressure-vessels-boilers-verification-certification/image190',
        width: 698,
        height: 418,
        format: 'jpg',
        created_at: '2025-08-22T16:30:00Z',
        tags: ['verification-certification', 'pressure-vessels-boilers-verification-certification', 'cbm']
      }
    ],
    'turbines-generators-engines-compressors-verification-certification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881805/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/image191.jpg',
        public_id: 'cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/image191',
        width: 1080,
        height: 720,
        format: 'jpg',
        created_at: '2025-08-22T16:30:05Z',
        tags: ['verification-certification', 'turbines-generators-engines-compressors-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881805/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/image192.jpg',
        public_id: 'cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/image192',
        width: 825,
        height: 430,
        format: 'jpg',
        created_at: '2025-08-22T16:30:05Z',
        tags: ['verification-certification', 'turbines-generators-engines-compressors-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881809/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/image193.jpg',
        public_id: 'cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/cbm/verification-certification/turbines-generators-engines-compressors-verification-certification/image193',
        width: 635,
        height: 398,
        format: 'jpg',
        created_at: '2025-08-22T16:30:09Z',
        tags: ['verification-certification', 'turbines-generators-engines-compressors-verification-certification', 'cbm']
      }
    ],
    'lifting-gear-load-verification-certification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881812/cbm/verification-certification/lifting-gear-load-verification-certification/cbm/verification-certification/lifting-gear-load-verification-certification/image194.jpg',
        public_id: 'cbm/verification-certification/lifting-gear-load-verification-certification/cbm/verification-certification/lifting-gear-load-verification-certification/image194',
        width: 640,
        height: 450,
        format: 'jpg',
        created_at: '2025-08-22T16:30:12Z',
        tags: ['verification-certification', 'lifting-gear-load-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881814/cbm/verification-certification/lifting-gear-load-verification-certification/cbm/verification-certification/lifting-gear-load-verification-certification/image195.jpg',
        public_id: 'cbm/verification-certification/lifting-gear-load-verification-certification/cbm/verification-certification/lifting-gear-load-verification-certification/image195',
        width: 636,
        height: 424,
        format: 'jpg',
        created_at: '2025-08-22T16:30:14Z',
        tags: ['verification-certification', 'lifting-gear-load-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881813/cbm/verification-certification/lifting-gear-load-verification-certification/cbm/verification-certification/lifting-gear-load-verification-certification/image196.jpg',
        public_id: 'cbm/verification-certification/lifting-gear-load-verification-certification/cbm/verification-certification/lifting-gear-load-verification-certification/image196',
        width: 612,
        height: 362,
        format: 'jpg',
        created_at: '2025-08-22T16:30:13Z',
        tags: ['verification-certification', 'lifting-gear-load-verification-certification', 'cbm']
      }
    ],
    'pipeline-integrity-verification-certification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881821/cbm/verification-certification/pipeline-integrity-verification-certification/cbm/verification-certification/pipeline-integrity-verification-certification/image197.jpg',
        public_id: 'cbm/verification-certification/pipeline-integrity-verification-certification/cbm/verification-certification/pipeline-integrity-verification-certification/image197',
        width: 737,
        height: 495,
        format: 'jpg',
        created_at: '2025-08-22T16:30:21Z',
        tags: ['verification-certification', 'pipeline-integrity-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881816/cbm/verification-certification/pipeline-integrity-verification-certification/cbm/verification-certification/pipeline-integrity-verification-certification/image198.jpg',
        public_id: 'cbm/verification-certification/pipeline-integrity-verification-certification/cbm/verification-certification/pipeline-integrity-verification-certification/image198',
        width: 612,
        height: 612,
        format: 'jpg',
        created_at: '2025-08-22T16:30:16Z',
        tags: ['verification-certification', 'pipeline-integrity-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881823/cbm/verification-certification/pipeline-integrity-verification-certification/cbm/verification-certification/pipeline-integrity-verification-certification/image199.jpg',
        public_id: 'cbm/verification-certification/pipeline-integrity-verification-certification/cbm/verification-certification/pipeline-integrity-verification-certification/image199',
        width: 724,
        height: 399,
        format: 'jpg',
        created_at: '2025-08-22T16:30:23Z',
        tags: ['verification-certification', 'pipeline-integrity-verification-certification', 'cbm']
      }
    ],
    'industrial-structural-health-monitoring-fitness-verification-certification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881829/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/image200.jpg',
        public_id: 'cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/image200',
        width: 1000,
        height: 667,
        format: 'jpg',
        created_at: '2025-08-22T16:30:29Z',
        tags: ['verification-certification', 'industrial-structural-health-monitoring-fitness-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881832/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/image201.jpg',
        public_id: 'cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/image201',
        width: 796,
        height: 426,
        format: 'jpg',
        created_at: '2025-08-22T16:30:32Z',
        tags: ['verification-certification', 'industrial-structural-health-monitoring-fitness-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881837/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/image202.jpg',
        public_id: 'cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/cbm/verification-certification/industrial-structural-health-monitoring-fitness-verification-certification/image202',
        width: 742,
        height: 449,
        format: 'jpg',
        created_at: '2025-08-22T16:30:37Z',
        tags: ['verification-certification', 'industrial-structural-health-monitoring-fitness-verification-certification', 'cbm']
      }
    ],
    'storage-tank-facilities-verification-certification': [
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881843/cbm/verification-certification/storage-tank-facilities-verification-certification/cbm/verification-certification/storage-tank-facilities-verification-certification/image203.jpg',
        public_id: 'cbm/verification-certification/storage-tank-facilities-verification-certification/cbm/verification-certification/storage-tank-facilities-verification-certification/image203',
        width: 835,
        height: 443,
        format: 'jpg',
        created_at: '2025-08-22T16:30:43Z',
        tags: ['verification-certification', 'storage-tank-facilities-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881855/cbm/verification-certification/storage-tank-facilities-verification-certification/cbm/verification-certification/storage-tank-facilities-verification-certification/image204.jpg',
        public_id: 'cbm/verification-certification/storage-tank-facilities-verification-certification/cbm/verification-certification/storage-tank-facilities-verification-certification/image204',
        width: 682,
        height: 454,
        format: 'jpg',
        created_at: '2025-08-22T16:30:55Z',
        tags: ['verification-certification', 'storage-tank-facilities-verification-certification', 'cbm']
      },
      {
        url: 'https://res.cloudinary.com/docyipoze/image/upload/v1755881856/cbm/verification-certification/storage-tank-facilities-verification-certification/cbm/verification-certification/storage-tank-facilities-verification-certification/image205.jpg',
        public_id: 'cbm/verification-certification/storage-tank-facilities-verification-certification/cbm/verification-certification/storage-tank-facilities-verification-certification/image205',
        width: 653,
        height: 366,
        format: 'jpg',
        created_at: '2025-08-22T16:30:56Z',
        tags: ['verification-certification', 'storage-tank-facilities-verification-certification', 'cbm']
      }
    ]
  };

  /**
   * Fetch images for a specific service and sub-service from Cloudinary
   */
  async getImages(serviceType: string, subService: string, maxResults: number = 50): Promise<CloudinaryImage[]> {
    try {
      const response = await apiClient.get(
        `/api/images/${serviceType}/${subService}/images?maxResults=${maxResults}`
      );
      
      if (response.data.success) {
        return response.data.data.images;
      } else {
        throw new Error('Failed to fetch images');
      }
    } catch (error) {
      return [];
    }
  }

  /**
   * Get images for visual testing service
   */
  async getVisualTestingImages(): Promise<CloudinaryImage[]> {
    try {
      // Try to fetch from API first
      const images = await this.getImages('testing', 'visual-testing');
      if (images.length > 0) {
        return images;
      }
    } catch (error) {
      // Fallback handled below
    }
    
    // Return fallback images if API is not available
    return this.fallbackTestingImages['visual-testing'] || [];
  }

  /**
   * Get images for drone inspection service
   */
  async getDroneInspectionImages(): Promise<CloudinaryImage[]> {
    return this.getImages('testing', 'drone-inspection');
  }

  /**
   * Get images for ultrasonic testing service
   */
  async getUltrasonicTestingImages(): Promise<CloudinaryImage[]> {
    return this.getImages('testing', 'ultrasonic-testing');
  }

  /**
   * Get images for any testing sub-service
   */
  async getTestingImages(subService: string): Promise<CloudinaryImage[]> {
    try {
      // Try to fetch from API first
      const images = await this.getImages('testing', subService);
      if (images.length > 0) {
        return images;
      }
    } catch (error) {
      // Fallback handled below
    }
    
    // Return fallback images if available
    if (this.fallbackTestingImages[subService]) {
      return this.fallbackTestingImages[subService];
    }
    
    return [];
  }

  /**
   * Get images for any CBM sub-service
   */
  async getCBMImages(subService: string): Promise<CloudinaryImage[]> {
    try {
      // Try to fetch from API first
      const images = await this.getImages('cbm', subService);
      if (images.length > 0) {
        return images;
      }
    } catch (error) {
      // Fallback handled below
    }
    
    // Return fallback images if available
    if (this.fallbackCBMImages[subService]) {
      return this.fallbackCBMImages[subService];
    }
    
    return [];
  }

  /**
   * Get images for any inspection sub-service
   */
  async getInspectionImages(subService: string): Promise<CloudinaryImage[]> {
    try {
      // Try to fetch from API first
      const images = await this.getImages('inspection', subService);
      if (images.length > 0) {
        return images;
      }
    } catch (error) {
      // Fallback handled below
    }
    
    // Return fallback images if available
    if (this.fallbackInspectionImages[subService]) {
      return this.fallbackInspectionImages[subService];
    }
    
    return [];
  }

  /**
   * Get images for any auditing sub-service
   */
  async getAuditingImages(subService: string): Promise<CloudinaryImage[]> {
    try {
      // Try to fetch from API first
      const images = await this.getImages('auditing', subService);
      if (images.length > 0) {
        return images;
      }
    } catch (error) {
      // Fallback handled below
    }
    
    // Return fallback images if available
    if (this.fallbackAuditingImages[subService]) {
      return this.fallbackAuditingImages[subService];
    }
    
    return [];
  }

  /**
   * Get images for any verification-certification sub-service
   */
  async getVerificationCertificationImages(subService: string): Promise<CloudinaryImage[]> {
    try {
      // Try to fetch from API first
      const images = await this.getImages('verification-certification', subService);
      if (images.length > 0) {
        return images;
      }
    } catch (error) {
    }
    
    // Return fallback images if available
    if (this.fallbackVerificationCertificationImages[subService]) {
      return this.fallbackVerificationCertificationImages[subService];
    }
    
    return [];
  }


}

export const imageService = new ImageService();
