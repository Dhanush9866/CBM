import axios, { InternalAxiosRequestConfig } from 'axios';


// ✅ Compute base URL from env (default to local dev)
const envBaseUrl = import.meta.env?.VITE_API_BASE_URL?.trim();
// Use environment variable if set, otherwise default to localhost
const apiBaseURL = envBaseUrl || 'http://localhost:8020';
// Production: "https://api.cbm360tiv.com"
// ✅ Create Axios instance (no default Content-Type so FormData works)
export const api = axios.create({
  baseURL: apiBaseURL,
});

// Log API configuration on initialization
console.log('================================================');
console.log('🔧 Admin API Configuration');
console.log('================================================');
console.log('  API Base URL:', apiBaseURL);
console.log('  Environment:', import.meta.env.MODE || 'development');
console.log('  VITE_API_BASE_URL from .env:', import.meta.env.VITE_API_BASE_URL || 'NOT SET');
console.log('================================================');

// ✅ Use correct interceptor typing (Axios v1+)
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  if (token) {
    // Ensure headers object exists
    config.headers = config.headers || {};
    // Use set() if headers is an AxiosHeaders instance
    if (typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else {
      // fallback for non-AxiosHeaders type
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
  }

  // Log outgoing requests
  console.log('📤 API Request:', {
    method: config.method?.toUpperCase(),
    url: config.url,
    fullURL: `${config.baseURL}${config.url}`,
    hasToken: !!token,
  });

  return config;
});

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'N/A',
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);
