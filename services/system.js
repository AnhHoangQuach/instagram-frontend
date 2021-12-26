import { clientRaw } from './axios';

const search = (params) => clientRaw.get(`/system/search`, { params });

export const systemService = {
  search,
};
