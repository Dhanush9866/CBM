import { apiClient } from '@/utils/api';

export type VerifyDocPayload = {
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  jobTitle?: string;
  location: string;
  comments?: string;
};

export async function submitVerificationRequest(
  payload: VerifyDocPayload,
  documents: File[]
): Promise<{ success: boolean; message: string }> {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value !== 'undefined' && value !== null) {
      formData.append(key, value);
    }
  });

  documents.forEach((file) => {
    formData.append('documents', file);
  });

  const { data } = await apiClient.post('/api/verify-doc', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

