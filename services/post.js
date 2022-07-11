import { clientRaw } from './axios';

const createPost = (body) => clientRaw.post(`/post/create`, body);

const editPost = ({ postId, formData }) => clientRaw.post(`/post/edit/${postId}`, formData);

const getPostByID = ({ postId }) => clientRaw.get(`/post/${postId}`);

const getPosts = (params) => clientRaw.get(`/post`, { params });

const votePost = ({ postId }) => clientRaw.post(`/post/${postId}`);

const getFeedPosts = (params) => clientRaw.get(`/post/feed`, { params });

const getExplorePosts = (params) => clientRaw.get(`/post/explore`, { params });

const retrieveHashtagPosts = ({ hashtag }) => clientRaw.get(`/post/hashtag/${hashtag}`);

const deletePost = ({ postId }) => clientRaw.delete(`/post/${postId}`);

export const postService = {
  createPost,
  editPost,
  getPostByID,
  getPosts,
  votePost,
  getFeedPosts,
  retrieveHashtagPosts,
  getExplorePosts,
  deletePost,
};
