import axios from 'axios';
import { stringify } from 'query-string';

const clientRaw = axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'index' }),
});

export { clientRaw };
