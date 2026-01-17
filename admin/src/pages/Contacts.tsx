import { FormEvent, useEffect, useState } from 'react';
import { ContactOffice, listContactOffices, createContactOffice, updateContactOffice, deleteContactOffice } from '@/services/contactOffices';
import { IndustryStat, listIndustryStats, createIndustryStat, updateIndustryStat, deleteIndustryStat } from '@/services/industryStats';

const emptyContactOffice: ContactOffice = {
  region_name: '',
  region: '',
  country: '',
  office_name: '',
  address: '',
  phone: '',
  emails: [],
  is_lab_facility: false,
  notes: '',
  image_url: '',
  region_order: 0,
  office_order: 0,
  latitude: null,
  longitude: null,
};

const emptyIndustryStat: IndustryStat = {
  number: '',
  label: '',
  description: '',
  order: 0,
  isActive: true,
};

export default function Contacts() {
  const [items, setItems] = useState<ContactOffice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<ContactOffice | null>(null);
  const [form, setForm] = useState<ContactOffice>(emptyContactOffice);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLabFacility, setSelectedLabFacility] = useState('');

  // Industry Stats states
  const [industryStats, setIndustryStats] = useState<IndustryStat[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [editingStat, setEditingStat] = useState<IndustryStat | null>(null);
  const [statForm, setStatForm] = useState<IndustryStat>(emptyIndustryStat);
  const [activeTab, setActiveTab] = useState<'offices' | 'stats'>('offices');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listContactOffices();
      setItems(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load contact offices');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const data = await listIndustryStats();
      setIndustryStats(data);
    } catch (err: any) {
      setStatsError(err?.response?.data?.message || err?.message || 'Failed to load industry stats');
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    load();
    loadStats();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editing && editing._id) {
        await updateContactOffice(editing._id, form, imageFile || undefined);
      } else {
        await createContactOffice(form, imageFile || undefined);
      }
      setForm(emptyContactOffice);
      setEditing(null);
      setImageFile(null);
      setImagePreview('');
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Save failed');
    }
  };

  const startEdit = (item: ContactOffice) => {
    setEditing(item);
    setForm({
      region_name: item.region_name,
      region: item.region,
      country: item.country,
      office_name: item.office_name,
      address: item.address,
      phone: item.phone,
      emails: item.emails || [],
      is_lab_facility: item.is_lab_facility,
      notes: item.notes,
      image_url: item.image_url,
      region_order: item.region_order,
      office_order: item.office_order,
      latitude: item.latitude ?? null,
      longitude: item.longitude ?? null,
    });
    setImagePreview(item.image_url || '');
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (item: ContactOffice) => {
    if (!item._id) return;
    if (!confirm('Delete this contact office?')) return;
    try {
      await deleteContactOffice(item._id);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Delete failed');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEmail = () => {
    setForm({ ...form, emails: [...form.emails, ''] });
  };

  const removeEmail = (index: number) => {
    setForm({ ...form, emails: form.emails.filter((_, i) => i !== index) });
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...form.emails];
    newEmails[index] = value;
    setForm({ ...form, emails: newEmails });
  };

  // Filter logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.office_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.region_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !selectedCountry || item.country === selectedCountry;
    const matchesRegion = !selectedRegion || item.region === selectedRegion;
    const matchesLabFacility = selectedLabFacility === '' ||
      (selectedLabFacility === 'yes' && item.is_lab_facility) ||
      (selectedLabFacility === 'no' && !item.is_lab_facility);

    return matchesSearch && matchesCountry && matchesRegion && matchesLabFacility;
  });

  // Get unique values for filter dropdowns
  const uniqueCountries = [...new Set(items.map(item => item.country))].sort();
  const uniqueRegions = [...new Set(items.map(item => item.region))].sort();

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedRegion('');
    setSelectedLabFacility('');
  };

  // Industry Stats handlers
  const handleStatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingStat && editingStat._id) {
        await updateIndustryStat(editingStat._id, statForm);
      } else {
        await createIndustryStat(statForm);
      }
      setStatForm(emptyIndustryStat);
      setEditingStat(null);
      await loadStats();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Save failed');
    }
  };

  const startEditStat = (stat: IndustryStat) => {
    setEditingStat(stat);
    setStatForm({
      number: stat.number,
      label: stat.label,
      description: stat.description,
      order: stat.order,
      isActive: stat.isActive,
    });
  };

  const removeStat = async (stat: IndustryStat) => {
    if (!stat._id) return;
    if (!confirm('Delete this industry stat?')) return;
    try {
      await deleteIndustryStat(stat._id);
      await loadStats();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
          Contacts & Stats
        </h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Manage global contact offices and industry statistics.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
        <button
          onClick={() => setActiveTab('offices')}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderBottom: activeTab === 'offices' ? '2px solid #111827' : '2px solid transparent',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontWeight: activeTab === 'offices' ? '600' : '400',
            color: activeTab === 'offices' ? '#111827' : '#6b7280'
          }}
        >
          Contact Offices
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderBottom: activeTab === 'stats' ? '2px solid #111827' : '2px solid transparent',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontWeight: activeTab === 'stats' ? '600' : '400',
            color: activeTab === 'stats' ? '#111827' : '#6b7280'
          }}
        >
          Industry Stats
        </button>
      </div>

      {/* Industry Stats Tab */}
      {activeTab === 'stats' && (
        <div>
          {/* Add/Edit Form */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <h2 style={{ marginBottom: 12, fontWeight: 600 }}>{editingStat ? 'Edit Industry Stat' : 'Add Industry Stat'}</h2>
            <form onSubmit={handleStatSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Number *</label>
                <input
                  value={statForm.number}
                  onChange={(e) => setStatForm({ ...statForm, number: e.target.value })}
                  placeholder="e.g., 72+, 7,000+"
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>Order</label>
                <input
                  type="number"
                  value={statForm.order}
                  onChange={(e) => setStatForm({ ...statForm, order: parseInt(e.target.value) || 0 })}
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Label *</label>
                <input
                  value={statForm.label}
                  onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                  placeholder="e.g., Countries Served"
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Description *</label>
                <textarea
                  value={statForm.description}
                  onChange={(e) => setStatForm({ ...statForm, description: e.target.value })}
                  placeholder="e.g., Global presence with local expertise"
                  rows={2}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={!!statForm.isActive}
                    onChange={(e) => setStatForm({ ...statForm, isActive: e.target.checked })}
                  />
                  Active
                </label>
              </div>
              <div style={{ alignSelf: 'end', justifySelf: 'end', gridColumn: '1 / -1' }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditingStat(null);
                    setStatForm(emptyIndustryStat);
                  }}
                  style={{ marginRight: 8, padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db' }}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 12px', borderRadius: 6, background: '#111827', color: 'white' }}
                >
                  {editingStat ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>

          {/* Industry Stats Table */}
          {statsLoading ? (
            <div>Loading...</div>
          ) : statsError ? (
            <div style={{ color: 'crimson' }}>{statsError}</div>
          ) : (
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 8 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Number', 'Label', 'Description', 'Order', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {industryStats.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{
                        padding: 40,
                        textAlign: 'center',
                        color: '#6b7280',
                        fontStyle: 'italic'
                      }}>
                        No industry stats found
                      </td>
                    </tr>
                  ) : (
                    industryStats.map(stat => (
                      <tr key={stat._id}>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6', fontWeight: '600' }}>{stat.number}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{stat.label}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{stat.description}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{stat.order}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: stat.isActive ? '#10b98120' : '#6b728020',
                            color: stat.isActive ? '#10b981' : '#6b7280'
                          }}>
                            {stat.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>
                          <button
                            onClick={() => startEditStat(stat)}
                            style={{ marginRight: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => removeStat(stat)}
                            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Contact Offices Tab */}
      {activeTab === 'offices' && (
        <>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
                {items.length}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Offices</div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
                {items.filter(item => item.is_lab_facility).length}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Lab Facilities</div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6' }}>
                {new Set(items.map(item => item.region)).size}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Regions</div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>
                {new Set(items.map(item => item.country)).size}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Countries</div>
            </div>
          </div>

          {/* Add/Edit Form */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <h2 style={{ marginBottom: 12, fontWeight: 600 }}>{editing ? 'Edit Contact Office' : 'Add Contact Office'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Region Name *</label>
                <input
                  value={form.region_name}
                  onChange={(e) => setForm({ ...form, region_name: e.target.value })}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>Region *</label>
                <input
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>Country *</label>
                <input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>Office Name *</label>
                <input
                  value={form.office_name}
                  onChange={(e) => setForm({ ...form, office_name: e.target.value })}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Address *</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  rows={2}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>
                  Latitude (optional)
                </label>
                <input
                  type="number"
                  step="any"
                  value={form.latitude ?? ''}
                  onChange={(e) => setForm({ ...form, latitude: e.target.value ? parseFloat(e.target.value) : null })}
                  placeholder="e.g., 24.7136"
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>
                  Longitude (optional)
                  <span style={{ marginLeft: 8, fontSize: '12px', color: '#6b7280', fontWeight: 'normal' }}>
                  </span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={form.longitude ?? ''}
                  onChange={(e) => setForm({ ...form, longitude: e.target.value ? parseFloat(e.target.value) : null })}
                  placeholder="e.g., 46.6753"
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>Phone *</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>Region Order</label>
                <input
                  type="number"
                  value={form.region_order}
                  onChange={(e) => setForm({ ...form, region_order: parseInt(e.target.value) || 0 })}
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>Office Order</label>
                <input
                  type="number"
                  value={form.office_order}
                  onChange={(e) => setForm({ ...form, office_order: parseInt(e.target.value) || 0 })}
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div>
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
                {imagePreview && (
                  <div style={{ marginTop: 8 }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: '100px', height: '75px', objectFit: 'cover', borderRadius: 4, border: '1px solid #d1d5db' }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={!!form.is_lab_facility}
                    onChange={(e) => setForm({ ...form, is_lab_facility: e.target.checked })}
                  />
                  Laboratory Facility
                </label>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Email Addresses</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {form.emails.map((email, index) => (
                    <div key={index} style={{ display: 'flex', gap: 8 }}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => updateEmail(index, e.target.value)}
                        placeholder="email@example.com"
                        style={{ flex: 1, padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                      />
                      <button
                        type="button"
                        onClick={() => removeEmail(index)}
                        style={{ padding: '8px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 6 }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEmail}
                    style={{ padding: '8px 12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: 6, alignSelf: 'flex-start' }}
                  >
                    + Add Email
                  </button>
                </div>
              </div>
              <div style={{ alignSelf: 'end', justifySelf: 'end', gridColumn: '1 / -1' }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm(emptyContactOffice);
                    setImageFile(null);
                    setImagePreview('');
                  }}
                  style={{ marginRight: 8, padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db' }}
                >
                  {editing ? 'Cancel' : 'Clear'}
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 12px', borderRadius: 6, background: '#111827', color: 'white' }}
                >
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>

          {/* Filters */}
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            backgroundColor: '#f9fafb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Filters</h3>
              <button
                onClick={clearFilters}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Clear All
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12
            }}>
              {/* Search */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: 4, color: '#374151' }}>
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search offices, regions, countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: '14px'
                  }}
                />
              </div>

              {/* Country Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: 4, color: '#374151' }}>
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">All Countries</option>
                  {uniqueCountries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: 4, color: '#374151' }}>
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">All Regions</option>
                  {uniqueRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Lab Facility Filter */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: 4, color: '#374151' }}>
                  Lab Facility
                </label>
                <select
                  value={selectedLabFacility}
                  onChange={(e) => setSelectedLabFacility(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: 6,
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">All Facilities</option>
                  <option value="yes">Lab Facilities Only</option>
                  <option value="no">Non-Lab Facilities Only</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div style={{
              marginTop: 12,
              fontSize: '12px',
              color: '#6b7280',
              borderTop: '1px solid #e5e7eb',
              paddingTop: 8
            }}>
              Showing {filteredItems.length} of {items.length} offices
            </div>
          </div>

          {/* Contact Offices Table */}
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'crimson' }}>{error}</div>
          ) : (
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 8 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Office Name', 'Region', 'Country', 'Phone', 'Lab Facility', 'Actions'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{
                        padding: 40,
                        textAlign: 'center',
                        color: '#6b7280',
                        fontStyle: 'italic'
                      }}>
                        No offices found matching your filters
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map(item => (
                      <tr key={item._id}>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>
                          <div>
                            <div style={{ fontWeight: '500' }}>{item.office_name}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.region_name}</div>
                          </div>
                        </td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.region}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.country}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.phone}</td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: item.is_lab_facility ? '#10b98120' : '#6b728020',
                            color: item.is_lab_facility ? '#10b981' : '#6b7280'
                          }}>
                            {item.is_lab_facility ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>
                          <button
                            onClick={() => startEdit(item)}
                            style={{ marginRight: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => remove(item)}
                            style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
