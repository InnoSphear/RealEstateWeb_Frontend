import { useState, useEffect } from 'react';
import { getInquiries, deleteInquiry, markAsRead, updateInquiry } from '../../api/inquiries';
import { useAuth } from '../../context/AuthContext';

export default function AdminInquiries() {
  const { getAuthHeaders } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadInquiries();
  }, [filter]);

  const loadInquiries = () => {
    const params = {};
    if (filter) params.status = filter;
    getInquiries(getAuthHeaders(), params).then((res) => {
      if (res.data.success) setInquiries(res.data.data);
    }).catch(() => {});
  };

  const handleMarkRead = async (id) => {
    await markAsRead(id, getAuthHeaders());
    loadInquiries();
  };

  const handleStatusChange = async (id, status) => {
    await updateInquiry(id, { status }, getAuthHeaders());
    loadInquiries();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    await deleteInquiry(id, getAuthHeaders());
    loadInquiries();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-sm text-gray-500 mt-1">{inquiries.length} inquiries</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-black bg-white">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="follow-up">Follow-up</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="space-y-3">
        {inquiries.map((inq) => (
          <div key={inq._id} className={`bg-white border ${inq.isRead ? 'border-gray-100' : 'border-black'} p-5`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900">{inq.name}</h3>
                  {!inq.isRead && <span className="w-2 h-2 bg-black rounded-full" />}
                </div>
                <p className="text-xs text-gray-400">{inq.email} · {inq.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                {inq.property && <span className="text-xs text-gray-400">Re: {inq.property.title}</span>}
                <span className={`text-[10px] px-2 py-0.5 uppercase tracking-wider ${
                  inq.status === 'new' ? 'bg-blue-50 text-blue-700' :
                  inq.status === 'contacted' ? 'bg-amber-50 text-amber-700' :
                  inq.status === 'follow-up' ? 'bg-purple-50 text-purple-700' :
                  'bg-green-50 text-green-700'
                }`}>{inq.status}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{inq.message}</p>
            <div className="flex items-center gap-3 text-xs">
              {!inq.isRead && (
                <button onClick={() => handleMarkRead(inq._id)} className="text-gray-500 hover:text-black underline underline-offset-2">Mark Read</button>
              )}
              <select value={inq.status} onChange={(e) => handleStatusChange(inq._id, e.target.value)} className="text-xs border border-gray-200 px-2 py-1 bg-white">
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="follow-up">Follow-up</option>
                <option value="closed">Closed</option>
              </select>
              <button onClick={() => handleDelete(inq._id)} className="text-red-500 hover:text-red-700 underline underline-offset-2">Delete</button>
              <span className="text-gray-300 ml-auto">{new Date(inq.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <div className="text-center py-12 bg-white border border-gray-100">
            <p className="text-sm text-gray-400">No inquiries found</p>
          </div>
        )}
      </div>
    </div>
  );
}
