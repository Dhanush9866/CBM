import axios from 'axios';

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || "https://cbm-backend-e1rq.onrender.com" || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// Debug logging via interceptors
apiClient.interceptors.request.use((config) => {
  // eslint-disable-next-line no-console
  console.log('[API][REQUEST]', {
    method: config.method,
    url: `${config.baseURL || ''}${config.url}`,
    params: config.params,
    data: config.data,
  });
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line no-console
    console.log('[API][RESPONSE]', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.error('[API][ERROR]', {
      url: error.config?.url,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export type SectionDto = {
  _id: string;
  title: string;
  bodyText?: string;
  images?: string[];
  language?: string;
  pageNumber?: number;
  sectionId?: string;
};

export type PageDto = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  language?: string;
  sections?: SectionDto[];
};

export async function getPageWithSections(pageName: string, sectionName?: string, lang?: string): Promise<PageDto> {
  const params = lang ? { lang } : undefined;

  // If a section name is provided, use the search endpoint which supports server-side section filtering
  if (sectionName) {
    const searchUrl = `/api/pages/search/${encodeURIComponent(pageName)}/${encodeURIComponent(sectionName)}`;
    const { data } = await apiClient.get(searchUrl, { params });
    return data.data as PageDto;
  }

  // Otherwise try exact slug match first, then fallback to search
  try {
    const slugUrl = `/api/pages/slug/${encodeURIComponent(pageName)}`;
    const { data } = await apiClient.get(slugUrl, { params });
    return data.data as PageDto;
  } catch (err: any) {
    if (err?.response?.status !== 404) throw err;
    const searchUrl = `/api/pages/search/${encodeURIComponent(pageName)}`;
    const { data } = await apiClient.get(searchUrl, { params });
    return data.data as PageDto;
  }
}


