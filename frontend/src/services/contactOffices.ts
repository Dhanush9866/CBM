export interface OfficeData {
  _id?: string;
  region_name: string;
  region: string;
  country: string;
  office_name: string;
  address: string;
  phone: string;
  emails: string[];
  is_lab_facility: boolean;
  notes: string;
  image_url?: string;
  latitude?: number | null;
  longitude?: number | null;
  translations?: {
    [languageCode: string]: {
      region_name?: string;
      region?: string;
      country?: string;
      office_name?: string;
      address?: string;
      notes?: string;
    };
  };
}

import { apiClient } from '@/utils/api';

export async function fetchContactOffices(): Promise<{ region_name: string; offices: OfficeData[] }[]> {
  const { data } = await apiClient.get('/api/contact-offices');
  return data;
}

// Export type alias for backward compatibility
export type RemoteOfficeData = OfficeData;

export type ContactInquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  industry?: string;
  service?: string;
  message: string;
  consent: boolean;
};

export async function sendContactInquiry(payload: ContactInquiry): Promise<{ success: boolean; message: string }>{
  const { data } = await apiClient.post('/api/contact', payload);
  return data;
}


