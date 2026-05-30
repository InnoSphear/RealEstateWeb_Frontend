import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ compact }) {
  const [search, setSearch] = useState('');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (purpose) params.set('purpose', purpose);
    if (category) params.set('category', category);
    navigate(`/properties?${params.toString()}`);
  };

  if (compact) {
    return (
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search properties..."
          className="w-full px-4 py-2.5 pr-10 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="bg-white border border-gray-100 p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1.5">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="City, address..."
            className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1.5">Purpose</label>
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white">
            <option value="">All</option>
            <option value="rent">For Rent</option>
            <option value="sell">For Sale</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] tracking-wider uppercase text-gray-500 mb-1.5">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white">
            <option value="">All</option>
            <option value="flat">Flat</option>
            <option value="villa">Villa</option>
            <option value="plot">Plot</option>
            <option value="building">Building</option>
            <option value="penthouse">Penthouse</option>
            <option value="commercial">Commercial</option>
            <option value="farmhouse">Farmhouse</option>
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full px-6 py-2.5 bg-black text-white text-sm tracking-wide uppercase hover:bg-gray-800 transition-colors">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
