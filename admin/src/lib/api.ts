import axios, { InternalAxiosRequestConfig } from 'axios';


// ✅ Compute base URL from env (default to local dev)
const envBaseUrl = import.meta.env?.VITE_ADMIN_API_URL?.trim();
 const apiBaseURL = "https://api.cbm360tiv.com";
//const apiBaseURL = 'http://localhost:8020';
// ✅ Create Axios instance (no default Content-Type so FormData works)
export const api = axios.create({
  baseURL: apiBaseURL,
});

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

  return config;
});
