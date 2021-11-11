import { clientRaw } from './axios';

const signup = (body) => clientRaw.post(`/auth/signup`, body);

const loginByFacebook = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;

const getMe = () => clientRaw.get(`/auth/me`);

export const authService = {
  signup,
  loginByFacebook,
  getMe,
};
