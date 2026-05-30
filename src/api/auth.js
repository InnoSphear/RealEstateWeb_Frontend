import api from './axios';

export const login = (data) => api.post('/auth/login', data);
export const verifyAuth = (auth) => api.get('/auth/verify', { headers: auth });
