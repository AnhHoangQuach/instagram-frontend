import { clientRaw } from './axios';

const createComment = ({ postId, ...body }) => clientRaw.post(`/comment/${postId}`, body);

const deleteComment = ({ commentId }) => clientRaw.delete(`/comment/${commentId}`);

export const commentService = {
  createComment,
  deleteComment,
};
