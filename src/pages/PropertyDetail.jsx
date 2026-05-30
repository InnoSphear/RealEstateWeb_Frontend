import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProperty, getProperties } from '../api/properties';
import { createInquiry } from '../api/inquiries';
import PropertyCard from '../components/PropertyCard';

const categoryLabels = {
  flat: 'Apartment', building: 'Building', plot: 'Plot', villa: 'Villa',
  penthouse: 'Penthouse', commercial: 'Commercial', farmhouse: 'Farmhouse'
};

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProperty(id).then((res) => {
      if (res.data.success) {
        setProperty(res.data.data);
        getProperties({ category: res.data.data.category, purpose: res.data.data.purpose }).then((r) => {
          if (r.data.success) setSimilar(r.data.data.filter((p) => p._id !== id).slice(0, 3));
        }).catch(() => {});
      }
    }).catch(() => {}).finally(() => setLoading(false));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleInquiry = async (e) => {
    e.preventDefault();
    try {
      await createInquiry({ ...form, property: id, purpose: property.purpose });
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch { alert('Failed to send inquiry. Please try again.'); }
  };

  if (loading) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fadeIn">
          <div className="h-[500px] shimmer-bg mb-8" />
          <div className="h-8 shimmer-bg w-1/2 mb-4" />
          <div className="h-5 shimmer-bg w-1/3 mb-8" />
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => <div key={i} className="h-20 shimmer-bg" />)}
          </div>
          <div className="h-32 shimmer-bg w-full" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-white">
        <div className="text-center animate-fadeIn">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <Link to="/properties" className="text-sm text-gray-400 hover:text-black underline underline-offset-4 transition-colors">Back to Properties</Link>
        </div>
      </div>
    );
  }

  const images = property.images?.length > 0 ? property.images : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'];

  return (
    <div className="pt-20 md:pt-24 bg-white">
      {/* Gallery */}
      <section className="relative">
        <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden bg-gray-50">
          <img src={images[currentImg]} alt={property.title} className="w-full h-full object-cover transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrentImg(i)} className={`transition-all duration-300 ${i === currentImg ? 'w-10 h-1 bg-white' : 'w-6 h-1 bg-white/40 hover:bg-white/60'}`} />
            ))}
          </div>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-6 right-6 hidden sm:flex gap-2">
            {images.slice(0, 4).map((img, i) => (
              <button key={i} onClick={() => setCurrentImg(i)} className={`w-16 h-16 border-2 overflow-hidden transition-all duration-300 ${i === currentImg ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-90'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className={`px-4 py-1.5 text-xs tracking-[0.15em] uppercase font-semibold ${property.purpose === 'rent' ? 'bg-black text-white' : 'bg-white text-black border border-black'}`}>
            For {property.purpose === 'rent' ? 'Rent' : 'Sale'}
          </span>
          {property.featured && <span className="px-4 py-1.5 text-xs tracking-[0.15em] uppercase font-semibold bg-[#c8a85e] text-white">Featured</span>}
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Left */}
          <div className="lg:col-span-2 space-y-10">
            <div className="animate-fadeIn">
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 tracking-wide mb-3">
                <span className="text-[#c8a85e] font-medium">{categoryLabels[property.category] || property.category}</span>
                <span>•</span>
                <span>{property.location?.city}{property.location?.state ? `, ${property.location.state}` : ''}</span>
                {property.status !== 'available' && <><span>•</span><span className="capitalize">{property.status}</span></>}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{property.title}</h1>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-serif text-3xl md:text-4xl font-bold text-gray-900">{property.priceLabel || `₹${property.price.toLocaleString()}`}</span>
                {property.purpose === 'rent' && <span className="text-sm text-gray-400">/month</span>}
              </div>
              {property.purpose === 'rent' && (
                <div className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 mt-2 ${
                  property.maintenanceIncluded ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                }`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={property.maintenanceIncluded ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'} />
                  </svg>
                  {property.maintenanceIncluded
                    ? `Maintenance Included${property.maintenanceCost ? ` (₹${property.maintenanceCost.toLocaleString()}/mo)` : ''}`
                    : 'Maintenance Not Included'}
                </div>
              )}
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8 bg-gray-50 border border-gray-100 animate-fadeInUp">
              {[
                { label: 'Bedrooms', value: property.bedrooms || '—', show: property.bedrooms > 0 },
                { label: 'Bathrooms', value: property.bathrooms || '—', show: property.bathrooms > 0 },
                { label: 'Area', value: `${property.area} ${property.areaUnit}` },
                { label: 'Furnishing', value: property.furnishing === 'none' ? '—' : property.furnishing?.charAt(0).toUpperCase() + property.furnishing?.slice(1) },
                { label: 'Floors', value: property.floors || '—', show: property.floors > 0 },
                { label: 'Parking', value: property.parking === 'none' ? '—' : property.parking },
                { label: 'Year Built', value: property.yearBuilt || '—' },
                { label: 'Status', value: property.status?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), highlight: true },
              ].filter(item => item.show !== false).map((item) => (
                <div key={item.label} className="text-center">
                  <p className={`font-serif text-2xl font-bold ${item.highlight ? property.status === 'available' ? 'text-green-600' : 'text-gray-900' : 'text-gray-900'}`}>{item.value}</p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="animate-fadeInUp">
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-5">About This Property</h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Address */}
            {property.location?.address && (
              <div className="animate-fadeInUp">
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-5">Location</h2>
                <div className="flex items-start gap-3 p-5 bg-gray-50 border border-gray-100">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-700">{property.location.address}</p>
                    <p className="text-sm text-gray-500">{property.location.city}{property.location.state ? `, ${property.location.state}` : ''}{property.location.pincode ? ` - ${property.location.pincode}` : ''}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="animate-fadeInUp">
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-5">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 border border-gray-100 text-sm text-gray-600">
                      <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right - Inquiry Form */}
          <div>
            <div className="sticky top-28 lg:top-32 bg-white border border-gray-100 p-6 md:p-8 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">Interested?</h3>
              <p className="text-sm text-gray-400 mb-6">Send us a message and we'll get back to you shortly.</p>
              {sent ? (
                <div className="text-center py-10 animate-scaleIn">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Thank You!</p>
                  <p className="text-xs text-gray-500 mb-6">Your inquiry has been sent successfully.</p>
                  <button onClick={() => setSent(false)} className="text-xs text-gray-400 hover:text-black underline underline-offset-4 transition-colors">Send another inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-1.5">Your Name *</label>
                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black transition-colors bg-white" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-1.5">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black transition-colors bg-white" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-1.5">Phone *</label>
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black transition-colors bg-white" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-1.5">Message *</label>
                    <textarea required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:border-black transition-colors bg-white resize-none" placeholder="I'm interested in this property..." />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3.5 bg-black text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-gray-800 transition-all duration-300">
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <section className="mt-16 pt-16 border-t border-gray-100">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-10">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {similar.map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
