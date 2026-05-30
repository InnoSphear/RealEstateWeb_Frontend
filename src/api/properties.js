import api from './axios';

export const getProperties = (params) => api.get('/properties', { params });
export const getProperty = (id) => api.get(`/properties/${id}`);
export const getPropertyBySlug = (slug) => api.get(`/properties/slug/${slug}`);
export const createProperty = (data, auth) => api.post('/properties', data, { headers: auth });
export const updateProperty = (id, data, auth) => api.put(`/properties/${id}`, data, { headers: auth });
export const deleteProperty = (id, auth) => api.delete(`/properties/${id}`, { headers: auth });
export const getDummyCount = () => api.get('/properties/dummy-count');
