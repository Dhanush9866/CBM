
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

class TranslationService {
  private cache = new Map<string, { data: StaticTranslations; timestamp: number }>();
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
      console.error(`Error fetching translations for ${language}:`, error);
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
      console.error('Error fetching all translations:', error);
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCachedTranslations(language: string): StaticTranslations | null {
    const cached = this.cache.get(`static_${language}`);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }
}

export const translationService = new TranslationService();
export default translationService;


