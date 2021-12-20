import { clientRaw } from './axios';

const getUser = ({ userId }) => clientRaw.get(`/user/${userId}`);

const bookmarkPost = ({ postId }) => clientRaw.post(`/user/${postId}/bookmark`);

const followUser = ({ userId }) => clientRaw.post(`/user/${userId}/follow`);

const unfollowUser = ({ userId }) => clientRaw.put(`/user/${userId}/unfollow`);

const getFollowing = ({ userId }) => clientRaw.get(`/user/${userId}/following`);

const getFollowers = ({ userId }) => clientRaw.get(`/user/${userId}/followers`);

export const userService = {
  getUser,
  bookmarkPost,
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
};
