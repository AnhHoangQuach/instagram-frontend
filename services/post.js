import { clientRaw } from './axios';

const createPost = (body) => clientRaw.post(`/post/create`, body);

const getPostByID = ({ postId }) => clientRaw.post(`/post/${postId}`);

export const authService = {
  createPost,
  getPostByID,
};
