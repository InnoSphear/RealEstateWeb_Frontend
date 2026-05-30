import { useState, useEffect } from 'react';
import { getProperties, getDummyCount } from '../../api/properties';
import { getInquiries } from '../../api/inquiries';
import { getTestimonials } from '../../api/testimonials';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { getAuthHeaders } = useAuth();
  const [data, setData] = useState({
    totalProperties: 0,
    forRent: 0,
    forSale: 0,
    dummyCount: 0,
    newInquiries: 0,
    totalInquiries: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const auth = getAuthHeaders();
    Promise.all([
      getProperties({}),
      getProperties({ purpose: 'rent' }),
      getProperties({ purpose: 'sell' }),
      getDummyCount(),
      getInquiries(auth, { status: 'new' }),
      getInquiries(auth),
      getTestimonials(),
    ]).then(([total, rent, sell, dummy, newInq, allInq, testis]) => {
      setData({
        totalProperties: total.data.count || 0,
        forRent: rent.data.count || 0,
        forSale: sell.data.count || 0,
        dummyCount: dummy.data.count || 0,
        newInquiries: newInq.data.count || 0,
        totalInquiries: allInq.data.count || 0,
        testimonials: testis.data.count || 0,
      });
    }).catch(() => {});
  }, []);

  const stats = [
    { label: 'Total Properties', value: data.totalProperties, color: 'bg-black' },
    { label: 'For Rent', value: data.forRent, color: 'bg-gray-700' },
    { label: 'For Sale', value: data.forSale, color: 'bg-gray-600' },
    { label: 'Dummy Properties', value: data.dummyCount, color: 'bg-amber-500' },
    { label: 'New Inquiries', value: data.newInquiries, color: 'bg-blue-600' },
    { label: 'Total Inquiries', value: data.totalInquiries, color: 'bg-gray-500' },
    { label: 'Testimonials', value: data.testimonials, color: 'bg-green-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to Shivam International Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 p-6">
            <div className={`w-10 h-10 ${s.color} flex items-center justify-center mb-4`}>
              <span className="text-white text-sm font-bold">{s.value}</span>
            </div>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {data.dummyCount > 0 && (
        <div className="mt-8 bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800">
            <strong>{data.dummyCount} dummy properties</strong> are currently shown. They will automatically be removed one by one as you add new properties through the admin panel.
          </p>
        </div>
      )}
    </div>
  );
}
