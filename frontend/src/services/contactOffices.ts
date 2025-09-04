export interface OfficeData {
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
}

import { apiClient } from '@/utils/api';

export async function fetchContactOffices(): Promise<{ region_name: string; offices: OfficeData[] }[]> {
  const { data } = await apiClient.get('/api/contact-offices');
  return data;
}


