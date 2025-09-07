import { apiClient } from '@/utils/api';

export type CareerDto = {
	_id: string;
	title: string;
	department: string;
	location: string;
	type: string;
	level: string;
	description: string;
	responsibilities?: string[];
	requirements?: string[];
	benefits?: string[];
	tags?: string[];
	workArrangement?: string;
	isActive: boolean;
	postedAt: string;
	closingAt?: string;
	applicationUrl?: string;
	translations?: Map<string, {
		title?: string;
		description?: string;
		department?: string;
		location?: string;
		type?: string;
		level?: string;
		workArrangement?: string;
		responsibilities?: string[];
		requirements?: string[];
		benefits?: string[];
		tags?: string[];
	}>;
};

export async function listCareers(params?: Partial<Pick<CareerDto, 'department' | 'location' | 'level' | 'type'>> & { active?: boolean; lang?: string }) {
	const { data } = await apiClient.get('/api/careers', { params });
	return data.data as CareerDto[];
}

export async function getCareerById(id: string, lang?: string): Promise<CareerDto> {
	const { data } = await apiClient.get(`/api/careers/${id}`, { 
		params: lang ? { lang } : {} 
	});
	return data.data as CareerDto;
}










