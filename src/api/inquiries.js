import api from './axios';

export const getInquiries = (auth, params) => api.get('/inquiries', { headers: auth, params });
export const createInquiry = (data) => api.post('/inquiries', data);
export const updateInquiry = (id, data, auth) => api.put(`/inquiries/${id}`, data, { headers: auth });
export const deleteInquiry = (id, auth) => api.delete(`/inquiries/${id}`, { headers: auth });
export const markAsRead = (id, auth) => api.put(`/inquiries/${id}/read`, {}, { headers: auth });
