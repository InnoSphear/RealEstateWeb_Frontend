import axios from 'axios';

const api = axios.create({
  baseURL: 'https://realestateweb-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
