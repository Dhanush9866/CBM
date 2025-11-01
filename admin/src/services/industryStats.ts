import { api } from '@/lib/api';

export type IndustryStat = {
  _id?: string;
  number: string;
  label: string;
  description: string;
  order: number;
  isActive: boolean;
};

export async function listIndustryStats(): Promise<IndustryStat[]> {
  const { data } = await api.get('/api/industry-stats?includeInactive=true');
  return data.data as IndustryStat[];
}

export async function getIndustryStatById(id: string): Promise<IndustryStat> {
  const { data } = await api.get(`/api/industry-stats/${id}`);
  return data.data as IndustryStat;
}

export async function createIndustryStat(stat: Omit<IndustryStat, '_id'>): Promise<IndustryStat> {
  const { data } = await api.post('/api/industry-stats', stat);
  return data.data as IndustryStat;
}

export async function updateIndustryStat(id: string, stat: Partial<IndustryStat>): Promise<IndustryStat> {
  const { data } = await api.put(`/api/industry-stats/${id}`, stat);
  return data.data as IndustryStat;
}

export async function deleteIndustryStat(id: string): Promise<void> {
  await api.delete(`/api/industry-stats/${id}`);
}





