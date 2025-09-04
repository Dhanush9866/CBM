export interface OfficeData {
  region_name: string;
  region: string;
  country: string;
  office_name: string;
  address: string;
  phone: string;
  emails: string[];
  is_lab_facility: boolean;
  notes: string;
  image_url?: string;
}

export async function fetchContactOffices(): Promise<{ region_name: string; offices: OfficeData[] }[]> {
  const res = await fetch('/api/contact-offices');
  if (!res.ok) throw new Error('Failed to load contact offices');
  return res.json();
}


