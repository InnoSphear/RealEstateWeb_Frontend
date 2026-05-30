import { useState, useEffect } from 'react';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../../api/properties';
import { useAuth } from '../../context/AuthContext';

const emptyForm = {
  title: '', description: '', purpose: 'sell', category: 'flat',
  price: '', location: { address: '', city: '', state: '', pincode: '' },
  area: '', areaUnit: 'sqft', bedrooms: '', bathrooms: '',
  furnishing: 'none', amenities: [], maintenanceIncluded: false,
  maintenanceCost: 0, yearBuilt: '', floors: '', parking: 'none',
  status: 'available', featured: false, images: [],
};

export default function AdminProperties() {
  const { getAuthHeaders } = useAuth();
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imgInput, setImgInput] = useState('');
  const [amenityInput, setAmenityInput] = useState('');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = () => {
    getProperties({}).then((res) => {
      if (res.data.success) setProperties(res.data.data);
    }).catch(() => {});
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
    setImgInput('');
    setAmenityInput('');
  };

  const handleEdit = (p) => {
    setForm({
      title: p.title, description: p.description, purpose: p.purpose,
      category: p.category, price: p.price,
      location: p.location || { address: '', city: '', state: '', pincode: '' },
      area: p.area, areaUnit: p.areaUnit || 'sqft',
      bedrooms: p.bedrooms || '', bathrooms: p.bathrooms || '',
      furnishing: p.furnishing || 'none',
      amenities: p.amenities || [], maintenanceIncluded: p.maintenanceIncluded,
      maintenanceCost: p.maintenanceCost || 0, yearBuilt: p.yearBuilt || '',
      floors: p.floors || '', parking: p.parking || 'none',
      status: p.status || 'available', featured: p.featured || false,
      images: p.images || [],
    });
    setEditing(p._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuthHeaders();
    const payload = {
      ...form,
      price: Number(form.price),
      area: Number(form.area),
      bedrooms: form.bedrooms ? Number(form.bedrooms) : 0,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : 0,
      maintenanceCost: Number(form.maintenanceCost) || 0,
      floors: form.floors ? Number(form.floors) : 0,
      yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : undefined,
    };

    try {
      if (editing) {
        await updateProperty(editing, payload, auth);
      } else {
        await createProperty(payload, auth);
      }
      resetForm();
      loadProperties();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save property');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await deleteProperty(id, getAuthHeaders());
      loadProperties();
    } catch {
      alert('Failed to delete property');
    }
  };

  const addImage = () => {
    if (imgInput && !form.images.includes(imgInput)) {
      setForm({ ...form, images: [...form.images, imgInput] });
      setImgInput('');
    }
  };

  const addAmenity = () => {
    if (amenityInput && !form.amenities.includes(amenityInput)) {
      setForm({ ...form, amenities: [...form.amenities, amenityInput] });
      setAmenityInput('');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500 mt-1">{properties.length} total properties</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className={`px-6 py-2.5 text-sm tracking-wide uppercase transition-colors ${showForm ? 'bg-gray-200 text-gray-700' : 'bg-black text-white hover:bg-gray-800'}`}>
          {showForm ? 'Cancel' : 'Add Property'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-lg font-semibold text-gray-900 mb-6">{editing ? 'Edit Property' : 'New Property'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Title *</label>
              <input required type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Price *</label>
              <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Description *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Purpose</label>
              <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white">
                <option value="sell">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white">
                <option value="flat">Flat</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot</option>
                <option value="building">Building</option>
                <option value="penthouse">Penthouse</option>
                <option value="commercial">Commercial</option>
                <option value="farmhouse">Farmhouse</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Area *</label>
              <input required type="number" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Area Unit</label>
              <select value={form.areaUnit} onChange={(e) => setForm({ ...form, areaUnit: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white">
                <option value="sqft">Sq Ft</option>
                <option value="sqm">Sq M</option>
                <option value="acre">Acre</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Bedrooms</label>
              <input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Bathrooms</label>
              <input type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Furnishing</label>
              <select value={form.furnishing} onChange={(e) => setForm({ ...form, furnishing: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white">
                <option value="none">None</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white">
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
                <option value="under-construction">Under Construction</option>
              </select>
            </div>
          </div>
          {form.purpose === 'rent' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={form.maintenanceIncluded} onChange={(e) => setForm({ ...form, maintenanceIncluded: e.target.checked })} className="accent-black" />
                Maintenance Included
              </label>
              {form.maintenanceIncluded && (
                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Maintenance Cost</label>
                  <input type="number" value={form.maintenanceCost} onChange={(e) => setForm({ ...form, maintenanceCost: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
                </div>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Address</label>
              <input type="text" value={form.location.address} onChange={(e) => setForm({ ...form, location: { ...form.location, address: e.target.value } })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">City</label>
              <input type="text" value={form.location.city} onChange={(e) => setForm({ ...form, location: { ...form.location, city: e.target.value } })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">State</label>
              <input type="text" value={form.location.state} onChange={(e) => setForm({ ...form, location: { ...form.location, state: e.target.value } })} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Images (URLs)</label>
            <div className="flex gap-2 mb-2">
              <input type="url" value={imgInput} onChange={(e) => setImgInput(e.target.value)} className="flex-1 px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" placeholder="https://..." />
              <button type="button" onClick={addImage} className="px-4 py-2.5 bg-gray-200 text-sm hover:bg-gray-300 transition-colors">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.images.map((img, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs">
                  {img.slice(0, 30)}...
                  <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-700">×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1">Amenities</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} className="flex-1 px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black" placeholder="Swimming Pool" />
              <button type="button" onClick={addAmenity} className="px-4 py-2.5 bg-gray-200 text-sm hover:bg-gray-300 transition-colors">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.amenities.map((a, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-xs">
                  {a}
                  <button type="button" onClick={() => setForm({ ...form, amenities: form.amenities.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-700">×</button>
                </span>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-6">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-black" />
            Featured Property
          </label>
          <button type="submit" className="px-8 py-3 bg-black text-white text-sm tracking-wide uppercase hover:bg-gray-800 transition-colors">
            {editing ? 'Update Property' : 'Create Property'}
          </button>
        </form>
      )}

      {/* Properties Table */}
      <div className="bg-white border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] tracking-wider uppercase text-gray-500">
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Purpose</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Price</th>
              <th className="text-left px-4 py-3 font-medium">City</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Dummy</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-900 font-medium max-w-[200px] truncate">{p.title}</td>
                <td className="px-4 py-3 text-gray-500 capitalize">{p.purpose}</td>
                <td className="px-4 py-3 text-gray-500 capitalize">{p.category}</td>
                <td className="px-4 py-3 text-gray-900">₹{p.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-500">{p.location?.city || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] px-2 py-0.5 uppercase tracking-wider ${
                    p.status === 'available' ? 'bg-green-50 text-green-700' :
                    p.status === 'sold' || p.status === 'rented' ? 'bg-red-50 text-red-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>{p.status}</span>
                </td>
                <td className="px-4 py-3">
                  {p.isDummy ? <span className="text-amber-500 text-xs">Yes</span> : <span className="text-gray-300 text-xs">—</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(p)} className="text-xs text-gray-500 hover:text-black mr-3 underline underline-offset-2">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-xs text-red-500 hover:text-red-700 underline underline-offset-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
