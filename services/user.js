import { clientRaw } from './axios';

const getUser = ({ userId }) => clientRaw.get(`/user/${userId}`);

const bookmarkPost = ({ postId }) => clientRaw.post(`/user/${postId}/bookmark`);

export const userService = {
  getUser,
  bookmarkPost,
};
