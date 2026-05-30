import { useState, useEffect } from 'react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../api/testimonials';
import { useAuth } from '../../context/AuthContext';

const emptyForm = { name: '', email: '', content: '', rating: 5, isActive: true };

export default function AdminTestimonials() {
  const { getAuthHeaders } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadTestimonials(); }, []);

  const loadTestimonials = () => {
    getTestimonials({}).then((res) => {
      if (res.data.success) setTestimonials(res.data.data);
    }).catch(() => {});
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (t) => {
    setForm({ name: t.name, email: t.email || '', content: t.content, rating: t.rating, isActive: t.isActive });
    setEditing(t._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuthHeaders();
    try {
      if (editing) {
        await updateTestimonial(editing, form, auth);
      } else {
        await createTestimonial(form, auth);
      }
      resetForm();
      loadTestimonials();
    } catch {
      alert('Failed to save testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    await deleteTestimonial(id, getAuthHeaders());
    loadTestimonials();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">{testimonials.length} testimonials</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className={`px-6 py-2.5 text-sm tracking-wide uppercase transition-colors ${showForm ? 'bg-gray-200 text-gray-700' : 'bg-black text-white hover:bg-gray-800'}`}>
          {showForm ? 'Cancel' : 'Add Testimonial'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-lg font-semibold text-gray-900 mb-6">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Name *</label>
              <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Content *</label>
            <textarea required rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black resize-none" />
          </div>
          <div className="flex items-center gap-6 mb-6">
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Rating</label>
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white">
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 pt-5">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-black" />
              Active
            </label>
          </div>
          <button type="submit" className="px-8 py-3 bg-black text-white text-sm tracking-wide uppercase hover:bg-gray-800 transition-colors">
            {editing ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t._id} className="bg-white border border-gray-100 p-5">
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < t.rating ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-4 italic">"{t.content}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{t.name}</p>
                {t.email && <p className="text-xs text-gray-400">{t.email}</p>}
              </div>
              <div className="flex items-center gap-2">
                {!t.isActive && <span className="text-[10px] text-gray-400 uppercase">Inactive</span>}
                <button onClick={() => handleEdit(t)} className="text-xs text-gray-500 hover:text-black underline underline-offset-2">Edit</button>
                <button onClick={() => handleDelete(t._id)} className="text-xs text-red-500 hover:text-red-700 underline underline-offset-2">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="md:col-span-2 text-center py-12 bg-white border border-gray-100">
            <p className="text-sm text-gray-400">No testimonials yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
