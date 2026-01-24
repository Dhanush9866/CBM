import { api } from '@/lib/api';

export async function requestOtp() {
  const { data } = await api.post('/api/admin/auth/request-otp', {});
  return data as { success: boolean; message?: string };
}

export async function verifyOtp(code: string) {
  const { data } = await api.post('/api/admin/auth/verify-otp', { code });
  return data as { success: boolean; data?: { token: string }; message?: string };
}

export async function loginWithPassword(email: string, password: string) {
  const { data } = await api.post('/api/admin/auth/login', { email, password });
  return data as { success: boolean; data?: { token: string; admin?: any }; message?: string };
}
