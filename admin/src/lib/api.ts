import axios, { InternalAxiosRequestConfig } from 'axios';
import { extractErrorMessage, showErrorToast } from './toast';

const envBaseUrl = import.meta.env?.VITE_API_BASE_URL?.trim();
const apiBaseURL = envBaseUrl || 'http://localhost:8020';

export const api = axios.create({
  baseURL: apiBaseURL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  if (token) {
    config.headers = config.headers || {};

    if (typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    showErrorToast(extractErrorMessage(error, 'Request failed'));
    return Promise.reject(error);
  }
);
