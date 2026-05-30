import { Link } from 'react-router-dom';

const categoryLabels = {
  flat: 'Apartment', building: 'Building', plot: 'Plot', villa: 'Villa',
  penthouse: 'Penthouse', commercial: 'Commercial', farmhouse: 'Farmhouse'
};

export default function PropertyCard({ property, index = 0 }) {
  const imgSrc = property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600';

  return (
    <Link
      to={`/property/${property._id}`}
      className="group block bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 card-hover animate-fadeInUp"
      style={{ animationDelay: `${(index % 6) * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={imgSrc}
          alt={property.title}
          loading="lazy"
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
        <div className="absolute top-5 left-5 flex gap-2">
          <span className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-semibold ${
            property.purpose === 'rent'
              ? 'bg-black text-white'
              : 'bg-white text-black border border-black'
          }`}>
            For {property.purpose === 'rent' ? 'Rent' : 'Sale'}
          </span>
          {property.featured && (
            <span className="px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-semibold bg-[#c8a85e] text-white">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-5 right-5">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[11px] font-medium text-gray-700 tracking-wide uppercase">
            {categoryLabels[property.category] || property.category}
          </span>
        </div>
        {property.isDummy && (
          <div className="absolute top-5 right-5">
            <span className="px-2 py-0.5 bg-amber-400/90 text-[9px] uppercase tracking-wider text-black font-medium">
              Sample
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-gray-600 transition-colors duration-300">
          {property.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location?.city}, {property.location?.state}
        </p>
        <div className="flex items-center gap-5 mb-5 text-sm text-gray-500 border-t border-gray-50 pt-4">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              {property.bathrooms} Baths
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {property.area} {property.areaUnit}
          </span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="font-serif text-xl font-bold text-gray-900">
              {property.priceLabel || `₹${property.price.toLocaleString()}`}
            </span>
            {property.purpose === 'rent' && (
              <span className="block text-[10px] text-gray-400 uppercase tracking-wider">per month</span>
            )}
          </div>
          {property.purpose === 'rent' && (
            <span className={`text-[9px] px-2.5 py-1 uppercase tracking-[0.1em] font-medium ${
              property.maintenanceIncluded
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-orange-50 text-orange-700 border border-orange-200'
            }`}>
              {property.maintenanceIncluded ? 'Maint. Included' : 'No Maint.'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
