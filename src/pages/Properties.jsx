import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProperties } from '../api/properties';
import PropertyCard from '../components/PropertyCard';

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    purpose: searchParams.get('purpose') || '',
    category: searchParams.get('category') || '',
    minPrice: '', maxPrice: '', furnishing: '', bedrooms: '',
  });
  const activeFilterCount = Object.entries(filters).filter(([k, v]) => v && k !== 'minPrice' && k !== 'maxPrice').length +
    (filters.minPrice || filters.maxPrice ? 1 : 0);

  useEffect(() => {
    const params = {};
    Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v; });
    if (searchParams.get('search')) params.search = searchParams.get('search');

    setLoading(true);
    getProperties(params).then(r => r.data.success && setProperties(r.data.data)).catch(() => {}).finally(() => setLoading(false));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters, searchParams]);

  const purpose = filters.purpose || searchParams.get('purpose') || 'all';

  return (
    <div className="pt-20 md:pt-24 bg-white">
      {/* Header */}
      <section className="relative py-16 md:py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#c8a85e] text-xs tracking-[0.3em] uppercase mb-3 font-medium">Shivam International</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            {purpose === 'rent' ? 'Properties for Rent' : purpose === 'sell' ? 'Properties for Sale' : 'All Properties'}
          </h1>
          <p className="text-gray-500">{properties.length} {properties.length === 1 ? 'property' : 'properties'} found</p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {[
                { label: 'All', value: '' },
                { label: 'For Rent', value: 'rent' },
                { label: 'For Sale', value: 'sell' },
              ].map((opt) => (
                <button key={opt.value} onClick={() => setFilters({ ...filters, purpose: opt.value })} className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  filters.purpose === opt.value ? 'bg-black text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}>
                  {opt.label}
                </button>
              ))}
              <button onClick={() => setShowFilters(!showFilters)} className="px-5 py-2 text-xs tracking-[0.15em] uppercase bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all duration-300 flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            </div>
            {activeFilterCount > 0 && (
              <button onClick={() => setFilters({ purpose: '', category: '', minPrice: '', maxPrice: '', furnishing: '', bedrooms: '' })} className="text-[10px] text-gray-400 hover:text-black tracking-wider uppercase underline underline-offset-4 transition-colors">
                Clear
              </button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5 pt-5 border-t border-gray-100 animate-slideDown">
              <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="px-3 py-2.5 border border-gray-200 text-sm focus:border-black bg-white">
                <option value="">All Categories</option>
                {['flat', 'villa', 'plot', 'building', 'penthouse', 'commercial', 'farmhouse'].map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
              <input type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} className="px-3 py-2.5 border border-gray-200 text-sm focus:border-black" />
              <input type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} className="px-3 py-2.5 border border-gray-200 text-sm focus:border-black" />
              <select value={filters.furnishing} onChange={(e) => setFilters({ ...filters, furnishing: e.target.value })} className="px-3 py-2.5 border border-gray-200 text-sm focus:border-black bg-white">
                <option value="">Furnishing</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
              <select value={filters.bedrooms} onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })} className="px-3 py-2.5 border border-gray-200 text-sm focus:border-black bg-white">
                <option value="">Bedrooms</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-gray-100 animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="h-72 shimmer-bg" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 shimmer-bg w-3/4" />
                    <div className="h-4 shimmer-bg w-1/2" />
                    <div className="h-5 shimmer-bg w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-8 tracking-wide">
                Showing <span className="text-gray-900 font-medium">{properties.length}</span> {properties.length === 1 ? 'property' : 'properties'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {properties.map((p, i) => (
                  <PropertyCard key={p._id} property={p} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
