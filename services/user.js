import { clientRaw } from './axios';

const getUser = ({ userId }) => clientRaw.get(`/user/${userId}`);

const bookmarkPost = ({ postId }) => clientRaw.post(`/user/${postId}/bookmark`);

const followUser = ({ userId }) => clientRaw.post(`/user/${userId}/follow`);

const unfollowUser = ({ userId }) => clientRaw.put(`/user/${userId}/unfollow`);

const getFollowing = ({ userId }) => clientRaw.get(`/user/${userId}/following`);

const getFollowers = ({ userId }) => clientRaw.get(`/user/${userId}/followers`);

const changePassword = (body) => clientRaw.put(`/user/password`, body);

const editProfile = (body) => clientRaw.put(`/user/update`, body);

const changeAvatar = (body) => clientRaw.put(`/user/avatar`, body);

export const userService = {
  getUser,
  bookmarkPost,
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  changePassword,
  editProfile,
  changeAvatar,
};
