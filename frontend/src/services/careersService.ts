import { apiClient } from '@/utils/api';

export type CareerDto = {
	_id: string;
	title: string;
	department: string;
	location: string;
	type: string;
	level: string;
	description: string;
	isActive: boolean;
};

export async function listCareers(params?: Partial<Pick<CareerDto, 'department' | 'location' | 'level' | 'type'>> & { active?: boolean }) {
	const { data } = await apiClient.get('/api/careers', { params });
	return data.data as CareerDto[];
}










