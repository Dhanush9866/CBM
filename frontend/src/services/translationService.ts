
import { apiClient } from '@/utils/api';

export interface StaticTranslations {
  navbar: {
    services: string;
    industries: string;
    about: string;
    careers: string;
    blog: string;
    contact: string;
    getQuote: string;
    contactUs: string;
  };
  footer: {
    company: string;
    description: string;
    services: {
      title: string;
      list: string[];
    };
    industries: {
      title: string;
      list: string[];
    };
    contact: {
      title: string;
      address: string;
      phone: string;
      email: string;
    };
    newsletter: string;
    placeholderEmail: string;
  };
  pages?: {
    services?: {
      hero?: {
        title: string;
        subtitle: string;
        description: string;
        primaryCTAText: string;
        secondaryCTAText: string;
      };
      slides?: Array<{
        title: string;
        subtitle?: string;
        description: string;
        primaryCTA: {
          text: string;
          href: string;
        };
        secondaryCTA: {
          text: string;
          href: string;
        };
      }>;
    };
    about?: {
      title: string;
      breadcrumb: {
        home: string;
        about: string;
      };
      loading: string;
      error: string;
    };
    careers?: {
      title: string;
      description: string;
      applyNow: string;
      hiringProcess?: {
        title: string;
        description: string;
        steps: {
          review: {
            title: string;
            description: string;
          };
          interview: {
            title: string;
            description: string;
          };
          assessment: {
            title: string;
            description: string;
          };
          final: {
            title: string;
            description: string;
          };
        };
      };
      currentOpenings?: {
        loadingText: string;
        generalApplicationText: string;
        submitGeneralApplication: string;
      };
      applicationDialog?: {
        title: string;
        positionDetails: {
          title: string;
          position: string;
          department: string;
          location: string;
          type: string;
        };
        personalInformation: string;
        experience: string;
        resumeUpload: string;
        coverLetter: string;
        submitApplication: string;
        reset: string;
        submitting: string;
        labels: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          experience: string;
          resume: string;
          coverLetter: string;
        };
        placeholders: {
          experience: string;
          coverLetter: string;
        };
        fileUpload: {
          clickToUpload: string;
          maxFileSize: string;
          chooseFile: string;
          fileSelected: string;
        };
        validation: {
          resumeRequired: string;
          missingFields: string;
          invalidEmail: string;
          invalidFileType: string;
          fileTooLarge: string;
        };
        success: {
          title: string;
          description: string;
        };
        error: {
          title: string;
          description: string;
        };
        experienceLevels: {
          "0-1": string;
          "2-3": string;
          "4-5": string;
          "6-8": string;
          "9-12": string;
          "13+": string;
        };
      };
    };
    blog?: {
      title: string;
      description: string;
    };
    contact?: {
      officesTitle: string;
      officesDescription: string;
      formTitle: string;
      formDescription: string;
      supportTitle: string;
      supportDescription: string;
      supportPhoneTitle: string;
      supportPhoneDesc: string;
      supportPhoneHours: string;
      supportEmailTitle: string;
      supportEmailDesc: string;
      supportEmailResponse: string;
      supportEmergencyTitle: string;
      supportEmergencyDesc: string;
      supportEmergencyNote: string;
      responseGuaranteeTitle: string;
      responsePhone: string;
      responseEmail: string;
      responseQuote: string;
      labels: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        company: string;
        industry: string;
        service: string;
        message: string;
        consent: string;
      };
      placeholders: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        company: string;
        selectIndustry: string;
        selectService: string;
        message: string;
      };
      cta: {
        send: string;
        sending: string;
      };
    };
  };
  services?: {
    completeServicePortfolio: {
      heading: string;
      subheading: string;
    };
    learnMore: string;
    viewDetails: string;
    servicesList: Array<{
      id: number;
      title: string;
      description: string;
      icon: any;
      link: string;
      imageUrl: string;
      features: string[];
    }>;
  };
  industryStats?: Array<{
    number: string;
    label: string;
    description: string;
  }>;
}

export interface TranslationResponse {
  success: boolean;
  data: {
    language: string;
    translations: StaticTranslations;
    timestamp: string;
  };
}

export interface AllTranslationsResponse {
  success: boolean;
  data: {
    supportedLanguages: string[];
    translations: Record<string, StaticTranslations>;
    timestamp: string;
  };
}

export interface SlidesResponse {
  success: boolean;
  data: {
    language: string;
    slides: Array<{
      title: string;
      subtitle?: string;
      description: string;
      primaryCTA: {
        text: string;
        href: string;
      };
      secondaryCTA: {
        text: string;
        href: string;
      };
    }>;
    count: number;
    timestamp: string;
  };
}

class TranslationService {
  private cache = new Map<string, { data: StaticTranslations; timestamp: number }>();
  private slidesCache = new Map<string, { data: any[]; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  async getStaticTranslations(language: string): Promise<StaticTranslations> {
    const cacheKey = `static_${language}`;
    const cached = this.cache.get(cacheKey);
    
    // Check if cached data is still valid
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await apiClient.get<TranslationResponse>(
        `/api/translate/static/${language}`
      );
      
      if (response.data.success) {
        // Cache the response
        this.cache.set(cacheKey, {
          data: response.data.data.translations,
          timestamp: Date.now()
        });
        
        return response.data.data.translations;
      } else {
        throw new Error('Failed to fetch translations');
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllStaticTranslations(): Promise<Record<string, StaticTranslations>> {
    try {
      const response = await apiClient.get<AllTranslationsResponse>(
        `/api/translate/static`
      );
      
      if (response.data.success) {
        // Cache all translations
        Object.entries(response.data.data.translations).forEach(([lang, translations]: [string, StaticTranslations]) => {
          this.cache.set(`static_${lang}`, {
            data: translations,
            timestamp: Date.now()
          });
        });
        
        return response.data.data.translations;
      } else {
        throw new Error('Failed to fetch all translations');
      }
    } catch (error) {
      throw error;
    }
  }

  async getSlidesData(language: string): Promise<any[]> {
    const cacheKey = `slides_${language}`;
    const cached = this.slidesCache.get(cacheKey);
    
    // Check if cached data is still valid
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await apiClient.get<SlidesResponse>(
        `/api/translate/slides/${language}`
      );
      
      if (response.data.success) {
        // Cache the response
        this.slidesCache.set(cacheKey, {
          data: response.data.data.slides,
          timestamp: Date.now()
        });
        
        return response.data.data.slides;
      } else {
        throw new Error('Failed to fetch slides data');
      }
    } catch (error) {
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
    this.slidesCache.clear();
  }

  getCachedTranslations(language: string): StaticTranslations | null {
    const cached = this.cache.get(`static_${language}`);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  getCachedSlides(language: string): any[] | null {
    const cached = this.slidesCache.get(`slides_${language}`);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }
}

export const translationService = new TranslationService();
export default translationService;


