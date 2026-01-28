import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Career, listCareers, createCareer, updateCareer, deleteCareer } from '@/services/careers';

const emptyCareer: Career = {
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  level: 'Mid Level',
  description: '',
  isActive: true,
};

export default function Careers() {
  const [items, setItems] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Career | null>(null);
  const [form, setForm] = useState<Career>(emptyCareer);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listCareers();
      setItems(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editing && editing._id) {
        await updateCareer(editing._id, form);
        showToast('success', 'Career updated successfully');
      } else {
        const resp = await createCareer(form);
        const msg = resp?.message || 'Career created successfully';
        showToast('success', msg);
      }
      setForm(emptyCareer);
      setEditing(null);
      await load();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Save failed';
      showToast('error', msg);
    }
  };

  const startEdit = (item: Career) => {
    setEditing(item);

    let sections = item.sections || [];

    // Auto-migrate legacy description to sections if sections are empty but description exists
    if (sections.length === 0 && item.description) {
      const lines = item.description.split(/\r?\n/);
      const parsedSections: { heading: string; content: string }[] = [];

      let currentHeading = 'Role Overview'; // Default first heading
      let currentContent: string[] = [];

      // keywords often used in headings
      const headingKeywords = [
        'overview', 'responsibility', 'responsibilities', 'requirement', 'requirements',
        'qualification', 'qualifications', 'benefit', 'benefits', 'about', 'summary', 'role',
        'what you will do', 'who you are', 'skills', 'experience', 'reporting to', 'reporting',
        'technical', 'language', 'languages', 'offer', 'apply', 'education', 'knowledge', 'competencies'
      ];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) {
          if (currentContent.length > 0) currentContent.push(''); // Preserve paragraph breaks
          continue;
        }

        // Heuristics for a Heading line:
        // 1. Short (under 60 chars)
        // 2. Contains a keyword OR ends with colon OR is all caps OR looks like a list header (1., a))
        // 3. Not a bullet point (- or *)
        const isShort = line.length < 60;
        const containsKeyword = headingKeywords.some(kw => line.toLowerCase().includes(kw));
        const endsWithColon = line.endsWith(':');
        const isReviewHeader = /^\s*(?:\d+\.|[a-zA-Z]\))\s+/.test(line); // 1. Title or a) Title
        const isBullet = /^[-*•]\s/.test(line);

        if (isShort && !isBullet && (containsKeyword || endsWithColon || isReviewHeader || (i > 0 && lines[i - 1].trim() === ''))) {
          // It's a new heading! Push previous section.
          if (currentContent.length > 0) {
            parsedSections.push({ heading: currentHeading, content: currentContent.join('\n').trim() });
          }
          currentHeading = endsWithColon ? line.slice(0, -1) : line;
          currentContent = [];
        } else {
          currentContent.push(line);
        }
      }

      // Push final section
      if (currentContent.length > 0 || parsedSections.length === 0) {
        parsedSections.push({ heading: currentHeading, content: currentContent.join('\n').trim() });
      }

      sections = parsedSections;
    }

    setForm({
      title: item.title,
      department: item.department,
      location: item.location,
      type: item.type,
      level: item.level,
      description: item.description,
      sections: sections,
      isActive: item.isActive,
    });
  };

  const remove = async (item: Career) => {
    if (!item._id) return;
    if (!confirm('Delete this career?')) return;
    try {
      await deleteCareer(item._id);
      await load();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Delete failed');
    }
  };


  return (
    <div>
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1000,
            padding: '12px 14px',
            borderRadius: 8,
            color: toast.type === 'success' ? '#065f46' : '#7f1d1d',
            background: toast.type === 'success' ? '#ecfdf5' : '#fee2e2',
            border: `1px solid ${toast.type === 'success' ? '#10b981' : '#ef4444'}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}
        >
          {toast.message}
        </div>
      )}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
          Careers
        </h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Manage job postings and career opportunities.
        </p>
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12, fontWeight: 600 }}>{editing ? 'Edit Career' : 'Add Career'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
          </div>
          <div>
            <label>Department</label>
            <input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
          </div>
          <div>
            <label>Location</label>
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
          </div>
          <div>
            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}>
              {['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label>Level</label>
            <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}>
              {['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Manager', 'Director'].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Description Sections</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {form.sections?.map((section, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'start' }}>
                  <input
                    placeholder="Heading"
                    value={section.heading}
                    onChange={(e) => {
                      const newSections = [...(form.sections || [])];
                      newSections[idx].heading = e.target.value;
                      setForm({ ...form, sections: newSections });
                    }}
                    style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                  />
                  <textarea
                    placeholder="Content"
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...(form.sections || [])];
                      newSections[idx].content = e.target.value;
                      setForm({ ...form, sections: newSections });
                    }}
                    rows={2}
                    style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSections = form.sections?.filter((_, i) => i !== idx);
                      setForm({ ...form, sections: newSections });
                    }}
                    style={{ color: 'crimson', padding: 8, border: '1px solid #fee2e2', borderRadius: 6, background: '#fee2e2' }}
                  >
                    X
                  </button>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, sections: [...(form.sections || []), { heading: '', content: '' }] })}
                  style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #d1d5db', background: '#f3f4f6', fontSize: '14px' }}
                >
                  + Add Section
                </button>
              </div>
            </div>
            {/* Keeping description for backward compatibility/fallback during migration, though user wants structure */}
            {(!form.sections || form.sections.length === 0) && (
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: 4 }}>
                Legacy description will be used if no sections are added.
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  placeholder="Legacy Description (Optional)"
                  style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6, marginTop: 4 }}
                />
              </p>
            )}
          </div>
          <div>
            <label>
              <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active
            </label>
          </div>
          <div style={{ alignSelf: 'end', justifySelf: 'end' }}>
            <button type="button" onClick={() => { setEditing(null); setForm(emptyCareer); }} style={{ marginRight: 8, padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db' }}>Clear</button>
            <button type="submit" style={{ padding: '8px 12px', borderRadius: 6, background: '#111827', color: 'white' }}>{editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'crimson' }}>{error}</div>
      ) : (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Title', 'Department', 'Location', 'Type', 'Level', 'Active', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid #e5e7eb' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.title}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.department}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.location}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.type}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.level}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>{item.isActive ? 'Yes' : 'No'}</td>
                  <td style={{ padding: 12, borderBottom: '1px solid #f3f4f6' }}>
                    <button onClick={() => startEdit(item)} style={{ marginRight: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}>Edit</button>
                    <button onClick={() => remove(item)} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

