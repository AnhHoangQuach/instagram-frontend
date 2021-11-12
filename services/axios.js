import axios from 'axios';
import { stringify } from 'query-string';
import store from '../store';

const clientRaw = axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'index' }),
});

const beforeRequest = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    Object.assign(config.headers, { Authorization: `Bearer ${token}` });
  }
  if (config.data instanceof FormData) {
    Object.assign(config.headers, { 'Content-Type': 'multipart/form-data' });
  }
  return config;
};

clientRaw.interceptors.request.use(beforeRequest);

clientRaw.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export { clientRaw };
