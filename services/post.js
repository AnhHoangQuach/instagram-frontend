import { clientRaw } from './axios';

const createPost = (body) => clientRaw.post(`/post/create`, body);

const getPostByID = ({ postId }) => clientRaw.get(`/post/${postId}`);

const getPosts = (params) => clientRaw.get(`/post`, { params });

const votePost = ({ postId }) => clientRaw.post(`/post/${postId}`);

const getFeedPosts = (params) => clientRaw.get(`/post/feed`, { params });

const retrieveHashtagPosts = ({ hashtag }) => clientRaw.get(`/post/hashtag/${hashtag}`);

export const postService = {
  createPost,
  getPostByID,
  getPosts,
  votePost,
  getFeedPosts,
  retrieveHashtagPosts,
};
