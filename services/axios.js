import axios from 'axios';
import { stringify } from 'query-string';

const clientRaw = axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'index' }),
});

clientRaw.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      error = {
        statusCode: error?.response?.status,
        errors: error?.response?.data?.error,
      };
    }

    throw error;
  }
);

export { clientRaw };
