import api from './axios';

export const getTestimonials = (params) => api.get('/testimonials', { params });
export const createTestimonial = (data, auth) => api.post('/testimonials', data, { headers: auth });
export const updateTestimonial = (id, data, auth) => api.put(`/testimonials/${id}`, data, { headers: auth });
export const deleteTestimonial = (id, auth) => api.delete(`/testimonials/${id}`, { headers: auth });
