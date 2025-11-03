import { api } from '@/lib/api';

export interface ContactOffice {
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
  image_url: string;
  region_order: number;
  office_order: number;
  latitude?: number | null;
  longitude?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to create FormData for file uploads
const createFormData = (data: Partial<ContactOffice>, file?: File): FormData => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'emails' && Array.isArray(value)) {
      formData.append(key, value.join(','));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  
  if (file) {
    formData.append('image', file);
  }
  
  return formData;
};

export async function listContactOffices(): Promise<ContactOffice[]> {
  const { data } = await api.get('/api/contact-offices/admin');
  return (data?.data as ContactOffice[]) || [];
}

export async function getContactOffice(id: string): Promise<ContactOffice> {
  const { data } = await api.get(`/api/contact-offices/admin/${id}`);
  return data.data as ContactOffice;
}

export async function createContactOffice(data: Partial<ContactOffice>, file?: File): Promise<ContactOffice> {
  const formData = createFormData(data, file);
  const { data: resp } = await api.post('/api/contact-offices/admin', formData, {
    headers: {},
  });
  return resp.data as ContactOffice;
}

export async function updateContactOffice(id: string, data: Partial<ContactOffice>, file?: File): Promise<ContactOffice> {
  const formData = createFormData(data, file);
  const { data: resp } = await api.put(`/api/contact-offices/admin/${id}`, formData, {
    headers: {},
  });
  return resp.data as ContactOffice;
}

export async function deleteContactOffice(id: string): Promise<void> {
  await api.delete(`/api/contact-offices/admin/${id}`);
}
