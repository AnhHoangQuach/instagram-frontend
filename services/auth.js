import { clientRaw } from './axios';

const signup = (body) => clientRaw.post(`/auth/signup`, body);

const login = (body) => clientRaw.post(`/auth/login`, body);

const getMe = () => clientRaw.get(`/auth/me`);

const loginByFacebook = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;

export const authService = {
  signup,
  login,
  getMe,
  loginByFacebook,
};
