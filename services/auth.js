import { clientRaw } from './axios';

const signup = (body) => clientRaw.post(`/auth/signup`, body);

const login = (body) => clientRaw.post(`/auth/login`, body);

const getMe = () => clientRaw.get(`/auth/me`);

const loginByFacebook = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;

const getVerifyCode = (params) => clientRaw.get(`/auth/send-verify-code`, { params });

const resetPassword = (body) => clientRaw.post(`/auth/reset-password`, body);

export const authService = {
  signup,
  login,
  getMe,
  loginByFacebook,
  getVerifyCode,
  resetPassword,
};
