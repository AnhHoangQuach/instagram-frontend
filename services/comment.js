import { clientRaw } from './axios';

const createComment = ({ postId, ...body }) => clientRaw.post(`/comment/${postId}`, body);

const deleteComment = ({ postId }) => clientRaw.delete(`/comment/${postId}`);

export const commentService = {
  createComment,
  deleteComment,
};
